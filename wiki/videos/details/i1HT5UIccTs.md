---
type: video
videoId: i1HT5UIccTs
category: development
tags: [ai, agent, skill]
views: 3
date: 2026-04-28T18:55:44Z
summarized: 2026-04-28T22:06:34.653Z
---

# Agent Skills for Dart

> [development](../development.md) · 3 views · Apr 28, 2026
> [Watch on YouTube](https://youtu.be/i1HT5UIccTs)

## Summary

An introduction to the `dartlang/skills` GitHub repository — a collection of actionable AI agent skills for Dart development. The video covers four core capability areas: automated testing/coverage (mock generation, unit tests, LCOV), diagnostic resolution (runtime errors, static analysis, package conflicts), quality/modernization (lints, pattern matching migration), and project bootstrapping (CLI scaffolding).

## Key Takeaways

- The `dartlang/skills` repo provides predefined prompts and workflows that equip AI agents to autonomously write tests, fix errors, and refactor Dart codebases.
- Four capability pillars: testing & coverage, automated resolution, quality & modernization, and bootstrapping.
- The automated runtime error resolution loop: fetch stack trace → locate failing line → apply fix → hot reload to verify.
- Modernization includes migrating from legacy `package:mockito` expects to `package:checks` equivalents.
- Open-source under BSD-3-Clause; community-driven with defined contributing guidelines.

## Topics Covered

`dart agent skills` · `ai-assisted development` · `automated testing` · `runtime error resolution` · `code modernization` · `cli scaffolding` · `open source`

## Transcript

```
Welcome  everyone.  I  am  pleased  to introduce  our  session  on  agent  skills for  Dart.  Today  we  will  provide  an overview  of  the  Dartlang/skills repository,  a  project  specifically designed  to  facilitate  AIdriven development.  As  the  software  landscape evolves,  it  is  becoming  increasingly important  to  provide  AI  agents  with  the necessary  tools  to  understand  and interact  with  our  code  bases.  This repository,  currently  in  its  main version  on  GitHub,  serves  as  a  central hub  for  those  capabilities.  Let's  take  a closer  look  at  how  these  skills  are being  structured  to  support  the  next generation  of  development  tools. Equipping  AI  models  with  actionable development  workflows  is  at  the  core  of our  approach.  This  process  is  driven  by three  key  components.  First,  AI  agent tooling  offers  a  curated  repository  of actionable  agent  skills  specifically designed  to  help  models  understand  and manipulate  Dart  code  bases  with precision.  Second,  workflow  automation equips  AI  models  with  predefined instructions,  allowing  them  to autonomously  write  tests,  fix  code errors,  and  execute  refactoring. Finally,  this  entire  framework  is  open- source  and  publicly  available  under  the BSD  3  clause  license  maintained  by  the Dart  community.  It  ensures  frictionless integration  into  your  existing development  environment.  The  framework presented  here  highlights  four  core  AI agent  capabilities  designed  to streamline  and  enhance  software development.  First,  testing  and  coverage focuses  on  maintaining  robust  code bases.  AI  agents  automate  the  generation of  mocks,  the  writing  of  unit  tests,  and the  capturing  of  LCOV  reports,  ensuring that  the  logic  remains  regression-free. Next,  automated  resolution  enables agents  to  independently  diagnose  and  fix critical  issues.  This  includes  resolving runtime  failures,  correcting  static analysis  errors,  and  managing  complex package  conflicts.  Third,  quality  and modernization  ensures  long-term  code health.  Here,  agents  enforce  mechanical lints  and  refactor  legacy  code  into modern  formats  such  as  modern  Dart pattern  matching.  Finally,  bootstrapping accelerates  the  start  of  new  projects. Agents  scaffold  foundational  entry points,  define  exit  codes,  and  create the  necessary  cross-platform  scripts  for CLI  applications.  Together,  these capabilities  form  a  comprehensive foundation  for  high  impact  AI integration  in  the  engineering  workflow. Automating  the  testing  and  coverage  life cycle  is  a  critical  process  for  ensuring software  quality  through  four  distinct phases.  Setup,  creation,  modernization, and  validation.  In  the  setup  phase,  the command  dart-generate- test  mocks  is  used  to  define  and generate  mock  objects  for  external dependencies.  This  process  utilizes package.mmako  along  with  buildrunner  to streamline  the  configuration  of  test environments.  The  creation  phase  follows where  dart-  add-unit  test  automatically writes  and  organizes  unit  tests  for functions,  methods,  and  classes  using package  test.  This  ensures  that  new features  are  thoroughly  tested  from their  inception.  During  the modernization  phase,  we  use dart-migrate-2 checks-package  to  update  the  codebase. This  tool  replaces  legacy  expect functions  from  package  Makito  with modern  package  checks  equivalents enhancing  the  clarity  and maintainability  of  the  test  suite. Finally,  the  validation  phase  utilizes dart-colct-  coverage  to  gather  execution data  via  the  coverage  package.  This  data is  compiled  into  a  comprehensive  elov providing  a  detailed  overview  of  code coverage  and  identifying  any  gaps  in  the testing  process.  This  slide  details  the diagnostic  resolution  framework  for addressing  active  errors  and  conflicts within  the  development  workflow.  We  have categorized  these  into  three  primary tools.  First,  Dart  fix  runtime  errors addresses  live  issues.  It  is  triggered by  an  active  stack  trace  automatically locating  the  failing  line,  applying  a fix,  and  initiating  a  hot  reload. Second,  Dart  fix  static  analysis  errors focuses  on  code  quality  triggered  by  a failed  Dart  analyze  command.  Iteratively resolves  static  warnings  and  errors following  code  updates.  Third,  Dart resolve  package  conflicts,  manages dependency  health.  When  a  Pubet execution  fails,  this  tool  diagnoses  and resolves  incompatible  package  version constraints  to  ensure  a  stable  build environment.  The  automated  runtime  error resolution  loop  is  a  continuous  process designed  to  identify  and  fix  issues  as they  occur.  This  cycle  begins  with  the fetch  stage  where  the  system  uses  the get  runtime  errors  c
```

*Transcript truncated (7892 chars). Full transcript in [raw wiki](../raw/transcripts/i1HT5UIccTs.md).*


## Tags

[ai](../tags/ai.md) · [agent](../tags/agent.md) · [skill](../tags/skill.md)

## Related Videos

- [Agent Skills for Flutter](https://youtu.be/TEGFwsAcxK8) — Development · 341 views · Apr 10, 2026 · [Details](TEGFwsAcxK8.md) (shared: `dart agent skills` · `dart` · `agent`)
- [Reins: The Framework for Al-Assisted Development](https://youtu.be/zrP3muXzQX4) — Development · 81 views · Mar 23, 2026 · [Details](zrP3muXzQX4.md) (shared: `agent` · `ai-assisted` · `development`)
- [Taming the Genie](https://youtu.be/MaP2i4dTiQk) — Development · 17 views · Jan 23, 2026 · [Details](MaP2i4dTiQk.md) (shared: `ai-assisted development` · `ai-assisted` · `development`)
- [Professional Al Agent Usage via the CLI](https://youtu.be/Xhq99-YHXCY) — Development · 25 views · Jan 2, 2026 · [Details](Xhq99-YHXCY.md) (shared: `agent` · `code` · `cli`)
- [codeprobe](https://youtu.be/xVdW3yUCbuU) — Development · 33 views · Mar 4, 2026 · [Details](xVdW3yUCbuU.md) (shared: `automated` · `code` · `cli`)

---
*Auto-generated on Apr 28, 2026. Back to [development](../development.md) · [index](../index.md).*