export type RegulatoryContextReference = {
  readonly tag: string;
  readonly label: string;
  readonly href: string;
};

export const regulatoryContextReferences: readonly RegulatoryContextReference[] = [
  {
    tag: 'BNR',
    label: 'Romania BNR Law 312/2004',
    href: '#/regulations/09-romania-bnr-law-312.md',
  },
  {
    tag: 'DORA',
    label: 'EU DORA',
    href: '#/regulations/03-eu-dora.md',
  },
  {
    tag: 'EBA',
    label: 'EBA Supervisory Reporting',
    href: '#/regulations/05-eba-supervisory-reporting-corep-finrep-pillar3.md',
  },
  {
    tag: 'FGDB',
    label: 'Romania FGDB / Law 311/2015',
    href: '#/regulations/10-romania-fgdb-law-311.md',
  },
  {
    tag: 'GDPR',
    label: 'EU GDPR',
    href: '#/regulations/01-eu-gdpr.md',
  },
  {
    tag: 'PSD2',
    label: 'EU PSD2',
    href: '#/regulations/06-eu-psd2.md',
  },
  {
    tag: 'Romania Law 190',
    label: 'Romania Law 190/2018 For GDPR',
    href: '#/regulations/02-romania-law-190-gdpr.md',
  },
];

const regulatoryContextByTag = new Map(
  regulatoryContextReferences.map((reference) => [reference.tag, reference] as const),
);

export function getRegulatoryContextReference(
  tag: string,
): RegulatoryContextReference | undefined {
  return regulatoryContextByTag.get(tag);
}
