import { writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

type CityProfile = {
  readonly county: string;
  readonly city: string;
  readonly district: string;
  readonly neighborhoods: readonly string[];
  readonly latitude: number;
  readonly longitude: number;
  readonly baseMedianEurSqm: number;
  readonly propertyCount: number;
};

type PropertyProfile = {
  readonly propertyId: string;
  readonly cityProfile: CityProfile;
  readonly neighborhood: string;
  readonly neighborhoodTier: "central" | "semi-central" | "outer";
  readonly propertyType: "apartment" | "house";
  readonly rooms: number;
  readonly usableAreaSqm: number;
  readonly landAreaSqm: number;
  readonly builtYear: number;
  readonly floorNumber: number;
  readonly buildingFloors: number;
  readonly energyClass: "A" | "B" | "C" | "D";
  readonly seismicRiskClass: "none" | "rs3" | "rs2";
  readonly conditionBand: "renovated" | "average" | "needs_work";
  readonly heatingType: "district" | "individual_gas" | "heat_pump";
  readonly parkingSpaces: number;
  readonly benchmarkBandId: string;
  readonly medianEurSqm: number;
};

type PriceBand = {
  readonly benchmarkBandId: string;
  readonly referenceYear: number;
  readonly county: string;
  readonly city: string;
  readonly neighborhoodTier: PropertyProfile["neighborhoodTier"];
  readonly propertyType: PropertyProfile["propertyType"];
  readonly minEurSqm: number;
  readonly medianEurSqm: number;
  readonly maxEurSqm: number;
};

const datasetRoot = dirname(fileURLToPath(import.meta.url));
const valuationDates = ["2025-03-31", "2025-12-31", "2026-03-31"] as const;
const hpiFactorsByDate: Readonly<
  Record<(typeof valuationDates)[number], number>
> = {
  "2025-03-31": 1,
  "2025-12-31": 1.025,
  "2026-03-31": 1.035,
};
const ronPerEur = 4.97;

const cityProfiles: readonly CityProfile[] = [
  {
    county: "Bucuresti",
    city: "Bucuresti",
    district: "Sector 1",
    neighborhoods: ["Aviatiei", "Baneasa", "Domenii", "Pajura"],
    latitude: 44.474,
    longitude: 26.086,
    baseMedianEurSqm: 2150,
    propertyCount: 12,
  },
  {
    county: "Bucuresti",
    city: "Bucuresti",
    district: "Sector 3",
    neighborhoods: ["Dristor", "Titan", "Vitan", "Unirii"],
    latitude: 44.421,
    longitude: 26.139,
    baseMedianEurSqm: 1850,
    propertyCount: 10,
  },
  {
    county: "Cluj",
    city: "Cluj-Napoca",
    district: "Municipiu",
    neighborhoods: ["Centru", "Marasti", "Manastur", "Zorilor"],
    latitude: 46.771,
    longitude: 23.623,
    baseMedianEurSqm: 2400,
    propertyCount: 10,
  },
  {
    county: "Timis",
    city: "Timisoara",
    district: "Municipiu",
    neighborhoods: ["Cetate", "Girocului", "Lipovei", "Soarelui"],
    latitude: 45.748,
    longitude: 21.227,
    baseMedianEurSqm: 1650,
    propertyCount: 8,
  },
  {
    county: "Iasi",
    city: "Iasi",
    district: "Municipiu",
    neighborhoods: ["Centru", "Copou", "Pacurari", "Tatarasi"],
    latitude: 47.158,
    longitude: 27.601,
    baseMedianEurSqm: 1500,
    propertyCount: 8,
  },
  {
    county: "Constanta",
    city: "Constanta",
    district: "Municipiu",
    neighborhoods: ["Tomis", "Faleza Nord", "Dacia", "Coiciu"],
    latitude: 44.181,
    longitude: 28.634,
    baseMedianEurSqm: 1750,
    propertyCount: 6,
  },
  {
    county: "Brasov",
    city: "Brasov",
    district: "Municipiu",
    neighborhoods: ["Centrul Civic", "Tractorul", "Astra", "Racadau"],
    latitude: 45.657,
    longitude: 25.601,
    baseMedianEurSqm: 1800,
    propertyCount: 6,
  },
];

function csvEscape(value: string | number): string {
  const stringValue = String(value);

  return /[",\n\r]/u.test(stringValue)
    ? `"${stringValue.replace(/"/gu, '""')}"`
    : stringValue;
}

function toCsv(
  header: readonly string[],
  rows: ReadonlyArray<readonly (string | number)[]>,
): string {
  return `${header.join(",")}\n${rows
    .map((row) => row.map(csvEscape).join(","))
    .join("\n")}\n`;
}

function tierForIndex(index: number): PropertyProfile["neighborhoodTier"] {
  if (index % 5 === 0) {
    return "central";
  }

  if (index % 3 === 0) {
    return "outer";
  }

  return "semi-central";
}

function propertyTypeForIndex(index: number): PropertyProfile["propertyType"] {
  return index % 7 === 0 ? "house" : "apartment";
}

function tierFactor(tier: PropertyProfile["neighborhoodTier"]): number {
  switch (tier) {
    case "central":
      return 1.18;
    case "semi-central":
      return 1;
    case "outer":
      return 0.82;
  }
}

function typeFactor(type: PropertyProfile["propertyType"]): number {
  return type === "house" ? 1.08 : 1;
}

function roundTo(value: number, step: number): number {
  return Math.round(value / step) * step;
}

function priceBandPrefix(cityProfile: CityProfile): string {
  return `${cityProfile.city}-${cityProfile.district}`
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/gu, "")
    .replace(/[^A-Za-z0-9]+/gu, "-")
    .toUpperCase();
}

function buildPriceBands(): readonly PriceBand[] {
  return cityProfiles.flatMap((city) =>
    (["central", "semi-central", "outer"] as const).flatMap((tier) =>
      (["apartment", "house"] as const).map((propertyType) => {
        const median = roundTo(
          city.baseMedianEurSqm * tierFactor(tier) * typeFactor(propertyType),
          10,
        );

        return {
          benchmarkBandId: `PB-${priceBandPrefix(city)}-${tier.toUpperCase()}-${propertyType.toUpperCase()}`,
          referenceYear: 2025,
          county: city.county,
          city: city.city,
          neighborhoodTier: tier,
          propertyType,
          minEurSqm: roundTo(median * 0.84, 10),
          medianEurSqm: median,
          maxEurSqm: roundTo(median * 1.2, 10),
        };
      }),
    ),
  );
}

function buildProperties(
  priceBands: readonly PriceBand[],
): readonly PropertyProfile[] {
  const properties: PropertyProfile[] = [];
  let propertySequence = 1;

  for (const cityProfile of cityProfiles) {
    for (
      let localIndex = 0;
      localIndex < cityProfile.propertyCount;
      localIndex += 1
    ) {
      const tier = tierForIndex(localIndex);
      const propertyType = propertyTypeForIndex(localIndex);
      const benchmarkBandId = `PB-${priceBandPrefix(cityProfile)}-${tier.toUpperCase()}-${propertyType.toUpperCase()}`;
      const priceBand = priceBands.find(
        (candidate) => candidate.benchmarkBandId === benchmarkBandId,
      );

      if (priceBand === undefined) {
        throw new Error(`Missing price band ${benchmarkBandId}.`);
      }

      const rooms =
        propertyType === "house" ? 4 + (localIndex % 3) : 1 + (localIndex % 4);
      const usableAreaSqm =
        propertyType === "house"
          ? 118 + (localIndex % 8) * 14
          : 42 + rooms * 13 + (localIndex % 5) * 4;
      const landAreaSqm =
        propertyType === "house" ? 240 + (localIndex % 6) * 55 : 0;
      const buildingFloors =
        propertyType === "house" ? 2 : 4 + (localIndex % 8);

      properties.push({
        propertyId: `P${String(propertySequence).padStart(4, "0")}`,
        cityProfile,
        neighborhood:
          cityProfile.neighborhoods[
            localIndex % cityProfile.neighborhoods.length
          ] ?? cityProfile.city,
        neighborhoodTier: tier,
        propertyType,
        rooms,
        usableAreaSqm,
        landAreaSqm,
        builtYear: 1978 + ((propertySequence * 7) % 45),
        floorNumber: propertyType === "house" ? 0 : localIndex % buildingFloors,
        buildingFloors,
        energyClass: (["A", "B", "C", "D"] as const)[propertySequence % 4],
        seismicRiskClass:
          propertySequence % 19 === 0
            ? "rs2"
            : propertySequence % 11 === 0
              ? "rs3"
              : "none",
        conditionBand:
          propertySequence % 13 === 0
            ? "needs_work"
            : propertySequence % 4 === 0
              ? "renovated"
              : "average",
        heatingType:
          propertySequence % 9 === 0
            ? "heat_pump"
            : propertySequence % 2 === 0
              ? "individual_gas"
              : "district",
        parkingSpaces:
          propertyType === "house"
            ? 1 + (localIndex % 2)
            : localIndex % 3 === 0
              ? 1
              : 0,
        benchmarkBandId,
        medianEurSqm: priceBand.medianEurSqm,
      });
      propertySequence += 1;
    }
  }

  return properties;
}

async function writeDatasetFile(
  fileName: string,
  header: readonly string[],
  rows: ReadonlyArray<readonly (string | number)[]>,
): Promise<void> {
  await writeFile(join(datasetRoot, fileName), toCsv(header, rows), "utf8");
}

const priceBands = buildPriceBands();
const properties = buildProperties(priceBands);

await writeDatasetFile(
  "market_price_bands.csv",
  [
    "benchmark_band_id",
    "reference_year",
    "county",
    "city",
    "neighborhood_tier",
    "property_type",
    "min_eur_sqm",
    "median_eur_sqm",
    "max_eur_sqm",
    "official_source_context",
    "synthetic_adjustment_note",
  ],
  priceBands.map((band) => [
    band.benchmarkBandId,
    band.referenceYear,
    band.county,
    band.city,
    band.neighborhoodTier,
    band.propertyType,
    band.minEurSqm,
    band.medianEurSqm,
    band.maxEurSqm,
    "Eurostat HPI plus Romanian notarial-study concepts; synthetic training bands are not official valuations.",
    "Synthetic city-tier spread for deterministic mortgage BI exercises.",
  ]),
);

await writeDatasetFile(
  "property_locations.csv",
  [
    "property_id",
    "county",
    "city",
    "sector_or_district",
    "neighborhood",
    "neighborhood_tier",
    "urban_rural",
    "latitude",
    "longitude",
    "center_distance_km_band",
    "transit_access_band",
    "school_access_band",
    "hospital_access_band",
    "market_liquidity_band",
  ],
  properties.map((property, index) => [
    property.propertyId,
    property.cityProfile.county,
    property.cityProfile.city,
    property.cityProfile.district,
    property.neighborhood,
    property.neighborhoodTier,
    "urban",
    (property.cityProfile.latitude + ((index % 7) - 3) * 0.006).toFixed(4),
    (property.cityProfile.longitude + ((index % 5) - 2) * 0.007).toFixed(4),
    property.neighborhoodTier === "central"
      ? "0-2"
      : property.neighborhoodTier === "semi-central"
        ? "2-6"
        : "6-12",
    index % 6 === 0 ? "limited" : index % 3 === 0 ? "medium" : "high",
    index % 5 === 0 ? "medium" : "high",
    index % 4 === 0 ? "medium" : "high",
    property.neighborhoodTier === "outer" ? "medium" : "high",
  ]),
);

await writeDatasetFile(
  "property_attributes.csv",
  [
    "property_id",
    "property_type",
    "rooms",
    "usable_area_sqm",
    "land_area_sqm",
    "built_year",
    "building_floors",
    "floor_number",
    "energy_class",
    "seismic_risk_class",
    "condition_band",
    "heating_type",
    "parking_spaces",
  ],
  properties.map((property) => [
    property.propertyId,
    property.propertyType,
    property.rooms,
    property.usableAreaSqm,
    property.landAreaSqm,
    property.builtYear,
    property.buildingFloors,
    property.floorNumber,
    property.energyClass,
    property.seismicRiskClass,
    property.conditionBand,
    property.heatingType,
    property.parkingSpaces,
  ]),
);

await writeDatasetFile(
  "property_valuations.csv",
  [
    "valuation_id",
    "property_id",
    "valuation_date",
    "valuation_method",
    "market_value_eur",
    "market_value_ron",
    "price_per_sqm_eur",
    "confidence_band",
    "haircut_pct",
    "valuation_source_model",
    "benchmark_band_id",
  ],
  properties.flatMap((property, propertyIndex) =>
    valuationDates.map((valuationDate, dateIndex) => {
      const conditionFactor =
        property.conditionBand === "renovated"
          ? 1.08
          : property.conditionBand === "needs_work"
            ? 0.87
            : 1;
      const seismicFactor = property.seismicRiskClass === "none" ? 1 : 0.9;
      const pricePerSqm = roundTo(
        property.medianEurSqm *
          hpiFactorsByDate[valuationDate] *
          conditionFactor *
          seismicFactor *
          (0.96 + ((propertyIndex + dateIndex) % 9) * 0.01),
        5,
      );
      const marketValueEur = roundTo(pricePerSqm * property.usableAreaSqm, 100);
      const haircutPct =
        property.seismicRiskClass !== "none"
          ? 28
          : property.neighborhoodTier === "outer"
            ? 22
            : property.propertyType === "house"
              ? 20
              : 15;

      return [
        `VAL-${property.propertyId}-${valuationDate}`,
        property.propertyId,
        valuationDate,
        dateIndex === 0 ? "desktop_indexed" : "market_comparable",
        marketValueEur,
        roundTo(marketValueEur * ronPerEur, 10),
        pricePerSqm,
        propertyIndex % 13 === 0
          ? "wide"
          : propertyIndex % 5 === 0
            ? "medium"
            : "narrow",
        haircutPct,
        "synthetic-official-context-v1",
        property.benchmarkBandId,
      ];
    }),
  ),
);

await writeDatasetFile(
  "collateral.csv",
  [
    "collateral_id",
    "loan_id",
    "property_id",
    "collateral_type",
    "lien_rank",
    "pledged_share_pct",
    "valuation_date",
    "accepted_value_eur",
    "forced_sale_haircut_pct",
  ],
  properties.map((property, index) => {
    const loanId = `L${2001 + (index % 5)}`;
    const latestValue = roundTo(
      property.medianEurSqm *
        hpiFactorsByDate["2026-03-31"] *
        property.usableAreaSqm,
      100,
    );
    const haircutPct =
      property.propertyType === "house" ? 20 : index % 11 === 0 ? 28 : 15;

    return [
      `COL${String(index + 1).padStart(4, "0")}`,
      loanId,
      property.propertyId,
      property.propertyType === "house"
        ? "residential_house"
        : "residential_apartment",
      index % 17 === 0 ? 2 : 1,
      index % 13 === 0 ? 50 : 100,
      index % 23 === 0 ? "2025-03-31" : "2026-03-31",
      latestValue,
      haircutPct,
    ];
  }),
);

process.stdout.write(
  `Generated ${properties.length} properties, ${properties.length * valuationDates.length} valuations, and ${priceBands.length} market price bands.\n`,
);
