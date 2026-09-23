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

### 2026-09-22 The link-repair proof plants on a Status line, where every edit is legal

Kind: defect

Pin: a0db0a4

**What it is.** The docs audit's selftest proves the link-repair clause of record immutability
on the first relative link it finds, reading the project's own records in filename order. When
the first record has been superseded, that link is the one the rulebook prescribes on its Status
line, `Superseded by [NNNN](NNNN-the-new-record.md)`, and a Status line may change freely. So
the plant that points the target at a missing file and the plant that changes the link's text
both pass as legal Status edits, the selftest reports two rules not working, and the plant that
repairs the target to another resolving file passes for the wrong reason. Choosing the link from
a line that does not open with `Status: ` would land the plants in a record's body, where the
clause applies.

**How the work surfaced it.** A re-alignment ran the recopied selftest over a tree whose first
record was superseded in the prescribed form, and it reported that a ghost link target and a
changed link text raised nothing. The same ghost planted by hand showed the diff landing on the
Status line, the immutability check rightly letting that line move, and only the record-link
check naming the dead target. The template's own first record is still accepted, so its run never
meets the case. Keel's audit chooses its link the same way.

**What was worked around.** Nothing. The re-alignment is held until the template fixes the
plant, rather than landing with a patched copy of a style-owned script or with the selftest's
step made advisory.

**Records checked.** The record that added the link-repair clause lists the proof's cases and
says nothing about which line the chosen link sits on, and the rulebook's supersession form puts
a link on exactly the line immutability leaves free, so the two rulings meet in any project whose
first record was superseded.

### 2026-09-22 The console rule's configuration comment splices a clause with a colon

Kind: defect

Pin: a0db0a4

**What it is.** The comment carried beside `no-console` in the client lint configuration
opens "Nothing prints from product code or its suites: a diagnostic surfaces as a typed error
at the boundary", a claim, a colon, and its elaboration, which is the clause-colon splice the
prose law bans outright. The configuration's comments are carried as style-owned law, so every
child that copies the block copies the splice into a tracked file.

**How the work surfaced it.** A re-alignment carried the new block into a project's
configuration and read it against the prose law before it shipped.

**What was worked around.** The re-alignment, which is held, splits the comment in the
project's copy into two sentences, and its second sentence says the diagnostic goes where the
failure path already sends it, since the project has no boundary where a typed error would
surface it. The copy therefore differs from the carried bytes in punctuation and in that one
clause.

**Records checked.** The record that added the rule states why the rule exists and says nothing
about the comment's wording, and no record exempts configuration comments from the prose law,
which governs every tracked byte.

### 2026-09-22 The baseline's working-tree sentence fails the audit where the harness keeps its folder

Kind: defect

Pin: a0db0a4

**What it is.** The baseline names the directories a second working tree may occupy in
backticks, `.worktrees/` and the harness's directory under its settings folder. The docs audit
reads a backticked token as a repository path whenever its first segment exists at the root, so
on a machine where the harness has created its settings folder there, the sentence reports the
harness directory as a path that does not exist and the audit fails over a correct tree. CI never
sees it, because the settings folder is untracked.

**How the work surfaced it.** A re-alignment checked a project's baseline against the audit with
that settings folder present, and the audit failed on the sentence with the words "which does not
exist"; with the folder absent it passed.

**What was worked around.** In the held re-alignment, the project's baseline names the harness
directory as its `worktrees/` folder under the settings folder, a token the audit reads as prose,
and the ignore file keeps both entries exactly as the check requires.

**Records checked.** The record that added the working-tree entries rules on the ignore file, the
baseline row, and the check, and does not consider a harness folder that exists on a machine but
not in the tree; the rulebook's freshness rule, which reads a token whose first segment the root
does not know as prose, is why the failure appears only where the folder exists.
