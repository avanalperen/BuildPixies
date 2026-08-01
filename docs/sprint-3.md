# BuildPixies — Sprint 3 Ultra Detaylı Final ve Teslim Planı

> **Belge türü:** Final sprint execution planı, release planı ve Bootcamp submission runbook'u
> **Sprint:** 3 / 3
> **Dönem:** 20 Temmuz – 2 Ağustos 2026
> **Durum:** Planlandı; Sprint 2 Review/Retro ve 20 Temmuz soru-cevap sonrası baseline edilir
> **Sprint Goal:** BuildPixies'i ürün değeri net, progressive AI deneyimi olan, production ortamında doğrulanmış, Scrum kanıtları ve en fazla 3 dakikalık videosu hazır bir submission candidate haline getirmek
> **Resmî teslim:** 2 Ağustos 2026 Pazar, 23:59
> **Takım içi teslim:** 2 Ağustos 2026, 18:00
> **Master plan:** [`docs/plan.md`](plan.md)

Sprint 3 yalnız “polish ve video” sprinti değildir. Kullanıcı deneyimi,
production güvenliği, teknik kanıt, Scrum belgeleri ve final sunumunun birlikte
kapatıldığı ürünleştirme sprintidir. Ana strateji daha fazla agent veya sekme
eklemek değil; BuildPixies'in değerini ilk 30 saniyede kanıtlamak, uzun AI işini
kademeli göstermek ve final sonucu eyleme dönük bir Command Center'da toplamaktır.

---

## 1. Sprint Başarı Tanımı

### 1.1 Sprint Goal

> Yeni kullanıcı BuildPixies'in ne yaptığını landing ve sample üzerinden
> anlayacak; gerçek bir fikirden üretilen blueprint'in ilerlemesini görecek;
> MVP scope, ilk sprint, risk ve sonraki aksiyonları tek ekranda okuyacak;
> çıktılarını saklayıp dışa aktarabilecek. Jüri aynı akışın teknik mimarisini,
> production hazırlığını ve üç sprintlik Scrum gelişimini repository içinde
> doğrulayabilecek.

### 1.2 Final kullanıcı yolculuğu

```text
Landing
  → Sample Blueprint veya New Project
  → Idea Wizard
  → Project Workspace
  → Gerçek Pixie / Section Progress
  → MVP Command Center
  → Product / Experience / Build / Delivery ayrıntıları
  → Regenerate / Copy / Export
  → Bootcamp Delivery Pack
  → Dashboard / Saved Project
```

### 1.3 Sprint sonunda beklenen ürün artışı

1. Gerçek generation events ve partial section sonuçları görünür.
2. Refresh/reconnect uzun işi kaybetmez.
3. MVP Command Center, blueprint'in kritik kararlarını tek ekranda özetler.
4. On bir dağınık tab, anlaşılır çıktı gruplarına dönüşür.
5. Core journey responsive, keyboard-usable ve error-aware olur.
6. Vercel + production Supabase üzerinde smoke doğrulanır veya deploy-ready
   sınırlama dürüstçe belgelenir.
7. AI orchestration, schema, retry, persistence, queue ve RLS kanıtı hazırlanır.
8. Final README, üç sprintin altı zorunlu kanıtını içerir.
9. Curated demo project ve en fazla üç dakikalık YouTube videosu hazırdır.
10. Teslim formu takım içi 18:00 hedefine kadar gönderilir.

### 1.4 Başarı ölçütleri

| Alan | Hedef | Kanıt |
| --- | --- | --- |
| Ürün anlaşılırlığı | 5-second testte en az 2/3 doğru cevap | User test notu |
| Sample | 30 saniye içinde blueprint sonucu | E2E + video |
| Progress feedback | Generate sonrası ≤2 sn state | E2E/screen record |
| Partial değer | İlk tamamlanan section finalden önce açılır | Long-job E2E |
| Command Center | Scope, risk, first sprint, next actions tek ekranda | UX acceptance |
| Deploy-ready | Production build + local production-mode smoke + migration sözleşme testi | Build log + smoke log + SQL test |
| Güvenlik | Cross-owner read engelli, secret-safe | RLS test + audit |
| Kalite | lint/typecheck/build/E2E/CI green | GitHub Actions |
| Evidence | Sprint 3 altı zorunlu madde | README/evidence audit |
| Video | 2:50–2:58, erişilebilir YouTube | Incognito playback |
| Teslim | Form ≤2 Ağustos 18:00 | Submission proof |

---

## 2. Planı Baseline Etme Kuralları

Sprint 3 backlog'u 20 Temmuz'da aşağıdaki girdiler alınmadan kesin commitment
sayılmaz:

- Sprint 2 tamamlanan/taşınan story listesi,
- Sprint 2 gerçek velocity'si,
- takım üyelerinin 20 Temmuz–2 Ağustos availability bilgisi,
- 20 Temmuz 20:00 Akademi soru-cevap notları,
- sample ve event contract'ın gerçek durumu,
- production environment erişimleri,
- bilinen P0 bug listesi.

### 2.1 Durum sözlüğü

| Durum | Anlamı |
| --- | --- |
| **Candidate** | Sprint 3 için aday; planning sonrası commitment olabilir |
| **Committed** | Capacity içinde, owner ve acceptance kesin |
| **In Progress** | Aktif çalışma, blocker görünür |
| **Code Complete** | Kod/test hazır; production/evidence eksik |
| **Done** | Main, test, production/evidence ve kabul tamam |
| **Dropped** | Bilinçli kapsam dışı; nedeni kayıtlı |

### 2.2 Freeze kuralları

- 25 Temmuz 20:00: core feature freeze.
- 28 Temmuz 20:00: Release Candidate 1.
- 30 Temmuz 20:00: README ve evidence freeze.
- 31 Temmuz 20:00: video script freeze.
- 1 Ağustos 18:00: submission candidate.
- 2 Ağustos 18:00: takım içi kesin teslim.

25 Temmuz'dan sonra yalnız P0 bug, deploy, accessibility, evidence, video ve
teslim işleri kabul edilir.

---

## 3. Takım, Sorumluluk ve Çalışma Ritmi

### 3.1 Önerilen ana sorumluluklar

| Kişi | Rol | Sprint 3 ana odağı |
| --- | --- | --- |
| Muhammed Köseoğlu | Product Owner | Command Center kabulü, user test, demo hikâyesi, video |
| Alperen Avan | Scrum Master | Board/evidence, environment koordinasyonu, release ve form |
| Kemal Ersin Özkan | Developer | Event backend, partial persistence, AI/runtime, Supabase/RLS |
| Selin Akkaş | Developer | Progressive workspace, output IA, responsive/accessibility, screenshots |

Bu dağılım proposal'dır; 20 Temmuz planning'de availability ile birlikte
kesinleştirilir.

### 3.2 Final sprint RACI

| İş | PO | SM | Kemal | Selin |
| --- | --- | --- | --- | --- |
| Sprint scope ve cut line | A/R | R | C | C |
| Generation events/persistence | C | C | A/R | C |
| Progressive workspace | C | C | R | A/R |
| Command Center | A | C | R | R |
| Output IA/refine | A | C | R | R |
| Production deploy/RLS | C | A | R | R |
| User test/accessibility | A/R | C | C | R |
| AI architecture evidence | A | C | R | C |
| README/evidence | R | A/R | R | R |
| Video | A/R | R | C | C |
| Submission | C | A/R | C | C |

### 3.3 Çalışma ritmi

| Ritüel | Zaman | Süre | Zorunlu çıktı |
| --- | --- | ---: | --- |
| Async Daily | Her gün 10:00'a kadar | 5–10 dk | Dün/bugün/blocker/evidence |
| Blocker triage | Gerektiğinde 17:00 | 15 dk | Owner, çözüm, kontenjan |
| Mid-sprint acceptance | 24 Temmuz | 30 dk | Core UX go/no-go |
| Feature freeze review | 25 Temmuz | 30 dk | Açık P0 listesi |
| RC1 review | 28 Temmuz | 45 dk | Public smoke sonucu |
| Evidence audit | 30 Temmuz | 45 dk | Broken link/eksik kanıt yok |
| Video prova | 31 Temmuz | 30 dk | Süre ve shot list |
| Final sign-off | 2 Ağustos 12:00 | 30 dk | Teslim onayı |

---

## 4. Capacity, Candidate Backlog ve Cut Line

### 4.1 Puan standardı

- Fibonacci `1, 2, 3, 5, 8`.
- 8'den büyük iş dikey dilimlere ayrılır.
- Candidate toplamı takım capacity'si değildir.
- Sprint 2'den taşınan iş yeniden estimate edilir; tamamlanan dilim sayılmaz.
- Done olmayan story puan kazanmaz.

### 4.2 Master candidate backlog

| ID | Kullanıcı/teslim sonucu | P | Master SP | Bağımlılık | Kanıt |
| --- | --- | ---: | ---: | --- | --- |
| BP-008R | Pixie state gerçek job event'lerinden gelir | P0 | 8 | S2 event contract | API + UI E2E |
| BP-025R | Partial outputs polling ile açılır | P0 | 8 | BP-008R/BP-031 | Long-job E2E |
| BP-031 | Events ve partial blueprint persist edilir | P0 | 8 | Migration/store | SQL/API test |
| BP-032 | Workspace gerçek timeline ve partial output gösterir | P0 | 8 | BP-031 | Playwright |
| BP-033 | MVP Command Center overview | P0 | 5 | Blueprint mapping | UX acceptance |
| BP-034 | Çıktılar anlamlı gruplara ayrılır | P0 | 5 | BP-033 | Responsive screenshot |
| BP-037 | Core journey accessibility/mobile polish | P0 | 5 | UI freeze | Keyboard/mobile test |
| ~~BP-039~~ | ~~Vercel production deploy~~ | — | — | — | **Dropped** (1 Ağustos, takım kararı) |
| ~~BP-040~~ | ~~Production Supabase migration/auth/RLS smoke~~ | — | — | — | **Dropped** (1 Ağustos, takım kararı) |
| BP-039R | Doğrulanmış deploy-ready paket kanıtı | P0 | 3 | Build/migration | Production build + local prod smoke + SQL sözleşme testi |
| BP-044 | En fazla 3 dakikalık YouTube video | P0 | 8 | RC1/demo | Incognito link |
| BP-045 | Submission form ve release checklist | P0 | 3 | Video/deploy/docs | Submission proof |
| BP-048 | AI architecture ve trace kanıtı | P0 | 3 | Event/log | Diagram + README |
| **Candidate toplam** |  |  | **71** |  |  |

71 puan otomatik commitment değildir. Planning sırasında Sprint 2'de tamamlanan
contract dilimleri BP-008R/BP-031 puanından düşülür ve takım availability'sine
göre committed toplam belirlenir.

### 4.2.1 Gerçekleşen durum (1 Ağustos 2026)

Aşağıdaki durumlar `main` üzerindeki koddan doğrulanmıştır; kalite kapısı
(`lint`, `typecheck`, `build`, `test:e2e` 9/9) her commit'te yeşildir.

| ID | Durum | Kanıt |
| --- | --- | --- |
| BP-008R | Done | `progress.steps[]` job kaydından; `lib/pixie-progress.ts`, workspace |
| BP-031 | Done | `202608010001`, `202608010002` migration; partial persistence E2E |
| BP-025R/BP-032 | Done | Refresh-mid-job E2E; tamamlanan bölüm run bitmeden açılıyor |
| BP-033 | Done | `lib/command-center.ts` deterministic mapping; Overview default |
| BP-034 | Done | Overview / Product / Experience / Build / Delivery grupları |
| BP-037 | Code Complete | Mobile keyboard journey E2E; dar ekran okunabilirlik düzeltmeleri |
| BP-048 | Done | README "AI Mimarisi ve Üretim İzi" bölümü + diyagram |
| BP-039/BP-040 | **Dropped** | Ürün canlıya alınmayacak (takım kararı, 1 Ağustos). Yerine BP-039R |
| BP-039R | In Progress | Deploy-ready kanıtı: production build, local production-mode smoke, migration sözleşme testi |
| BP-044/BP-045 | Planned | RC1 sonrası; video ve form takım işi |

**Bilinen açık sınırlama:** bir bölüm kalıcı olarak başarısız olduğunda tüm
pipeline yeniden çalıştırılır; kısmi bölümler saklandığı için kullanıcı değer
kaybetmez ama tamamlanmış bölümler tekrar üretilir. Ücretsiz sağlayıcı
gecikmesiyle birlikte bu, uzun koşularda maliyet değil süre riskidir.

### 4.3 P1 yalnız core stabilse

| ID | Sonuç | SP | Go koşulu |
| --- | --- | ---: | --- |
| BP-035 | Controlled refine aksiyonu | 5 | 24 Temmuz core UX green |
| BP-036 | Bootcamp Mode ayrı Delivery Pack route | 5 | IA risk yaratmıyor |
| BP-038 | Safe generation observability | 3 | Secret-safe temel hazır |
| BP-041 | Public quota + Turnstile/CAPTCHA | 5 | Public abuse riski yüksek |
| BP-047 | Üç hedef kullanıcı testi | 3 | En az ikisi P0; üçüncüsü capacity |

### 4.4 Sprint sonrası bırakılacaklar

- tam Agents SDK migration,
- pgvector decision memory,
- email/OAuth account linking,
- free-form AI chat,
- yeni pixie rolleri,
- gereksiz animasyon ve mikro-etkileşim çeşitleri.

### 4.5 Cut line

Zaman daralırsa şu sıra uygulanır:

1. Agents SDK/pgvector/account linking zaten Sprint dışıdır.
2. BP-035 controlled refine düşer; mevcut regenerate korunur.
3. BP-036 ayrı route düşer; mevcut Bootcamp Mode sadeleştirilir.
4. BP-041 UI düşer; private demo quota/rate limit ve risk notu korunur.
5. Output grouping daha küçük dikey dilime iner; Overview korunur.

Asla düşürülmez:

- çalışan core journey,
- curated sample,
- anlaşılır MVP overview,
- kalite ve güvenlik baseline,
- Sprint 3 altı kanıtı,
- final README/video/form,
- honest known limitations.

---

## 5. Epiklere Göre Uygulama Planı

### 5.1 Epic A — Progressive AI Execution

**Amaç:** 3–4 dakikalık free-provider çalışması boş bekleme olmaktan çıkar.

Alt işler:

1. `GenerationEvent` domain tipi,
2. job/section/pixie status transition kuralları,
3. local store event persistence,
4. Supabase migration ve durable adapter,
5. orchestrator progress callback,
6. poll response backward compatibility,
7. partial blueprint publish kuralı,
8. retry/idempotency,
9. refresh/reconnect,
10. failure durumunda tamamlanan section'ları koruma.

**Exit criteria:** Gerçek bir generation çalışırken hangi bölümün queued,
running, done veya failed olduğu API ve UI'da aynı gerçeği gösterir.

### 5.2 Epic B — MVP Command Center

**Amaç:** Kullanıcı 11 sekmeyi gezmeden uygulanabilir MVP kararını görür.

Overview alanları:

- tek cümlelik ürün,
- hedef kullanıcı ve ana problem,
- must-have kapsam,
- out-of-scope kararları,
- en önemli risk,
- önerilen ilk sprint,
- sonraki üç aksiyon,
- detay gruplarına geçiş.

**Exit criteria:** Sample ve gerçek proje aynı component ile çalışır; veri
validated blueprint'ten deterministic türetilir; boş/partial state kırılmaz.

### 5.3 Epic C — Output Information Architecture

Önerilen gruplama:

| Grup | İçerik |
| --- | --- |
| Overview | MVP kararı, scope, risk, first sprint, next actions |
| Product | Product brief, market angle, MVP scope, backlog |
| Experience | UX flow, screens, states |
| Build | Tech plan, code skeleton, test plan |
| Delivery | Sprint plan, README export, Bootcamp report |

**Exit criteria:** Header aktif içeriği doğru adlandırır; keyboard tab sırası ve
mobile layout anlamlıdır; export/regenerate davranışı kaybolmaz.

### 5.4 Epic D — Production Readiness

Alt işler:

- Vercel project ve env matrix,
- Supabase production migrations,
- anonymous auth bootstrap,
- owner/RLS isolation,
- Vercel Queue callback/region doğrulaması,
- hosted local-store fail-closed,
- rate limit ve abuse kararı,
- safe request IDs/logs,
- dependency audit,
- incognito smoke ve rollback notu.

**Exit criteria:** Public URL core demo akışını çalıştırır; user A, user B'nin
projesini okuyamaz; key/log/browser bundle içinde görünmez.

### 5.5 Epic E — Evidence, Video ve Submission

Alt işler:

- daily/board/product/review/retro evidence,
- final README,
- AI architecture diagram,
- curated project,
- 180 saniyelik video script,
- recording/upload/incognito check,
- form draft ve final submission,
- submission proof.

**Exit criteria:** Jüri ürünü, teknik yaklaşımı ve Scrum sürecini bozuk/private
link olmadan doğrular.

---

## 6. Gün Gün Sprint 3 Planı

### 6.1 20 Temmuz — Planning ve Akademi soru-cevap

**Hedef:** Sprint 3'ü gerçek capacity ve güncel kurallarla baseline etmek.

| İş | Owner | Çıktı |
| --- | --- | --- |
| Sprint 2 Review/Retro carryover audit | SM + PO | Taşınan story listesi |
| Availability ve capacity | SM + herkes | Committed puan |
| P0/P1/cut line | PO | Board sırası |
| Owner/dependency/acceptance | Ekip | Ready stories |
| 20:00 soru-cevap notları | Temsilci | Değişen kural listesi |
| Master/sprint plan sync | PO + SM | Güncel docs |

**Exit:** Sprint Goal, committed backlog, owner ve cut line kesin.

**Evidence:** Planning board screenshot, meeting note, capacity tablosu.

### 6.2 21 Temmuz — Event ve partial persistence backend

**Hedef:** Gerçek progress için backend gerçeğini kurmak.

- GenerationEvent type ve transition guard,
- local/Supabase storage adapter,
- migration ve owner isolation,
- orchestrator callback,
- poll response contract,
- idempotency/retry testleri,
- safe event message standardı.

**Test:** Unit/SQL/API smoke; duplicate retry; unauthorized read.

**Exit:** API gerçek section progress döndürüyor ve partial result güvenli saklanıyor.

**Evidence:** Contract snippet, migration/test sonucu, PR/CI.

### 6.3 22 Temmuz — Progressive workspace

**Hedef:** Uzun iş kullanıcıya gerçek ve anlaşılır ilerleme verir.

- gerçek active pixie state,
- queued/running/done/failed timeline,
- partial section preview,
- refresh/reconnect,
- failure halinde tamamlanan sonuçları koruma,
- live region/ARIA status,
- mobile layout,
- fake simultaneous `thinking` state'lerini kaldırma.

**Test:** Long-running Playwright, refresh mid-job, partial failure, mobile.

**Exit:** 252 saniyelik iş artık boş ve belirsiz bekleme değildir.

**Evidence:** Screen recording, E2E, desktop/mobile screenshot.

### 6.4 23 Temmuz — MVP Command Center

**Hedef:** Kullanıcı blueprint'in kritik kararlarını tek ekranda anlar.

- Overview component,
- deterministic data mapping,
- must-have ve out-of-scope,
- risk ve mitigation,
- first sprint,
- next three actions,
- copy first sprint,
- sample/real/partial/empty states.

**Test:** Fixture/component, sample E2E, empty array, mobile/keyboard.

**Exit:** PO acceptance; kullanıcı “şimdi ne yapmalıyım?” sorusunu cevaplayabilir.

**Evidence:** Acceptance notu ve final overview screenshot.

### 6.5 24 Temmuz — Output IA ve refinement

**Hedef:** Detayları karar hiyerarşisine göre düzenlemek.

- Overview/Product/Experience/Build/Delivery grupları,
- doğru active header,
- deep-link veya state davranışı,
- copy/export/regenerate parity,
- en değerli controlled refine aksiyonu için go/no-go,
- mid-sprint PO acceptance.

**Test:** Tüm section erişimi, keyboard tab order, mobile overflow, export parity.

**Exit:** Hiçbir mevcut çıktı kaybolmadan navigation sadeleşir.

### 6.6 25 Temmuz — Core feature freeze

**Hedef:** Ürün kapsamını dondurup release hattına geçmek.

- tüm committed story acceptance audit,
- açık P0 bug ve blocker listesi,
- BP-035/BP-036 go/no-go,
- Agents SDK/pgvector kesin olarak post-Bootcamp veya dropped,
- known limitations taslağı,
- final demo journey dry run.

**Exit:** Yalnız bug, deploy, accessibility, evidence ve video işi kalır.

**Evidence:** Freeze board screenshot ve karar kaydı.

### 6.7 26 Temmuz — Security, privacy ve observability

**Hedef:** Production ortamında güvenli ve izlenebilir davranış.

- server/client env matrisi,
- hosted local fallback fail-closed,
- RLS policy ve owner isolation,
- queue callback authentication,
- API quota/rate limit,
- safe request/job ID logs,
- raw prompt/output/secret redaction,
- `npm audit` ve dependency review,
- incident/rollback notu.

**Test:** User A/B isolation, missing env, invalid callback, rate limit, bundle/log scan.

**Exit:** Production readiness checklist en az %80; açık risk owner/tarihli.

### 6.8 27 Temmuz — User test ve accessibility

**Hedef:** Gerçek kullanıcı ürün değerini anlayıp core task'i tamamlar.

Test görevleri:

1. Landing'e 5 saniye bak ve ürünün ne yaptığını anlat.
2. Sample blueprint'i bul.
3. MVP'nin must-have ve ilk sprintini göster.
4. Kendi fikrin için proje başlat.
5. Bir çıktıyı dışa aktar.

Accessibility kontrolü:

- yalnız keyboard,
- görünür focus,
- label/name/role,
- status live region,
- contrast,
- 390×844 ve 768×1024,
- reduced motion,
- error summary.

**Exit:** En az iki gerçek test; en kritik üç bulgu çözülmüş veya karar kayıtlı.

**Evidence:** Anonim test tablosu, before/after, accessibility checklist.

### 6.9 28 Temmuz — Release Candidate 1

**Hedef:** Public, incognito erişilebilir ilk release candidate.

- Vercel production deploy,
- Supabase migrations,
- auth/RLS smoke,
- queue worker/callback,
- landing → sample,
- wizard → project,
- generation veya controlled demo,
- overview → export,
- Bootcamp report,
- dashboard persistence,
- GitHub homepage ve description.

**Exit:** Public RC1 URL erişilebilir; kritik smoke green; rollback yolu biliniyor.

**Evidence:** URL, timestamped smoke log, screenshot, CI/deploy status.

### 6.10 29 Temmuz — Demo project ve AI architecture evidence

**Hedef:** Jüri ürün ve AI derinliğini repository içinde doğrular.

- curated project final copy,
- prompt/role dependency graph,
- model/provider rationale,
- strict schema ve validation,
- retry/backoff,
- queue/lease/idempotency,
- storage/RLS,
- regenerate context,
- current role-based pipeline vs future SDK ayrımı,
- safe trace/event örneği.

**Exit:** Teknik kriterlerin her biri kod, diagram veya test bağlantısına sahip.

### 6.11 30 Temmuz — README ve evidence freeze

**Hedef:** Repository submission-ready hale gelir.

- Sprint 3 board başlangıç/orta/final screenshot,
- landing/dashboard/wizard/workspace/progress/overview/delivery screenshot,
- persona ve Lean Canvas özeti,
- üç sprint linki,
- current/future architecture,
- known limitations,
- repo description/topics/homepage,
- broken link ve privacy audit,
- issue state audit.

**Exit:** README ve evidence üzerinde içerik freeze; yalnız kritik doğruluk düzeltmesi.

### 6.12 31 Temmuz — Video script ve prova

**Hedef:** 3 dakikadan kısa, problem→çözüm→kanıt→teknik derinlik anlatısı.

- 180 saniyelik script,
- screen recording shot list,
- browser/demo data temizliği,
- iki süreli prova,
- cursor/zoom/microphone kontrolü,
- 1080p setup,
- thumbnail,
- backup recording planı.

**Exit:** İki provada süre 2:50–3:00; demo akışı aynı sırada tekrarlanabilir.

### 6.13 1 Ağustos — Video ve Submission Candidate

**Hedef:** Video ve tüm teslim linkleri final adayıdır.

- final recording,
- minimum edit ve gerekirse subtitle,
- YouTube upload,
- public/unlisted erişim kararı,
- incognito playback,
- mobile/browser link check,
- submission form taslağı,
- release tag adayı,
- backup video/local export.

**Exit:** Video ≤3:00, link erişilebilir, form alanları önceden doldurulabilir.

### 6.14 2 Ağustos — Final teslim runbook

| Saat | Aktivite | Owner | Çıkış koşulu |
| --- | --- | --- | --- |
| 10:00 | Production smoke | Dev ekip | Core journey green |
| 11:00 | README/link/secret/privacy audit | PO + SM | Kritik hata yok |
| 12:00 | Team sign-off | Ekip | Release kabulü |
| 13:00 | Final backup ve release tag | SM + Dev | Immutable referans |
| 14:00 | Form alanlarını doldurma | SM + PO | URL ve bilgiler doğru |
| 16:00 | İkinci kişiyle form review | Reviewer | Typo/broken link yok |
| **18:00** | **Form gönderimi** | **SM** | **Submission proof saklandı** |
| 18:00–23:59 | Yalnız kanıtlanmış teslim sorunu tamponu | Ekip | Yeni feature yok |

23:59 hedef değil, resmî son sınırdır.

---

## 7. Öncelikli Acceptance Criteria

### 7.1 BP-031 — Event ve partial persistence

- Local ve durable store aynı event domain tipini kullanır.
- Event: id, job, pixie, section, status, safe message, timestamp.
- Section schema validation sonrası `done` olur.
- Partial output job failure sonrasında kaybolmaz.
- Retry duplicate event üretse bile UI idempotent davranır.
- Owner dışındaki kullanıcı event veya partial sonucu okuyamaz.
- Raw prompt, key ve hassas output loglanmaz.
- Migration ve backward compatibility planı belgelenir.

### 7.2 BP-032 — Progressive workspace

- Generate sonrası iki saniye içinde queued/running state.
- Yalnız gerçek aktif pixie working görünür.
- Tamamlanan bölüm pipeline bitmeden açılır.
- Refresh/reconnect job takibini korur.
- Failed state tamamlanan section'ları göstermeye devam eder.
- Retry butonu varsa gerçek endpoint'e bağlıdır.
- Mobile timeline ve output okunur.
- Screen reader status değişikliklerini duyabilir.

### 7.3 BP-033 — Command Center

- Default görünüm Overview.
- Ürün, persona, must-have, out-of-scope, risk, first sprint ve next actions.
- Mapping deterministic ve schema-safe.
- Sample ve gerçek project ortak component.
- Empty/partial data güvenli state gösterir.
- First sprint ve next actions kopyalanabilir.
- En az iki kullanıcı ana kararı yardım almadan bulabilir.

### 7.4 BP-039/BP-040 — Production release

- Vercel build green.
- Production migration'ları uygulanmış.
- User A, user B project/job verisini okuyamaz.
- Project create → sample/generation → overview → export smoke geçer.
- Queue callback ve region config doğrulanır.
- Hosted ortam local JSON store'a sessiz düşmez.
- Server-only env browser bundle/log içinde görünmez.
- Public URL incognito çalışır ve GitHub homepage'e eklenir.

### 7.5 BP-044 — Final video

- Süre 3:00 altında, hedef 2:50–2:58.
- Problem, ürün vaadi, core demo, AI mimarisi ve pazar kapanışı içerir.
- Curated sample kullanımı dürüstçe gösterilir.
- 1080p, okunabilir zoom ve anlaşılır ses.
- Personal notification/bookmark/secret görünmez.
- Copyright riski taşıyan asset/audio yok.
- YouTube linki incognito çalışır.

### 7.6 BP-045 — Submission

- GitHub, video ve varsa production URL doğru.
- Takım/ürün bilgileri README ve formla aynı.
- Üç sprint kanıt bağlantısı erişilebilir.
- Form ikinci kişi tarafından review edilmiş.
- 18:00 iç hedefine kadar gönderilmiş.
- Gönderim zamanı ve kanıtı saklanmış.

---

## 8. Bootcamp Zorunlu Altı Kanıt

| Zorunlu alan | Sprint 3 standardı | Owner | Evidence |
| --- | --- | --- | --- |
| Backlog dağıtma mantığı | Capacity, 71 candidate, commitment ve cut line | PO + SM | Planning note + README |
| Daily Scrum | 20 Temmuz–2 Ağustos tarihli gerçek not | Herkes/SM | `daily/` |
| Sprint Board Updates | Planning, mid, freeze, final | SM | `board/` |
| Ürün Durumu | Progress, overview, output, deploy, mobile | Selin + PO | `product/` |
| Sprint Review | Final demo, kalite, teslim sonucu, katılımcı | PO + SM | `review/` |
| Sprint Retrospective | Altı haftalık öğrenim ve owner/tarihli aksiyon | SM + ekip | `retrospective/` |

### 8.1 Evidence yapısı

```text
docs/evidence/sprint-3/
  daily/
  board/
  product/
  review/
  retrospective/
docs/evidence/user-testing/
docs/evidence/architecture/
```

### 8.2 Minimum görsel set

1. Planning board,
2. mid-sprint board,
3. feature-freeze board,
4. final board,
5. landing desktop/mobile,
6. sample blueprint,
7. real progress timeline,
8. Command Center,
9. output details,
10. export/Delivery Pack,
11. dashboard,
12. production URL.

Her görsel tarih, caption, ilgili story ve neyi kanıtladığı bilgisiyle eklenir.

---

## 9. Kalite, Test ve Release Stratejisi

### 9.1 Her PR kapısı

```bash
npm run lint
npm run typecheck
npm run build
npm run test:e2e
```

### 9.2 Kritik E2E matrisi

| Journey | Local | CI mock | Production smoke |
| --- | --- | --- | --- |
| Landing → sample | Zorunlu | Zorunlu | Zorunlu |
| Landing → wizard → project | Zorunlu | Zorunlu | Zorunlu |
| Generation → progressive overview | Zorunlu | Zorunlu | Controlled smoke |
| Refresh/reconnect mid-job | Zorunlu | Zorunlu | Manuel |
| Partial failure/retry | Zorunlu | Zorunlu | Gerekirse staging |
| Regenerate → persistence | Zorunlu | Zorunlu | Zorunlu |
| README/JSON export | Zorunlu | Zorunlu | Zorunlu |
| Bootcamp report | Zorunlu | Zorunlu | Zorunlu |
| Dashboard owner isolation | Zorunlu | Zorunlu | Zorunlu |
| Mobile keyboard journey | Zorunlu | Kritik subset | Manuel |

### 9.3 Production smoke sırası

1. Incognito landing 200,
2. sample route ve tüm output grupları,
3. anonymous session oluşumu,
4. project create,
5. generation job veya controlled provider smoke,
6. overview ve section access,
7. regenerate ve refresh,
8. README/JSON export,
9. Bootcamp report,
10. dashboard persistence,
11. ikinci anonymous user isolation,
12. rate limit ve error state.

### 9.4 Release rollback yaklaşımı

- Son green commit SHA kayıtlı tutulur.
- Migration backward compatibility değerlendirilir.
- Feature flag yoksa riskli P1 merge edilmez.
- Production AI başarısızsa sample route core demo'yu korur.
- Queue problemi varsa yeni generation geçici kapatılır; mevcut sample ve saved
  projects çalışmaya devam eder.
- Kritik security problemi varsa public URL kısıtlanır ve risk çözülmeden formda
  canlı ürün diye sunulmaz.

---

## 10. Güvenlik, Gizlilik ve AI Dürüstlüğü

### 10.1 Güvenlik baseline

- `.env.local` tracked değildir.
- OpenRouter/Supabase service key client bundle'a girmez.
- Raw prompt ve hassas blueprint safe log dışında tutulur.
- Anonymous owner/RLS production'da test edilir.
- Queue callback yetkisiz çağrıyı reddeder.
- Public generation rate-limitlidir.
- Screenshot ve video kişisel veri içermez.

### 10.2 Dürüst AI anlatısı

BuildPixies mevcut durumda dependency-aware, role-based ve strict structured
output kullanan OpenAI-compatible bir orchestration pipeline'ıdır. Kullanılmayan
Agents SDK veya pgvector memory varmış gibi anlatılmaz. Future roadmap ile
current implementation açıkça ayrılır.

### 10.3 Bilinen sınırlamalar

- Free model latency ve availability,
- OpenRouter 429 riski,
- progressive event kapsamının gerçek durumu,
- anonymous account linking eksikliği,
- production quota/abuse sınırı,
- SDK/vector memory'nin roadmap olması.

---

## 11. Jüri Kriterleriyle Sprint 3 Eşleme

### 11.1 Ön değerlendirme

| Kriter | Max | Sprint 3 kanıtı |
| --- | ---: | --- |
| Yarışmaya hazır çalışan proje | 10 | Public RC, smoke, E2E, sample |
| Özgünlük | 10 | Pixie role graph, Command Center, Delivery Pack |
| Ürün tamamlanma | 10 | End-to-end core journey ve final evidence |
| Pazara uygunluk | 10 | Persona, 5-second test, user test, Lean Canvas |

### 11.2 Teknik alanlar

| Kriter | Max | Sprint 3 kanıtı |
| --- | ---: | --- |
| AI model/agent/memory/orchestration | 20 | Role graph, schema, context, retry, event trace |
| Mimari/clean code | 15 | Layering, storage adapter, queue, RLS, CI |
| Canlı/deploy-ready | 10 | Vercel URL veya açık deploy-ready kanıt |

### 11.3 Final değerlendirme

| Kriter | Max | Demo mesajı |
| --- | ---: | --- |
| İhtiyaç ve çözüm eşleşmesi | 20 | Dağınık fikir → uygulanabilir MVP kararı |
| Kullanıcı değeri ve deneyimi | 10 | Sample, progress, next actions |
| Pazar potansiyeli | 10 | Bootcamp wedge → solo builders |
| Fonksiyonel yeterlilik | 15 | Create, generate, persist, refine, export |
| Ürün bütünlüğü | 10 | Design system, IA, states, mobile |
| Yapay zeka öğeleri | 35 | Orchestration, schema, reliability, trace |

---

## 12. Üç Dakikalık Video Planı

### 12.1 Storyboard

| Süre | Görüntü | Ana mesaj |
| --- | --- | --- |
| 0:00–0:15 | Dağınık fikir problemi | Fikir ile uygulanabilir plan arasındaki boşluk |
| 0:15–0:30 | Landing Before/After | BuildPixies'in tek cümlelik vaadi |
| 0:30–0:50 | Wizard | Audience, goal, constraints |
| 0:50–1:15 | Gerçek progress | Pixie/section orchestration |
| 1:15–1:45 | Command Center | Scope, risk, first sprint, next actions |
| 1:45–2:05 | Build/Delivery | Tech, backlog, tests, export |
| 2:05–2:20 | Bootcamp Delivery Pack | Gerçek notlardan Scrum çıktısı |
| 2:20–2:42 | AI architecture | Schema, queue, retry, persistence, RLS |
| 2:42–2:55 | Pazar/kapanış | Bootcamp teams → solo builders |

### 12.2 Demo güvenliği

- Curated project ana demo kaynağıdır.
- Uzun generation beklemesi hızlandırılırsa belirtilir.
- Personal notification, bookmark ve password manager kapalıdır.
- Console/network içinde secret gösterilmez.
- Junk local projects temizlenir.
- Backup recording ve sample route hazırdır.

---

## 13. Risk Kaydı ve Kontenjan Planı

| Risk | Olasılık | Etki | Tetikleyici | Önlem | Kontenjan | Owner |
| --- | --- | --- | --- | --- | --- | --- |
| Progressive iş yetişmez | Orta-yüksek | Çok yüksek | 22 Temmuz API/UI yok | S2 contract + vertical slice | Event trace + sample; fake progress yok | Kemal |
| Command Center anlaşılmıyor | Orta | Yüksek | User test başarısız | Deterministic minimal overview | Daha az alan, net next actions | PO |
| OpenRouter 429/latency | Yüksek | Yüksek | 429 veya >180s | Retry, partial progress | Curated sample | Kemal |
| Deploy gecikir | Orta | Çok yüksek | 28 Temmuz RC yok | Env/migration erken | Deploy-ready kanıt + local video | SM |
| RLS açığı | Orta | Çok yüksek | Cross-owner read | Isolation smoke | Public generation kısıtla | Kemal |
| Evidence eksik | Orta | Çok yüksek | 30 Temmuz açık alan | Günlük owner | Gerçek kaynak varsa backfill | SM |
| Video geç/uzun | Orta | Çok yüksek | 31 Temmuz prova yok | Script freeze | Tek take, curated sample | PO + SM |
| Scope creep | Yüksek | Yüksek | 25 Temmuz yeni feature | Freeze/cut line | P1 drop | PO |
| Secret/privacy | Düşük | Çok yüksek | Log/video sızıntısı | Safe logs/redaction | Revoke/rotate/re-record | Ekip |
| README/kod çelişkisi | Orta | Yüksek | Yanlış Done/claim | 30 Temmuz audit | Claim'i Partial yap | SM |

---

## 14. Sprint Review ve Retrospective

### 14.1 Final Sprint Review demo sırası

1. Sprint Goal ve kullanıcı problemi,
2. landing/sample,
3. wizard/project,
4. real progress,
5. Command Center,
6. output/refine/export,
7. production URL ve kalite,
8. AI architecture,
9. tamamlanan/taşınan/dropped işler,
10. video ve submission sonucu.

### 14.2 Review kayıt zorunlulukları

- gerçek katılımcılar,
- committed ve completed SP,
- P0/P1 sonuçları,
- production smoke sonucu,
- CI URL,
- user test bulguları,
- bilinen sınırlamalar,
- submission URL/kanıt durumu.

### 14.3 Final retrospective soruları

- Altı haftada hangi karar en çok değer üretti?
- Hangi teknik yatırım kullanıcıya geç yansıdı?
- Scrum kanıtını ne zaman üretmek en etkiliydi?
- AI araçları nerede hızlandırdı, nerede doğrulama maliyeti yarattı?
- Final haftasında hangi kapsam doğru biçimde düşürüldü?
- BuildPixies Bootcamp sonrasında devam edecekse ilk üç ürün hedefi ne?

Retro en fazla üç owner/tarihli aksiyonla kapanır.

---

## 15. Sprint 3 Definition of Done

### 15.1 Ürün

- [ ] Landing 5-second test geçiyor.
- [ ] Sample blueprint AI beklemeden açılıyor.
- [ ] Wizard/project persistence çalışıyor.
- [ ] Gerçek progress veya açıkça kanıtlanmış event trace var.
- [ ] Partial result kullanıcıya erken değer veriyor.
- [ ] MVP Command Center ana kararları gösteriyor.
- [ ] Output grupları anlaşılır.
- [ ] Regenerate ve export çalışıyor.
- [ ] Core journey mobile ve keyboard kullanılabilir.

### 15.2 Production ve kalite

- [ ] Public URL veya doğrulanmış deploy-ready paket var.
- [ ] Production Supabase migrations güncel.
- [ ] Owner/RLS isolation smoke geçti.
- [ ] Queue/worker davranışı doğrulandı.
- [ ] Hosted local fallback fail-closed.
- [ ] Rate limit/abuse kararı kayıtlı.
- [ ] lint/typecheck/build/E2E/CI green.
- [ ] Açık critical/high security problemi yok.

### 15.3 Bootcamp ve teslim

- [ ] Sprint 3 altı zorunlu kanıtı tamam.
- [ ] Sprint 1 ve Sprint 2 link/kanıtları erişilebilir.
- [ ] Final README güncel.
- [ ] AI architecture ve known limitations doğru.
- [ ] Video 3:00 altında ve incognito erişilebilir.
- [ ] GitHub/public URL/form bilgileri tutarlı.
- [ ] Team sign-off tamam.
- [ ] Form 2 Ağustos 18:00'e kadar gönderildi.
- [ ] Submission proof saklandı.

---

## 16. Final Submission Checklist

### Repository

- [ ] Public repo ve default `main`.
- [ ] Main/origin senkron, temiz worktree.
- [ ] Final CI green.
- [ ] Repo description, topics ve homepage doğru.
- [ ] Açık P0 issue yok veya known limitation.
- [ ] Broken/private link yok.
- [ ] Secret tracked değil.
- [ ] Final tag/release var.

### Ürün ve production

- [ ] Landing/sample/wizard/workspace/overview/export smoke.
- [ ] Dashboard persistence.
- [ ] Error/empty/loading/partial states.
- [ ] Mobile/keyboard.
- [ ] Production auth/RLS.
- [ ] Queue/rate limit.
- [ ] Incognito browser.

### Bootcamp belgeleri

- [ ] Takım, roller, ürün, hedef kitle.
- [ ] Product Backlog URL.
- [ ] Sprint 1 altı madde.
- [ ] Sprint 2 altı madde.
- [ ] Sprint 3 altı madde.
- [ ] Board/product/daily/review/retro kanıtları.
- [ ] Teknik mimari ve AI anlatısı.
- [ ] Known limitations.

### Video ve form

- [ ] YouTube linki ve süre.
- [ ] GitHub URL.
- [ ] Production URL veya deploy-ready notu.
- [ ] Form ikinci kişi review.
- [ ] 18:00 gönderim.
- [ ] Gönderim kanıtı.

---

## 17. İlgili Kaynaklar

- [`Bootcamp master planı`](plan.md)
- [`Sprint 1 tarihsel kapanış kaydı`](sprint-1.md)
- [`Sprint 2 uygulama ve kapanış planı`](sprint-2.md)
- [`Bootcamp kılavuzu`](bootcamp.md)
- [`Bilgilendirme toplantısı`](<bootcamp bilgilendirme toplantısı.md>)
- [`Karar kaydı`](decision-log.md)
- [`BuildPixies README`](../README.md)
- [GitHub Issues](https://github.com/avanalperen/BuildPixies/issues)
- [GitHub Actions](https://github.com/avanalperen/BuildPixies/actions)

### Son karar

> Sprint 3 başarısı daha çok özellik üretmekle ölçülmez. Başarı; BuildPixies'in
> değerini ilk 30 saniyede kanıtlamak, uzun AI çalışmasını gerçek progress ile
> görünür yapmak, sonucu eyleme dönük bir MVP karar ekranına çevirmek, ürünü
> production kalitesiyle doğrulamak ve altı haftalık Scrum gelişimini eksiksiz
> ve dürüst biçimde teslim etmektir.
