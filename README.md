# BuildPixies

> Your tiny AI product team that turns ideas into launch-ready MVP plans.

BuildPixies is a web-first AI product-building workspace. You drop a messy idea,
a team of specialized "pixie" AI agents (Product, UX, Tech, QA, Scrum, Docs)
analyzes it together and returns a structured MVP blueprint: product brief, MVP
scope, backlog, UX flow, tech architecture, test plan, sprint plan and a
README export.

**Tagline:** "Turn messy ideas into build-ready MVPs."

---

# Takım İsmi

BuildPixies

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
      <a href="https://github.com/Vartmor" target="_blank"><img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg" alt="GitHub" width="20" height="20"/></a>
      <a href="#" target="_blank"><img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png" alt="LinkedIn" width="20" height="20"/></a>
    </td>
  </tr>
  <tr>
    <td><a href="https://github.com/avanalperen">Alperen Avan</a></td>
    <td>Scrum Master</td>
    <td>
      <a href="https://github.com/avanalperen" target="_blank"><img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg" alt="GitHub" width="20" height="20"/></a>
      <a href="#" target="_blank"><img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png" alt="LinkedIn" width="20" height="20"/></a>
    </td>
  </tr>
  <tr>
    <td><a href="#" target="_blank">Kemal Ersin Özkan</a></td>
    <td>Developer</td>
    <td>
      <a href="#" target="_blank"><img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg" alt="GitHub" width="20" height="20"/></a>
      <a href="#" target="_blank"><img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png" alt="LinkedIn" width="20" height="20"/></a>
    </td>
  </tr>
</table>

## Ürün İsmi

BuildPixies

## Ürün Açıklaması

BuildPixies, fikri olan ama ürüne nereden başlayacağını bilmeyen kişilere; uzman
AI agent'lardan oluşan tatlı bir mini takım (pixie'ler) aracılığıyla ürün
planı, backlog, mimari, tasarım akışı ve kod başlangıcı üreten web tabanlı bir
AI product planning workspace'idir. Kullanıcı dağınık fikrini yazar, pixie
takımı bunu yapılandırılmış MVP blueprint'ine dönüştürür ve README olarak
export eder.

## Ürün Özellikleri

- Fikirden yapılandırılmış product brief üretimi (problem, hedef kitle, değer)
- MVP scope (must-have / nice-to-have / out-of-scope ayrımı)
- User story + priority içeren backlog üretimi
- Kullanıcı akışı ve ekran haritası (UX flow)
- Stack, veri modeli, API planı içeren tech architecture
- Test senaryoları ve demo öncesi kontrol listesi
- 3 sprintlik sprint planı
- README.md export (markdown download)
- Pixie karakterli workspace (her agent'ın durumu görünür)
- Bootcamp Mode (sprint notlarını Scrum formatına dönüştürme — roadmap)

## Hedef Kitle

- Bootcamp / hackathon katılımcıları
- Solo founder / indie hacker'lar
- Junior developer / freelancer'lar
- Fikri olan ama MVP scope çıkaramayan herkes

## Product Backlog URL

Backlog bu README'nin "Product Backlog" bölümünde ve `docs/plan.md` bölüm 20'de
tutulmaktadır. Sprint board olarak GitHub Projects kullanılması planlanmıştır.

---

# Product Backlog

| ID | User Story | Öncelik |
| --- | --- | --- |
| BP-001 | Kullanıcı olarak ürünün ne yaptığını landing page'de anlamak istiyorum | P0 |
| BP-002 | Kullanıcı olarak örnek blueprint görmek istiyorum | P1 |
| BP-003 | Kullanıcı olarak hızlıca yeni fikir girmek istiyorum | P0 |
| BP-004 | Kullanıcı olarak yeni proje oluşturmak istiyorum | P0 |
| BP-005 | Kullanıcı olarak hedef kitle ve platform seçmek istiyorum | P0 |
| BP-007 | Kullanıcı olarak pixie takımımı görmek istiyorum | P0 |
| BP-008 | Kullanıcı olarak hangi pixie'nin çalıştığını görmek istiyorum | P0 |
| BP-010 | Kullanıcı olarak product brief üretmek istiyorum | P0 |
| BP-011 | Kullanıcı olarak MVP scope almak istiyorum | P0 |
| BP-012 | Kullanıcı olarak UX flow almak istiyorum | P0 |
| BP-013 | Kullanıcı olarak tech architecture almak istiyorum | P0 |
| BP-014 | Kullanıcı olarak backlog almak istiyorum | P0 |
| BP-015 | Kullanıcı olarak test planı almak istiyorum | P1 |
| BP-016 | Kullanıcı olarak çıktıları markdown olarak kopyalamak istiyorum | P1 |
| BP-017 | Kullanıcı olarak README taslağı üretmek istiyorum | P1 |
| BP-019 | Kullanıcı olarak sprint notlarımı düzenlemek istiyorum | P1 |

---

# Sprint 1

**Sprint dönemi:** 19 Haziran – 5 Temmuz 2026
**Sprint hedefi:** BuildPixies web pivot kararını belgelemek; repo, plan, README,
backlog ve proje iskeletini (Next.js + mimari) oturtmak.

- **Backlog düzeni ve Story seçimleri**: Sprint 1, ürünün temellerine ayrıldı.
  P0 story'lerden proje iskeleti, README ve backlog önceliklendirildi. Sprint
  başında tek geliştiriciydi; sprint sonuna doğru takım (3 kişi) oluştu. Puan
  hedefi gerçekçi tutuldu:
  fikir/repo/README/backlog/plan + Next.js kurulumu ve landing iskeleti.
  Seçilen P0 story'ler: BP-001, BP-003, BP-004, BP-007, BP-010–BP-014
  (iskelet seviyesinde).

- **Daily Scrum**: Sprint başında solo yürüdü; takım oluşunca Slack/WhatsApp
  üzerinden günlük short sync'lere geçildi. Günlük özet:
  - **27 Haz**: Bootcamp başlangıcı. Takım oluşturuldu (Slack). Fikir
    aranıyor.
  - **28–30 Haz**: Fikir bulma ve pazar araştırması. Mobil uygulama
    fikri tartışıldı.
  - **1 Tem**: BuildPixies fikri netleşti. Web-first karar alındı
    (`docs/decision-log.md`).
  - **2 Tem**: Proje planı yazıldı (`docs/plan.md`). Bootcamp
    kılavuzu okundu, değerlendirme kriterleri hizalandı.
  - **3 Tem**: Takım 3 kişiye tamamlandı (PO, SM, Dev). Repo
    açıldı, README ve backlog yazıldı.
  - **4 Tem**: Next.js + Tailwind + shadcn/ui kurulumu, tüm iskelet
    sayfaları ve API route'ları yazıldı. Ekran görüntüleri alındı.

- **Sprint board update**: Sprint board GitHub Issues üzerinden
  yönetilmektedir. Tüm P0 story'ler açıldı ve "done" olarak
  işaretlendi.
  [GitHub Issues Board](https://github.com/avanalperen/yza-t04-devinabox/issues)

  | Story | Title | Priority | Sprint | Status |
  | --- | --- | --- | --- | --- |
  | [BP-001](https://github.com/avanalperen/yza-t04-devinabox/issues/1) | Landing page | P0 | 1 | Done |
  | [BP-003](https://github.com/avanalperen/yza-t04-devinabox/issues/2) | New project wizard | P0 | 1 | Done |
  | [BP-004](https://github.com/avanalperen/yza-t04-devinabox/issues/3) | Project creation API | P0 | 1 | Done |
  | [BP-007](https://github.com/avanalperen/yza-t04-devinabox/issues/4) | Pixie team view | P0 | 1 | Done |
  | [BP-008](https://github.com/avanalperen/yza-t04-devinabox/issues/5) | Pixie status tracking | P0 | 1 | Done |
  | [BP-010](https://github.com/avanalperen/yza-t04-devinabox/issues/6) | Product Brief generation | P0 | 1 | Done |
  | [BP-011](https://github.com/avanalperen/yza-t04-devinabox/issues/7) | MVP Scope generation | P0 | 1 | Done |
  | [BP-012](https://github.com/avanalperen/yza-t04-devinabox/issues/8) | UX Flow generation | P0 | 1 | Done |
  | [BP-013](https://github.com/avanalperen/yza-t04-devinabox/issues/9) | Tech Architecture generation | P0 | 1 | Done |
  | [BP-014](https://github.com/avanalperen/yza-t04-devinabox/issues/10) | Backlog generation | P0 | 1 | Done |

- **Ürün Durumu**: Ekran görüntüleri (4 Temmuz 2026):

  **Landing Page (Hero)**
  ![Landing Hero](public/screenshots/landing-hero.png)

  **Landing Page (Full)**
  ![Landing Full](public/screenshots/landing.png)

  **Dashboard (Empty State)**
  ![Dashboard](public/screenshots/dashboard.png)

  **New Project Wizard**
  ![New Project](public/screenshots/new-project.png)

  **Pixie Workspace**
  ![Workspace](public/screenshots/workspace.png)

  Mevcut durum: Next.js 16 + TypeScript + Tailwind v4 + shadcn/ui kurulu;
  landing page, dashboard, new project form, pixie workspace ve output hub
  iskeletleri çalışır durumda; AI orchestrator (role-based pipeline) ve API
  route'ları hazır.

- **Sprint Review**: Alınan kararlar: (1) Mobil uygulama yerine web uygulamasına
  pivot yapıldı — demo, deploy ve output deneyimi açısından web daha uygun
  (`docs/decision-log.md`). (2) Ürün adı BuildPixies olarak belirlendi. (3)
  Takım 3 kişiye tamamlandı (Product Owner, Scrum Master, Developer). (4)
  Next.js App Router + Route Handlers + Supabase + OpenAI stack'i seçildi.
  Çıkan ürünün çalışmasında sorun yok; geliştirme ortamı ayağa kalktı.
  Katılımcılar: Muhammed Köseoğlu, Alperen Avan, Kemal Ersin Özkan.

- **Sprint Retrospective:**
  - Takım sprint sonuna doğru oluştu; Sprint 2'de tam kapasite üç kişi
    devam edilecek.
  - Sprint 2'de kodlamaya hızlı başlamak için Sprint 1'de iskelet
    tamamlandı — iyi karar.
  - Sprint 2'de gerçek AI generation akışını ve pixie animasyonlarını
    güçlendirmek gerekiyor.

---

# Sprint 2

> Sprint 2 (6–19 Temmuz 2026) başlangıcı. İçerik sprint süresince doldurulacak.

---

# Sprint 3

> Sprint 3 (20 Temmuz – 2 Ağustos 2026) başlangıcı. İçerik sprint süresince
> doldurulacak.

---

# Technical Architecture

**Stack:** Next.js 16 (App Router, Turbopack) · TypeScript · Tailwind CSS v4 ·
shadcn/ui · Framer Motion · Supabase (Postgres + pgvector) · OpenAI API /
Agents SDK · Vercel (deploy).

**Klasör yapısı (Clean Architecture):**

```
buildpixies/
  app/
    page.tsx                      # Landing
    dashboard/page.tsx           # Projeleri listele
    projects/new/page.tsx        # Yeni fikir wizard
    projects/[id]/page.tsx       # Pixie workspace
    api/
      projects/route.ts          # GET list / POST create
      projects/[id]/route.ts     # GET detail
      generate-blueprint/route.ts
      regenerate-output/route.ts
      export-readme/route.ts
  components/
    landing/   navbar, hero, how-it-works, pixie-section, output-preview, footer
    pixies/    pixie-card, pixie-team
    project/   project-card, new-project-form, workspace
    outputs/   output-hub
    ui/        shadcn primitives
  lib/
    ai/        orchestrator, client, prompts, schemas, sample, pixies/
    supabase/  client, server
    export/    markdown
    projects.ts
  types/       project, output, pixie
  docs/        plan, decision-log, sprint-1/2/3, bootcamp kılavuzu
```

# AI Agent Architecture

BuildPixies, fikri uzman agent'lara bölüyor. Her pixie bir rol üstlenir:

- **Pip** (Orchestrator) — fikri analiz eder, işleri dağıtır
- **Pria** (Product) — product brief
- **Moxie** (Market) — pazar açısı
- **Luma** (UX) — kullanıcı akışı, ekran haritası
- **Tinker** (Tech) — stack, veri modeli, API planı
- **Bitsy** (Code) — kod iskeleti
- **Quill** (Docs) — README, pitch
- **Bugsy** (QA) — test senaryoları, riskler
- **Sprinta** (Scrum) — backlog, sprint planı

**Pipeline:** Raw idea → Pip → Pria → Moxie → Luma → Tinker → Bugsy →
Sprinta → Quill → Blueprint.

Sprint 2'de role-based prompt pipeline; Sprint 3'te OpenAI Agents SDK ile gerçek
handoff + project memory (pgvector) + structured outputs (Zod) + guardrails
hedeflenmektedir. OpenAI anahtarı yoksa uygulama sample blueprint ile çalışır
(demo güvenliği).

# Screenshots

> Sprint sonlarında eklenecek.

# Demo Video

> 3 dakikalık YouTube videosu son sprintte eklenecek (2 Ağustos 23:59'a kadar).
