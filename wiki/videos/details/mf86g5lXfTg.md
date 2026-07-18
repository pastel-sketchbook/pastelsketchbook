---
type: video
videoId: mf86g5lXfTg
category: kubernetes
tags: [observability, clickhouse, shards]
views: 9
date: 2026-07-16T23:00:04Z
summarized: 2026-07-18T07:57:47.153Z
---

# Clickhouse is Winning the Observability Wars

> [kubernetes](../kubernetes.md) · 9 views · Jul 16, 2026
> [Watch on YouTube](https://youtu.be/mf86g5lXfTg)

## Summary

ClickHouse is winning the observability wars because its log architecture scales by replication rather than mutation, solving the fundamental tension between developer flexibility and operational schema rigor at enterprise scale. Drawing from Matt Duggan's observations, this talk explains why columnar storage, materialized views, and shared-nothing replication make ClickHouse the natural fit for high-cardinality, high-volume observability data.

## Key Takeaways

- Log architecture must scale by replication, not mutation — ClickHouse's shared-nothing design allows horizontal scaling of ingest without write conflicts.
- Schema drift and cardinality explosion in large distributed systems (400+ services) demand a storage engine that handles dynamic schemas natively.
- The tension between developers (agile, schema-less) and SRE teams (rigid, structured) is resolved by ClickHouse's materialized views, which separate ingest from query optimization.
- Columnar storage delivers 10-100x compression and query speed advantages over row-oriented stores for observability workloads like log analysis and trace aggregation.

## Topics Covered

`clickhouse` · `observability architecture` · `log aggregation` · `columnar storage` · `materialized views` · `shared-nothing replication` · `schema drift` · `cardinality management`

## Transcript

```
Welcome  everyone.  Today,  we're  diving into  a  crucial  topic  in  the  data landscape.  ClickHouse  is  winning  the observability  wars.  This  presentation will  unpack  the  fundamental architectural  shifts  that  are  driving this  trend,  specifically  focusing  on  why log  architecture  must  scale  by replication,  not  mutation.  These insights  are  largely  based  on  the profound  observations  made  by  Matt Duggan,  and  we'll  explore  what  this paradigm  means  for  building  highly performant  and  scalable  observability systems.  This  image  starkly  illustrates the  challenge  many  engineers  face  when transitioning  from  simple  to  complex systems.  On  the  left,  we  see  the  syslog box,  representing  a  straightforward environment  with  trivial  data  volume,  a single  user,  and  perfectly  manageable log  analysis  using  tools  like  grep  and jq.  This  ideal  scenario  fosters  an expectation  of  ease.  However,  moving  to the  right,  we  encounter  the  400  service beast.  This  intricate  web  of interconnected  services,  databases,  and APIs  typifies  modern  distributed systems.  Here,  the  challenges  escalate dramatically,  involving  constant  schema drift  and  cardinality  explosions, complex  cross-team  dashboard requirements,  and  the  need  to  derive high-stakes  VP-level  revenue  graphs  from this  data.  Ultimately,  the  ease  of  that initial  syslog  box  experience  often proves  detrimental,  as  it  inadequately prepares  individuals  for  the overwhelming  complexity  and  demands  of enterprise-scale  systems.  This  slide vividly  illustrates  the  inherent  tension between  two  critical  audiences: developers  and  the  teams  responsible  for support,  data,  and  on-call  operations. Developers,  on  the  left,  prioritize instant  access  to  logs,  the  flexibility for  arbitrary  operations,  and  often  an absolute  refusal  to  commit  to  a  rigid schema,  preferring  agility  and  rapid Conversely,  the  support,  data,  and on-call  teams,  represented  on  the  right, demand  dashboards  that  remain  stable indefinitely,  a  forgiving  user interface,  and  search  functionality  that reliably  works  even  when  troubleshooting at  3:00  in  the  morning. These  fundamentally  opposing  needs  often place  these  two  groups  at  war,  and  the crucial  insight  here  is  that  you,  as  the product  or  system  owner,  are  the diplomat  tasked  with  bridging  this divide  and  finding  solutions  that  serve both  essential  perspectives.  The peculiar  shape  of  a  log  highlights  four fundamental  characteristics  defining this  data  type.  First,  logs  are inherently  append-heavy  and time-ordered.  Data  arrives  roughly  in sequential  order,  is  almost  never updated,  and  individual  log  entries  are rarely  deleted  once  written.  This append-only  structure  is  central  to their  design. Secondly,  we  experience  bursty  read patterns.  For  extended  periods,  log  data might  not  be  actively  queried.  However, when  an  incident  occurs,  there's  an immediate  demand  to  scan  potentially billions  of  rows  across  vast  data  sets, requiring  results  within  seconds.  Third, log  data  is  highly  compressible.  We frequently  encounter  the  exact  same service  names,  host  names,  and  JSON  keys repeated  millions  of  times  within  a  data set.  This  inherent  redundancy  makes  log data  exceptionally  amenable  to  various compression  techniques,  which  is  vital for  managing  its  immense  scale. Finally,  queries  against  log  data  tend to  be  narrow.  Users  typically  target  a very  specific  time  range,  searching across  all  fields,  or  they  might aggregate  data  over  a  much  wider  period, but  apply  only  a  few  broad  filters.  This focused  retrieval  pattern  significantly influences  how  log  data  storage  and indexing  systems  are  optimized  for performance.  Delving  into  disk  I/O,  we uncover  a  critical  performance bottleneck  in  how  traditional row-oriented  databases  manage  data retrieval  compared  to  their  column oriented  counterparts. On  the  left,  we  see  the  model  for  row oriented  systems  exemplified  by databases  like  Elasticsearch  and When  a  query  requests,  for  instance, just  three  fields  from  a  table  that actually  contains  40  fields,  the  disk, unfortunately,  still  reads  all  40  fields for  every  single  row.  While  the  database will  eventually  filter  out  the  unneeded data  in  memory,  the  significant  overhead of  disk  IO  has  already  occurred,  leading to  wasted  bandwidth  and  increased In  stark  contrast,  the  column  oriented approach,  as  implemented  in  systems  like ClickHouse,  fundamentally  changes  this dynamic.  As  depicted  on  the  right,  when you  execute  a  query  such  as  select service  status  code  from  logs,  the system  intelligently  reads 
```

*Transcript truncated (18042 chars). Full transcript in [raw wiki](../raw/transcripts/mf86g5lXfTg.md).*


## Tags

[observability](../tags/observability.md) · [clickhouse](../tags/clickhouse.md) · [shards](../tags/shards.md)

## Related Videos

- [The 2026 Architectural Standard](https://youtu.be/WHonjixQgBY) — Kubernetes · 54 views · Jan 31, 2026 · [Details](WHonjixQgBY.md) (shared: `clickhouse` · `architecture`)
- [CUE: Navigating the Core Features](https://youtu.be/LUOX5xkSyi0) — Kubernetes · 29 views · Mar 16, 2026 · [Details](LUOX5xkSyi0.md) (shared: `schema` · `management`)
- [Dragonfly on AKS](https://youtu.be/Q4qm1hvVR2A) — Kubernetes · 21 views · Jan 31, 2026 · [Details](Q4qm1hvVR2A.md) (shared: `architecture` · `shared-nothing`)
- [Mastering Hybrid CDC Architectures](https://youtu.be/KdLQEv3Tiiw) — Kubernetes · 21 views · Apr 7, 2026 · [Details](KdLQEv3Tiiw.md) (shared: `architecture` · `storage`)
- [Enterprise Infrastructure as Code for Al Agents](https://youtu.be/quD4pyCwKB4) — Kubernetes · 68 views · Apr 25, 2026 · [Details](quD4pyCwKB4.md) (shared: `architecture` · `management`)

---
*Auto-generated on Jul 18, 2026. Back to [kubernetes](../kubernetes.md) · [index](../index.md).*