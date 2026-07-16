# **Takım İsmi**

BuildPixies

---

# Ürün İle İlgili Bilgiler

## Takım Elemanları

<table>
  <tr>
    <th>Name</th>
    <th>Title</th>
    <th>Socials</th>
  </tr>
  <tr>
    <td><a href="https://github.com/Vartmor">Muhammed Köseoğlu</a></td>
    <td>Product Owner</td>
    <td>
      <a href="https://github.com/Vartmor" target="_blank"><img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub" width="20" height="20" /></a>
      <a href="https://www.linkedin.com/in/muhammed-koseoglu/" target="_blank"><img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png" alt="LinkedIn" width="20" height="20" /></a>
    </td>
  </tr>
  <tr>
    <td><a href="https://github.com/avanalperen">Alperen Avan</a></td>
    <td>Scrum Master</td>
    <td>
      <a href="https://github.com/avanalperen" target="_blank"><img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub" width="20" height="20" /></a>
      <a href="https://www.linkedin.com/in/alperenavan/" target="_blank"><img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png" alt="LinkedIn" width="20" height="20" /></a>
    </td>
  </tr>
  <tr>
    <td>Kemal Ersin Özkan</td>
    <td>Developer</td>
    <td>GitHub / LinkedIn eklenecek</td>
  </tr>
  <tr>
    <td>Selin Akkaş</td>
    <td>Developer</td>
    <td>GitHub / LinkedIn eklenecek</td>
  </tr>
</table>

## Ürün İsmi

**BuildPixies**

## Ürün Açıklaması

BuildPixies, fikri olan ama ürüne nereden başlayacağını bilmeyen kullanıcılar
için tasarlanmış web tabanlı bir **AI product planning workspace**'idir.
Kullanıcı dağınık fikrini yazar; ürün, UX, teknik mimari, QA, scrum ve dokümantasyon
rollerindeki pixie agent'lar bu fikri yapılandırılmış bir MVP blueprint'ine
dönüştürür.

Ürün tek bir "kod yazdırma aracı" değil; fikirden uygulanabilir ürün planına
giden yolu yönetir. Çıktılar product brief, MVP scope, UX flow, tech plan,
backlog, test planı, sprint planı ve README export gibi teslim edilebilir
formatlarda hazırlanır.

**Tagline:** Turn messy ideas into build-ready MVPs.

## Ürün Özellikleri

### Mevcut MVP Akışı

- Fikirden yapılandırılmış product brief üretimi
- MVP scope: must-have / nice-to-have / out-of-scope ayrımı
- User story, priority ve acceptance criteria içeren backlog üretimi
- UX flow: kullanıcı yolculuğu, ekran listesi, empty/error state önerileri
- Tech plan: stack, veri modeli, API planı, mimari riskler
- Market angle ve farklılaşma özeti
- Code skeleton: başlangıç dosya ağacı ve geliştirme görevleri
- Test planı: happy path, edge case, güvenlik riskleri, demo checklist
- Sprint planı ve README.md export
- Output Hub'da Markdown kopyalama ve JSON indirme
- Blueprint bölümlerini tek tek yeniden üretme ve proje kaydına yazma
- Pixie workspace: agent kartları ve durum görünümü
- Supabase veya local JSON fallback ile proje/blueprint saklama
- Supabase Auth anonymous owner mode + `owner_id` bazlı RLS temeli
- Uzun AI üretimi için `generation_jobs` durum modeli ve UI polling
- Vercel Queues ile kalıcı üretim kuyruğu, lease tabanlı tekrar deneme ve
  idempotent job tamamlama
- Supabase üzerinde owner bazlı atomik API rate limit

### Roadmap

- Bootcamp Mode: sprint notlarını review/retro/README formatına dönüştürme
- OpenAI Agents SDK handoff, tracing ve guardrail katmanı
- pgvector ile project memory ve decision memory
- Email/OAuth account linking
- SSE streaming ve gerçek per-pixie event görünürlüğü
- Vercel canlı deploy, quota, Turnstile/CAPTCHA ve abuse prevention

## Hedef Kitle

- Bootcamp ve hackathon katılımcıları
- Solo founder / indie hacker'lar
- Junior developer ve freelancer'lar
- Fikri olan ama MVP scope, backlog ve teknik plan çıkaramayan küçük ekipler

## Product Backlog URL

- [GitHub Issues Board](https://github.com/avanalperen/BuildPixies/issues)
- Detaylı ürün planı: [`project/docs/plan.md`](project/docs/plan.md)
- Sprint kararları: [`project/docs/decision-log.md`](project/docs/decision-log.md)

---

# Product Backlog

| ID | User Story | Öncelik | Durum |
| --- | --- | --- | --- |
| BP-001 | Kullanıcı olarak ürünün ne yaptığını landing page'de anlamak istiyorum | P0 | Done |
| BP-002 | Kullanıcı olarak örnek blueprint görmek istiyorum | P1 | Done |
| BP-003 | Kullanıcı olarak hızlıca yeni fikir girmek istiyorum | P0 | Done |
| BP-004 | Kullanıcı olarak yeni proje oluşturmak istiyorum | P0 | Done |
| BP-005 | Kullanıcı olarak hedef kitle ve platform seçmek istiyorum | P0 | Done |
| BP-006 | Kullanıcı olarak bootcamp/startup/portfolio amacı seçmek istiyorum | P1 | Done |
| BP-007 | Kullanıcı olarak pixie takımımı görmek istiyorum | P0 | Done |
| BP-008 | Kullanıcı olarak hangi pixie'nin çalıştığını görmek istiyorum | P0 | Partial |
| BP-009 | Kullanıcı olarak tamamlanan çıktıları açmak istiyorum | P0 | Done |
| BP-010 | Kullanıcı olarak product brief üretmek istiyorum | P0 | Done |
| BP-011 | Kullanıcı olarak MVP scope almak istiyorum | P0 | Done |
| BP-012 | Kullanıcı olarak UX flow almak istiyorum | P0 | Done |
| BP-013 | Kullanıcı olarak tech architecture almak istiyorum | P0 | Done |
| BP-014 | Kullanıcı olarak backlog almak istiyorum | P0 | Done |
| BP-015 | Kullanıcı olarak test planı almak istiyorum | P1 | Done |
| BP-016 | Kullanıcı olarak çıktıları markdown olarak kopyalamak istiyorum | P1 | Done |
| BP-017 | Kullanıcı olarak README taslağı üretmek istiyorum | P1 | Done |
| BP-018 | Kullanıcı olarak JSON export almak istiyorum | P2 | Done |
| BP-019 | Kullanıcı olarak sprint notlarımı düzenlemek istiyorum | P1 | Sprint 3 |
| BP-020 | Kullanıcı olarak review/retro taslağı almak istiyorum | P1 | Sprint 3 |
| BP-021 | Kullanıcı olarak backlog dağıtma mantığı metni üretmek istiyorum | P1 | Sprint 3 |
| BP-022 | Kullanıcı olarak projelerimin başkasına görünmemesini istiyorum | P0 | Done |
| BP-023 | Kullanıcı olarak uzun AI üretimini sayfa donmadan takip etmek istiyorum | P0 | Done |
| BP-024 | Geliştirici olarak bilinen moderate audit uyarılarını kapatmak istiyorum | P0 | Done |
| BP-025 | Geliştirici olarak durable queue/SSE streaming istiyorum | P1 | Sprint 3 |
| BP-026 | Kullanıcı olarak anonim hesabımı email/OAuth hesaba bağlamak istiyorum | P1 | Sprint 3 |
| BP-027 | Ürün sahibi olarak public abuse/quota/CAPTCHA koruması istiyorum | P1 | Sprint 3 |

---

# Sprint 1

## Sprint Notları

- **Sprint dönemi:** 19 Haziran – 5 Temmuz 2026
- **Sprint hedefi:** BuildPixies web pivot kararını netleştirmek, repo ve
  dokümantasyon temelini oluşturmak, çalışan Next.js iskeletini ve ilk MVP
  akışını ayağa kaldırmak.
- **Sprint içinde tamamlanması tahmin edilen puan:** 100 puan
- **Tamamlanan puan:** 100 puan
- **Sprint sonucu:** Sprint 1 hedefi tamamlandı. Ürün fikri, plan, README,
  backlog, web pivot kararı, Next.js iskeleti, temel ekranlar, AI blueprint
  pipeline'ı, local/Supabase storage temeli ve Sprint 1 ekran görüntüleri hazır.

## Puan Tamamlama Mantığı

Sprint 1'de toplam hedef 100 puan olarak belirlendi. Sprintin ana amacı final
ürünü bitirmek değil, Sprint 2'de hızlı geliştirme yapabilmek için sağlam bir
temel oluşturmaktı. Bu nedenle puanların çoğu ürün stratejisi, repo düzeni,
README/backlog, karar kayıtları ve çalışan web iskeletine ayrıldı.

| Kategori | Puan | Durum |
| --- | ---: | --- |
| Ürün fikri, hedef kitle ve web pivot kararı | 15 | Done |
| README ve Bootcamp şablon düzeni | 15 | Done |
| Product backlog ve sprint planı | 15 | Done |
| Next.js + Tailwind + shadcn/ui proje iskeleti | 15 | Done |
| Landing, dashboard, new project ve workspace ekranları | 20 | Done |
| AI prompt pipeline ve structured output şemaları | 10 | Done |
| Storage, auth/RLS ve generation job temeli | 10 | Done |

## Backlog Düzeni ve Story Seçimleri

Sprint 1 backlog'u, önce ürünün "temel taşı" olacak story'lere ayrıldı. İlk
öncelik ürünün ne olduğunu anlatmak, kullanıcıdan fikir almak, workspace'i
göstermek ve blueprint çıktısı üretebilecek altyapıyı oluşturmaktı.

| Story | Başlık | Öncelik | Sprint | Durum |
| --- | --- | --- | --- | --- |
| BP-001 | Landing page | P0 | 1 | Done |
| BP-003 | New project wizard | P0 | 1 | Done |
| BP-004 | Project creation API | P0 | 1 | Done |
| BP-005 | Target audience/platform seçimi | P0 | 1 | Done |
| BP-007 | Pixie team view | P0 | 1 | Done |
| BP-008 | Pixie status tracking | P0 | 1 | Partial |
| BP-009 | Output Hub sekmeleri | P0 | 1 | Done |
| BP-010 | Product Brief generation | P0 | 1 | Done |
| BP-011 | MVP Scope generation | P0 | 1 | Done |
| BP-012 | UX Flow generation | P0 | 1 | Done |
| BP-013 | Tech Architecture generation | P0 | 1 | Done |
| BP-014 | Backlog generation | P0 | 1 | Done |
| BP-015 | Test Plan generation | P1 | 1 | Done |
| BP-017 | README export | P1 | 1 | Done |
| BP-022 | Owner bazlı Supabase RLS | P0 | 1 | Done |
| BP-023 | Generation job + polling | P0 | 1 | Done |

## Daily Scrum

Sprint 1'in ilk kısmı fikir keşfi ve takım oluşumu ile geçti. Takım sprint
sonuna doğru 3 kişiye tamamlandığı için günlük iletişim Slack/WhatsApp kısa
sync'leri üzerinden yürütüldü. Scrum kayıtları metin özeti olarak aşağıdadır;
iletişim ekran görüntüleri takım içi kanallardan ayrıca eklenebilir.

| Tarih | Daily Scrum Özeti |
| --- | --- |
| 27 Haziran | Bootcamp başlangıcı yapıldı, takım iletişim kanalları kuruldu, fikir arayışı başladı. |
| 28 Haziran | İlk ürün fikirleri değerlendirildi; mobil uygulama alternatifi tartışıldı. |
| 29 Haziran | Hedef kitle ve bootcamp teslim kriterleri incelendi; ürünün uygulanabilirliği konuşuldu. |
| 30 Haziran | Pazar ve problem alanı daraltıldı; fikirden ürüne planlama ihtiyacı öne çıktı. |
| 1 Temmuz | BuildPixies fikri netleşti; mobil yerine web-first ürün kararı alındı. |
| 2 Temmuz | `project/docs/plan.md` yazıldı, bootcamp kılavuzu ve referans README'ler incelendi. |
| 3 Temmuz | Takım rolleri netleşti; PO, SM ve Developer dağılımı README'ye işlendi. |
| 4 Temmuz | Next.js + Tailwind + shadcn/ui kurulumu, temel ekranlar, API route'ları ve screenshotlar hazırlandı. |
| 5 Temmuz | API validation, blueprint persistence, Supabase owner/RLS, generation job/polling ve audit düzeltmeleri tamamlandı. |

## Sprint Board Update

Sprint board GitHub Issues üzerinden takip edilmektedir. Sprint 1 sonunda P0
story'lerin büyük bölümü tamamlandı; BP-008 gerçek per-pixie event/streaming
bağlantısı kalacağı için partial bırakıldı.

[Sprint Board / GitHub Issues](https://github.com/avanalperen/BuildPixies/issues)

| Board Kolonu | Sprint 1 Sonu Durum |
| --- | --- |
| Done | Landing, new project, project API, pixie workspace, output hub, AI blueprint sections, README export, RLS/job temeli |
| In Progress | Per-pixie gerçek event/streaming, UI regenerate kontrolleri |
| Backlog | Bootcamp Mode, JSON export, account linking, durable queue/SSE, Vercel deploy hardening |

## Ürün Durumu

Sprint 1 sonunda uygulama local ortamda çalışır durumdadır. Ekran görüntüleri
`project/public/screenshots/` altında tutulmaktadır.

<details>
  <summary><h3>Sprint 1 - Ekran Görüntüleri</h3></summary>

### Landing Page - Hero

![Landing Hero](project/public/screenshots/landing-hero.png)

### Landing Page - Full

![Landing Full](project/public/screenshots/landing.png)

### Dashboard - Empty State

![Dashboard](project/public/screenshots/dashboard.png)

### New Project Wizard

![New Project](project/public/screenshots/new-project.png)

### Pixie Workspace

![Workspace](project/public/screenshots/workspace.png)

</details>

## Teknik Doğrulama

| Alan | Kod Kanıtı | Durum |
| --- | --- | --- |
| Landing / dashboard / new project / workspace | `project/app/page.tsx`, `project/app/dashboard/page.tsx`, `project/app/projects/new/page.tsx`, `project/app/projects/[id]/page.tsx` | Done |
| Project create/list/detail | `project/app/api/projects/*`, `project/lib/projects.ts` | Done |
| Blueprint pipeline | `project/lib/ai/orchestrator.ts`, `project/lib/ai/prompts.ts`, `project/lib/ai/schemas.ts` | Done |
| Durable job + polling | `project/app/api/generation-jobs/*`, `project/app/api/queues/*`, `project/lib/generation-worker.ts`, `project/components/project/workspace.tsx` | Done |
| Supabase owner/RLS | `project/proxy.ts`, `project/components/auth/session-bootstrap.tsx`, `project/supabase/migrations/202607050001_auth_rls_generation_jobs.sql` | Done |
| Distributed rate limit | `project/lib/api/rate-limit.ts`, `project/supabase/migrations/202607160001_durable_jobs_and_rate_limits.sql` | Done |
| README export | `project/app/api/export-readme/route.ts`, `project/lib/export/markdown.ts` | Done |
| Output controls | `project/app/api/export-json/route.ts`, `project/app/api/regenerate-output/route.ts`, `project/components/outputs/output-hub.tsx` | Done |
| Audit | `project/package.json` override: `postcss@8.5.10`; `npm audit --omit=dev` sonucu 0 vulnerability | Done |

## Sprint Review

Sprint 1 review sonucunda aşağıdaki kararlar alındı:

- Mobil uygulama yerine web uygulamasına pivot yapıldı. Web, demo, deploy ve
  uzun blueprint çıktıları için daha uygun bulundu.
- Ürün adı **BuildPixies** olarak netleştirildi.
- Takım rolleri Product Owner, Scrum Master ve Developer olarak belirlendi.
- Next.js App Router + Route Handlers + Supabase + OpenAI stack'i seçildi.
- Ürün sadece fikir olarak kalmadı; landing, dashboard, new project form,
  pixie workspace, output hub, AI pipeline ve storage temeli çalışır hale geldi.
- Sprint 2 için asıl odaklar UI polish, canlı Supabase/Vercel doğrulaması,
  regenerate/copy/export kontrolleri ve Bootcamp Mode olarak belirlendi.

**Sprint Review Katılımcıları:** Muhammed Köseoğlu, Alperen Avan, Kemal Ersin
Özkan.

## Sprint Retrospective

### İyi Gidenler

- Web-first pivot kararı erken alındığı için ürün yönü netleşti.
- README, plan ve decision log beraber ilerledi; ürün hafızası dağılmadı.
- Next.js iskeleti hızlı kuruldu ve ekran görüntüleri Sprint 1 içinde alındı.
- AI çıktıları için schema validation ve fallback yaklaşımı erken eklendi.
- Public production riskleri Sprint 1 sonunda görünür hale getirildi ve
  Supabase owner/RLS ile generation job temeli şimdiden atıldı.

### İyileştirilmesi Gerekenler

- Sprint board ekran görüntüsü GitHub Issues üzerinden ayrıca export edilmeli.
- Daily Scrum ekran görüntüleri README'ye eklenebilir hale getirilmeli.
- Per-pixie gerçek event/streaming henüz UI status'larına bağlanmadı.
- Bootcamp Mode henüz ürün içinde yok; Sprint 3'e bırakıldı.
- Vercel canlı deploy ve canlı Supabase smoke henüz yapılmadı.

### Sprint 2 Aksiyonları

- Vercel deploy denemesi ve canlı ortam değişkenleri doğrulaması yapılacak.
- Output Hub'a copy markdown, JSON export ve regenerate UI kontrolleri eklenecek.
- Sprint 2 sonunda board screenshot, product screenshot ve review/retro güncellenecek.
- Demo için curated sample project hazırlanacak.

---

# Sprint 2

> Sprint 2 (6–19 Temmuz 2026) başlangıcı. Çalışan MVP'nin polish, deploy ve
> kullanıcı deneyimi sertleştirme süreci bu bölümde sprint sonunda
> belgelenecektir.

**16 Temmuz ara güncellemesi:** PR #11 ile Markdown kopyalama, JSON export ve
bölüm bazlı regenerate kontrolleri tamamlandı. Post-merge incelemede regenerate
sonuçlarının kalıcı proje kaydına yazılması, eşzamanlı istek koruması ve Sprint
Plan sekmesi eklendi.

---

# Sprint 3

> Sprint 3 (20 Temmuz – 2 Ağustos 2026) başlangıcı. AI derinliği, Bootcamp Mode,
> demo video ve final teslim çıktıları bu bölümde tamamlanacaktır.

---

# Technical Architecture

**Current stack:** Next.js 16 App Router · TypeScript · Tailwind CSS v4 ·
shadcn/ui/base-ui · Supabase Postgres · Supabase Auth anonymous owner mode +
RLS · OpenAI API role-based prompt pipeline · Vercel Queues · generation job
polling · local JSON fallback for development.

**Roadmap stack:** OpenAI Agents SDK handoff · pgvector project memory · durable
workflow steps/SSE streaming · account linking · Vercel deploy hardening.

## Klasör Yapısı

```text
project/
  app/
    page.tsx
    dashboard/page.tsx
    projects/new/page.tsx
    projects/[id]/page.tsx
    api/
      projects/
      generation-jobs/
      queues/
      generate-blueprint/
      regenerate-output/
      export-json/
      export-readme/
  components/
    auth/
    landing/
    pixies/
    project/
    outputs/
    ui/
  lib/
    ai/
    api/
    export/
    supabase/
    generation-jobs.ts
    generation-runner.ts
    projects.ts
    storage.ts
  supabase/migrations/
  types/
  docs/
```

# AI Agent Architecture

BuildPixies, fikri uzman pixie rollerine bölerek işler:

- **Pip** — Orchestrator, fikri analiz eder ve işleri sıraya koyar.
- **Pria** — Product brief ve MVP scope üretir.
- **Moxie** — Pazar açısı ve farklılaşma üretir.
- **Luma** — UX flow ve ekran haritası çıkarır.
- **Tinker** — Tech plan, veri modeli ve API önerisi üretir.
- **Bitsy** — Code skeleton ve başlangıç görevleri üretir.
- **Bugsy** — Test planı, riskler ve demo checklist üretir.
- **Sprinta** — Backlog ve sprint planı üretir.
- **Quill** — README ve dokümantasyon çıktısını üretir.

**Pipeline:** Raw idea → durable queue → dependency-aware pixie batches →
validated Blueprint → atomic project/job completion.

Sprint 1 sonunda çalışan mimari role-based prompt pipeline'dır. OpenAI anahtarı
yoksa uygulama sample blueprint ile çalışır; bu fallback demo güvenliği içindir
ve gerçek AI çıktısı gibi sunulmamalıdır. Sprint 3 hedefi OpenAI Agents SDK
handoff, project memory ve guardrail katmanını güçlendirmektir.

# Local Setup

Bu repo Node `24.15.0` hedefler. Shell'de `node`/`npm` görünmüyorsa `project/`
klasörüne girerek `nvm use` çalıştırın.

```bash
nvm use
npm install
npm run dev
```

Supabase ile kalıcı storage kullanacaksanız migration'ları uygulayın:

```bash
supabase db push
```

Gerekli ortam değişkenleri:

```bash
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
# Legacy projelerde NEXT_PUBLIC_SUPABASE_ANON_KEY de desteklenir.
```

Hosted deploy'larda `BUILDPIXIES_REQUIRE_SUPABASE=1` kullanın. Local geliştirmede
Supabase yoksa `project/.local/buildpixies-projects.json` ve
`project/.local/buildpixies-generation-jobs.json` fallback'i devreye girer. Şifresiz
demo akışı için Supabase Auth > Anonymous Sign-Ins açık olmalıdır. Service role
anahtarı yalnızca server environment'ta tutulmalı; `NEXT_PUBLIC_` önekiyle
tanımlanmamalıdır. Vercel Queue consumer'ı `project/vercel.json` üzerinden
deploy sırasında bağlanır.

# Screenshots

Sprint 1 ekran görüntüleri `Sprint 1 / Ürün Durumu` bölümünde listelenmiştir.
Sprint 2 ve Sprint 3 sonunda bu bölüm final demo akışıyla güncellenecektir.

# Demo Video

> 3 dakikalık YouTube videosu son sprintte eklenecek.
