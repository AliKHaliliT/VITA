# Upstream

Aligned to Helm at `e069bab`.

Every entry below is a lead and not a verdict, to be verified against the template's own tree
before it is adopted.

## Open

### 2026-09-09 A decorative use of randomness has to waive the weak-randomness rule

Kind: defect

Pin: e069bab

**What it is.** The security block sets `sonarjs/pseudo-random` to error for the whole source
tree. A generative ornament that rolls visual jitter, spawn positions and drift speeds and
twinkle phases for the motes of an ambient canvas, trips it on every call, so the only way past
is a per-file waiver that turns the rule off. The rule's own question, whether the randomness is
safe here, has one answer for a decoration and another for a token, and the configuration cannot
tell them apart.

**How the work surfaced it.** Adopting the security block reported the rule against a canvas
whose numbers reach nothing but pixels. The waiver is narrow, one file, with the reason written
beside it, but it is still a style-owned rule switched off by a child.

**What was worked around.** `sonarjs/pseudo-random` is disabled for the single ornament file
rather than the ornament changed, because a cryptographic generator for drifting dots would buy
nothing and cost a synchronous entropy call per frame.

**Records checked.** The record that adopted the mechanical security rules names the exclusions
as narrow and reason-bearing, which is what this is, and no record rules on decorative
randomness either way.

### 2026-09-09 The advisory lint rules cannot be answered where they fire

Kind: improvement

Pin: e069bab

**What it is.** Three lint rules are advisory by design, and the guide says every warning is
read and then fixed or dismissed in writing, in the change that produced it. There is nowhere
for that writing to go. A dismissal has no home in the tree, so the next change meets the same
warning with no record that anyone judged it, and the only durable option a child has is a
decision record, which is too heavy for one shape-guessing hit.

**How the work surfaced it.** Carrying the advisory rules raised the question of where a
dismissal lives once the change that dismissed it has been committed and its notes are gone.

**Why it is believed better.** A named home for advisory dismissals, a section of the upstream
file or a small ledger beside it, would keep the obligation checkable rather than trusting that
each change's prose survives. Whether it belongs in an existing document is the template's
call; the gap is that the rule asks for writing the form provides no place for.

**Records checked.** The record that split checks into verdicts and advice states the
obligation and leaves the location unsaid, and no record since names a home for it.
