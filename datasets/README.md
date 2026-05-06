# Datasets

All datasets in this repository are synthetic training fixtures. Do not add real customer, account, transaction, employee, complaint, AML, fraud, regulatory, or credential data.

Dataset versions are immutable once used by released challenges. If expected outputs, flags, fixture solutions, or learner-visible evidence would change, create a new dataset version instead of editing an existing one in place. See [Dataset Versioning](VERSIONING.md) for the full policy and metadata contract.

Current seed:

- `deposits-seed/v0.1.0`: small hand-authored Romanian deposits/account ownership dataset for the first browser SQL and BI trap challenges.
- `deposits-seed/v0.1.1`: synthetic changed-output fixture used to prove version pins; released challenges do not reference it.

Expansion planning lives in [Expansion Roadmap](EXPANSION_ROADMAP.md).
