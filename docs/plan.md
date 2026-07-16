# BuildPixies — Proje Planı

> **Ürün adı:** BuildPixies
> **Konsept:** Web-first AI product-building workspace — fikrini anlat, pixie takımın MVP blueprint'ine dönüştürsün.
> **Tagline:** "Your tiny AI product team that turns ideas into launch-ready MVP plans."
>
> Bu doküman, YZTA Bootcamp 2026 sürecinde geliştirilecek BuildPixies web uygulamasının ürün, mimari ve sprint bazlı planını içerir. Bootcamp kılavuzu (`docs/bootcamp.md`) ve bilgilendirme toplantısı (`docs/bootcamp bilgilendirme toplantısı.md`) ile hizalıdır. Takım 3 kişidir (Product Owner, Scrum Master, Developer); görev dağılımı bölümüne göre yürütülür.

---

## İçindekiler

1. [Durum ve Bağlam](#1-durum-ve-bağlam)
2. [Strateji: Web-first AI Workspace](#2-strateji-web-first-ai-workspace)
3. [Ürün Vizyonu](#3-ürün-vizyonu)
4. [Ürün Kategorisi](#4-ürün-kategorisi)
5. [Hedef Kullanıcılar](#5-hedef-kullanıcılar)
6. [Core Promise](#6-core-promise)
7. [Pixie Karakterleri](#7-pixie-karakterleri)
8. [Web Uygulaması Ana Ekranları](#8-web-uygulaması-ana-ekranları)
9. [MVP Kapsamı](#9-mvp-kapsamı)
10. [Teknoloji Stack'i](#10-teknoloji-stacki)
11. [Sistem Mimarisi](#11-sistem-mimarisi)
12. [Veri Modeli](#12-veri-modeli)
13. [Çıktı Formatları (Structured Outputs)](#13-çıktı-formatları-structured-outputs)
14. [API Tasarımı](#14-api-tasarımı)
15. [UI Tasarım Sistemi](#15-ui-tasarım-sistemi)
16. [Sayfa Sayfa Detaylı Plan](#16-sayfa-sayfa-detaylı-plan)
17. [Bootcamp Mode](#17-bootcamp-mode)
18. [Agent Prompt Stratejisi](#18-agent-prompt-stratejisi)
19. [Clean Architecture Planı](#19-clean-architecture-planı)
20. [Product Backlog](#20-product-backlog)
21. [Sprint Planı (Takvime Bağlı)](#21-sprint-planı-takvime-bağlı)
22. [Görev Dağılımı ve Minimum Plan](#22-görev-dağılımı-ve-minimum-plan)
23. [Proje Yönetimi ve README Yapısı](#23-proje-yönetimi-ve-readme-yapısı)
24. [Pazar ve Rekabet Anlatısı](#24-pazar-ve-rekabet-anlatısı)
25. [Jüri Kriterlerine Göre Strateji](#25-jüri-kriterlerine-göre-strateji)
26. [Riskler ve Önlemler](#26-riskler-ve-önlemler)
27. [Demo İçin Örnek Kullanıcı Fikri](#27-demo-için-örnek-kullanıcı-fikri)
28. [3 Dakikalık Video Planı](#28-3-dakikalık-video-planı)
29. [Güçlü Ürün Metinleri](#29-güçlü-ürün-metinleri)
30. [İlk 48 Saatlik Aksiyon Planı](#30-ilk-48-saatlik-aksiyon-planı)
31. [Nihai Revize Karar](#31-nihai-revize-karar)
32. [Değerlendirme Kriterleriyle Hizalama](#32-değerlendirme-kriterleriyle-hizalama)
33. [Referans Repolardan Alınan Dersler](#33-referans-repolardan-alınan-dersler)
34. [Faydalı Linkler](#34-faydalı-linkler)

---

## 1. Durum ve Bağlam

| Alan | Durum |
| --- | --- |
| **Bugün** | 5 Temmuz 2026 Pazar |
| **Bootcamp süreci** | Sprint 1'in son günü; Sprint 2 hazırlıkları ve bazı Sprint 2 kod işleri erkenden tamamlandı |
| **Takım durumu** | 3 kişi: Muhammed Köseoğlu (PO), Alperen Avan (SM), Kemal Ersin Özkan (Dev) |
| **Asistan bildirimi** | Takım oluştu; asistan ile iletişim kuruldu |
| **Ürün teslimi** | 2 Ağustos 2026 23:59 |
| **Top 10 sunum** | 14 Ağustos 2026 (tarih değişebilir) — YZ'den top 7, No-Code'tan top 3 |
| **Repo** | GitHub'a pushlandı; `main` branch'i `origin/main` ile senkron |
| **Pivot kararı** | Mobil uygulama → **Web uygulaması** kararı kabul edildi ve Next.js app olarak uygulandı |

### Bootcamp Gereksinimleri (her sprint sonunda README'de zorunlu)

Her sprint sonunda aşağıdaki 6 madde GitHub README'ye eklenmek zorundadır. Asistanlar bunları kontrol eder ve puanlar. Yapılmazsa top 10'a girilemez.

1. **Backlog dağıtma mantığı** — Hangi story'ler seçildi, puan dağılımı nasıl
2. **Daily Scrum notları** — Günlük scrum kayıtları (Slack/WhatsApp screenshot veya metin)
3. **Sprint board updates** — Miro/ClickUp/Jira/Asana/GitHub Projects board screenshot'ları
4. **Ürün durumu** — Ekran görüntüleri, çalışır durum kanıtı
5. **Sprint Review** — Alınan kararlar, tamamlanan/ertelenen işler, katılımcılar
6. **Sprint Retrospective** — Neler iyi gitti, neler iyileştirilmeli, aksiyon maddeleri

### Kod Doğrulama Özeti (5 Temmuz 2026)

Bu bölüm, planın artık sadece niyet dokümanı değil, repo gerçekliğiyle hizalı
yaşayan ürün planı olması için eklendi.

| Alan | Koddan doğrulanan durum |
| --- | --- |
| Landing / dashboard / new project / workspace | **Yapıldı** — `app/page.tsx`, `app/dashboard/page.tsx`, `app/projects/new/page.tsx`, `app/projects/[id]/page.tsx` |
| Project create/list/detail | **Yapıldı** — `app/api/projects/route.ts`, `app/api/projects/[id]/route.ts`, `lib/projects.ts` |
| Blueprint generation | **Yapıldı** — `lib/ai/orchestrator.ts`, `lib/ai/prompts.ts`, `lib/ai/schemas.ts` |
| Job + polling modeli | **Yapıldı** — `app/api/generation-jobs/*`, `lib/generation-jobs.ts`, `components/project/workspace.tsx` |
| Supabase Auth/RLS temeli | **Yapıldı** — `proxy.ts`, `components/auth/session-bootstrap.tsx`, `supabase/migrations/202607050001_auth_rls_generation_jobs.sql` |
| Output Hub + README export | **Yapıldı** — `components/outputs/output-hub.tsx`, `app/api/export-readme/route.ts`, `lib/export/markdown.ts` |
| Regenerate section | **Yapıldı** — UI kontrolü, server-side validation ve proje kaydına persistence var |
| Bootcamp Mode | **Sonraki sprint** — planlandı, henüz route/UI yok |
| JSON export / feedback kayıtları | **Kısmen yapıldı** — JSON export hazır; feedback kaydı sonraki sprintte |

---

## 2. Strateji: Web-first AI Workspace

### Eski fikir
> Mobil uygulama içinde tatlı AI yazılım geliştirme takımı.

### Yeni fikir
> Web üzerinde çalışan, fikirden MVP'ye giden süreci pixie karakterli AI agent'larla yöneten interaktif ürün geliştirme workspace'i.

### Web'in Avantajları (mobil'e göre)

| Alan | Mobilde zordu | Web'de avantaj |
| --- | --- | --- |
| Demo | Telefon ekranı kısıtlı | Büyük ekran, net anlatım |
| Output görüntüleme | Uzun metinler yorucu | Doküman paneli rahat |
| Backlog board | Dar alan | Kanban board kolay |
| Kod iskeleti | Mobilde kötü deneyim | Code block / file tree güzel görünür |
| Export | Sınırlı | Markdown, JSON, kopyala, indir |
| Deploy | App store gerekebilir | Vercel linki yeterli |
| Bootcamp teslim | APK/TestFlight karmaşık | Canlı link + video kolay |

BuildPixies artık bir **AI-powered web workspace** olacak. Tatlı karakter estetiği korunacak ama ürün daha "satılabilir SaaS" gibi görünecek.

---

## 3. Ürün Vizyonu

### Ürün Cümlesi
> **BuildPixies helps solo builders, bootcamp teams and early founders turn rough app ideas into structured MVP plans using a cute team of specialized AI agents.**

### Türkçe Karşılığı
> BuildPixies, fikri olan ama ürüne nereden başlayacağını bilmeyen kişilere; uzman AI agent'lardan oluşan tatlı bir mini takım aracılığıyla ürün planı, backlog, mimari, tasarım akışı ve kod başlangıcı üretir.

### Kısa Pitch
> "Most people don't fail because they lack ideas. They fail because they don't know how to turn an idea into a buildable product. BuildPixies gives every solo builder a tiny AI product team."

---

## 4. Ürün Kategorisi

BuildPixies'i sadece "AI coding tool" diye anlatmayalım. Çünkü o zaman GitHub Copilot, Cursor, Replit Agent gibi devlerle aynı kulvara girer.

### Doğru Kategori
> **AI Product Planning & MVP Builder Workspace**

### Alt Kategori
> **Idea-to-MVP assistant for solo builders and small teams**

Bu daha savunulabilir. Çünkü BuildPixies'in ana değeri "kod yazdırmak" değil; fikri **ürüne dönüştürme sürecini yönetmek**.

---

## 5. Hedef Kullanıcılar

### Birincil: Bootcamp / Hackathon / Junior Builder
Bu kullanıcıda problem çok net:
- Fikri var ama kapsamı büyütüyor
- README yazmayı bilmiyor
- Backlog çıkaramıyor
- Sprint planı yapamıyor
- Teknik mimariyi yapılandıramıyor
- "Ne yapacağım?" hissinde kayboluyor

BuildPixies bu kullanıcıya doğrudan değer verir.

### İkincil: Solo Founder / Indie Hacker
Teknik olabilir veya olmayabilir. Şunu ister:
- Fikrini hızlıca MVP'ye çevirmek
- Hangi özellikleri yapacağını seçmek
- Landing page / demo / roadmap / pitch hazırlamak
- Teknik kişiye anlatılabilir brief çıkarmak

### Üçüncül: Freelancer / Junior Developer
Müşteri fikrini alıp şunlara çevirmek ister:
- Scope document
- User stories
- Feature list
- Tech stack
- Development plan
- Test checklist

---

## 6. Core Promise

> **"Give us a messy idea. Get a structured MVP blueprint."**

Kullanıcıdan mükemmel prompt beklemiyoruz. Kullanıcı dağınık yazabilir:

> "Ben restoranlar için stok, sipariş ve personel takibi yapan bir şey yapmak istiyorum ama basit olsun."

BuildPixies bunu alıp şuna çevirir:
- Problem statement
- Target persona
- MVP scope
- User stories
- Feature priority
- UX flow
- Data model
- Tech stack
- Sprint plan
- Risks
- Demo script

---

## 7. Pixie Karakterleri

BuildPixies isminin en büyük avantajı: agent'ları karakterleştirebiliriz.

### Pixie Ekibi

| Pixie | Rol | Kişilik | Ürettiği çıktı |
| --- | --- | --- | --- |
| **Pip** | Orchestrator Pixie | Takım kaptanı | Fikri analiz eder, işleri dağıtır |
| **Pria** | Product Pixie | Stratejik | Problem, hedef kitle, değer önerisi |
| **Moxie** | Market Pixie | Gerçekçi | Rakipler, pazar açısı, farklılaşma |
| **Luma** | UX Pixie | Yaratıcı | Kullanıcı akışı, ekran haritası |
| **Tinker** | Tech Pixie | Mimar | Stack, veri modeli, API planı |
| **Bitsy** | Code Pixie | Pratik | Dosya ağacı, kod iskeleti |
| **Quill** | Docs Pixie | Düzenli | README, pitch, proje dokümanı |
| **Bugsy** | QA Pixie | Şüpheci | Test senaryoları, riskler |
| **Sprinta** | Scrum Pixie | Planlayıcı | Backlog, sprint planı, retro notları |

### MVP Agent Konsolidasyonu

MVP'de hepsini gerçek ayrı agent gibi yapmak zorunda değiliz. Ama ürün deneyiminde hepsi görünür olabilir. Arkada ilk sürümde 5 ana agent yeterli:

1. **Pip** — Orchestrator
2. **Pria** — Product
3. **Luma** — UX
4. **Tinker** — Tech
5. **Sprinta/Quill** — Scrum + Docs

OpenAI Agents SDK tarafında agent'lar planlama yapabilen, araç çağırabilen, uzmanlar arasında iş birliği kurabilen ve çok adımlı işler için durum tutabilen uygulamalar olarak konumlanıyor; SDK'da handoff, session, guardrail ve tracing gibi parçalar da var. Bu yüzden BuildPixies'in "uzman agent takım" mimarisi teknik olarak jüriye anlatılabilir bir temel kazanıyor.

> **Sprint 2'de rol bazlı prompt pipeline ile başla; Sprint 3'te gerçek Agents SDK handoff'a geç.**

---

## 8. Web Uygulaması Ana Ekranları

### 8.1 Landing Page
Amaç: Ürünün değerini 10 saniyede anlatmak.

Bölümler:
1. **Hero** — "Turn messy ideas into build-ready MVPs."
2. **Mini demo** — "Idea → Pixies working → MVP blueprint"
3. **Pixie team cards** — Product, UX, Tech, Code, QA, Scrum
4. **Output examples** — Backlog, architecture, README, test plan
5. **CTA** — "Summon your pixies"

Bootcamp için landing page çok önemli. Ürün "tamamlanmış" hissini artırır.

### 8.2 Dashboard
Kullanıcının projeleri listelenir.

Kart yapısı:
- Project name
- One-liner
- Status: Draft / In Progress / Blueprint Ready
- Last updated
- Pixies completed: 5/7
- Open project

Boş state:
> "No ideas yet. Summon your first pixie team."

### 8.3 New Idea Wizard
Bu ekran ürünün kalbi.

Adımlar:
1. **Idea** — "What do you want to build?" (büyük textarea)
2. **Audience** — Hedef kullanıcı, teknik seviye, B2B/B2C
3. **Platform** — Web app / Mobile app / Chrome extension / AI tool / Marketplace
4. **Goal** — Bootcamp project / Startup MVP / Client project / Portfolio project
5. **Constraints** — Time, team size, budget, tech preference

Özellikle "Bootcamp project" seçeneği koymak bizi farklılaştırır.

### 8.4 Pixie Workspace
Burası en görsel ekran.

- **Sol panel:** Project summary, user idea, current goal
- **Orta panel:** Pixie cards; her pixie'nin status'u (Waiting / Thinking / Drafting / Done / Needs review)
- **Sağ panel:** Active output preview, kullanıcı feedback kutusu

Bu ekranın demo etkisi yüksek olur.

### 8.5 Blueprint Output Hub
Burada tüm çıktılar sekmeler halinde görünür:
- Product Brief
- MVP Scope
- User Stories
- UX Flow
- Tech Architecture
- Data Model
- API Plan
- Code Skeleton
- Test Plan
- Sprint Plan
- README Export
- Pitch Script

### 8.6 Backlog Board
Kanban gibi: Icebox / Todo / In Progress / Done. MVP'de gerçek drag-drop şart değil; basit kolonlu görünüm yeterli.

### 8.7 Export Center
Kullanıcı şunları alabilmeli:
- Copy Markdown
- Download `.md`
- Download `.json`
- Generate README
- Generate pitch script

Bootcamp için en önemli export: **README.md**.

---

## 9. MVP Kapsamı

### MVP'de Kesin Olacaklar

| Özellik | Açıklama | Öncelik | Kod durumu |
| --- | --- | --- | --- |
| Landing page | Ürünü anlatan ana sayfa | P0 | **Yapıldı** — `app/page.tsx`, `components/landing/*` |
| Dashboard | Projeleri listeleme | P0 | **Yapıldı** — `app/dashboard/page.tsx`, `components/project/project-card.tsx` |
| Yeni fikir oluşturma | Wizard veya tek form | P0 | **Yapıldı** — `app/projects/new/page.tsx`, `components/project/new-project-form.tsx` |
| Pixie workspace | Agent kartları ve çalışma durumu | P0 | **Yapıldı** — `components/project/workspace.tsx`, `components/pixies/*` |
| Product Brief üretimi | Problem, hedef kitle, değer önerisi | P0 | **Yapıldı** — `productBrief` schema + prompt + Output Hub |
| MVP Scope üretimi | Must-have / nice-to-have ayrımı | P0 | **Yapıldı** — `mvpScope` schema + prompt + Output Hub |
| Backlog üretimi | User story + priority | P0 | **Yapıldı** — `backlog` schema + prompt + Output Hub |
| UX Flow üretimi | Ekran listesi ve kullanıcı akışı | P0 | **Yapıldı** — `uxFlow` schema + prompt + Output Hub |
| Tech Plan üretimi | Stack, DB, API, architecture | P0 | **Yapıldı** — `techPlan` schema + prompt + Output Hub |
| Test Plan üretimi | Test senaryoları ve riskler | P1 | **Yapıldı** — `testPlan` schema + prompt + Output Hub |
| README export | Markdown çıktısı | P1 | **Yapıldı** — `lib/export/markdown.ts`, `app/api/export-readme/route.ts` |
| Project memory | Kararlar ve önceki çıktıların saklanması | P1 | **Kısmen yapıldı** — proje + blueprint persist var; pgvector/decision memory yok |
| Supabase owner/RLS | Public çok-kullanıcı güvenliği | P0 | **Yapıldı** — anonymous auth + `owner_id` RLS migration |
| Generation jobs | Uzun AI üretimini job status ile izleme | P0 | **Yapıldı** — `generation_jobs` table + polling API |
| Bootcamp Mode | Sprint planı / review / retro taslağı | P1 | **Sonraki sprint** — henüz route/UI yok |

### MVP'de Olmayacaklar

- Tam çalışan kod projesi üretme
- GitHub'a otomatik commit
- Gerçek Figma tasarımı oluşturma
- Canlı collaborative editing
- Multi-user takım daveti
- Payment sistemi
- Admin panel
- App Store / Play Store
- Mobil native app

> Bu karar bizi kurtarır. Çünkü teslim için "çalışan proje" daha önemli.

### Mobile Sadece Roadmap'te
> "Future roadmap: mobile companion app for reviewing and refining MVP blueprints on the go."

---

## 10. Teknoloji Stack'i

### En Mantıklı Stack

| Katman | Öneri | Neden |
| --- | --- | --- |
| Frontend | **Next.js + TypeScript** | Web app, landing, dashboard, API route uyumu |
| Styling | **Tailwind CSS + shadcn/ui** | Hızlı, temiz, modern UI |
| Animation | **motion** (Framer ekosistemi) | Pixie kartları ve durum animasyonları; ağır animasyon polish Sprint 3 |
| Backend | **Next.js Route Handlers** | Ayrı backend kurmadan API yazılır |
| Auth | **Supabase Auth** (anonymous owner mode, sonra email/OAuth upgrade) | Hızlı başlangıç + owner bazlı güvenlik |
| Database | **Supabase Postgres** | Proje, output, backlog kayıtları |
| Vector memory | **Supabase pgvector** | Project memory için semantic recall |
| AI | **OpenAI API / Agents SDK** | Agent orchestration |
| Deploy | **Vercel** | Next.js için en pratik deploy |
| Repo | GitHub public repo | Bootcamp zorunlu/avantajlı |

> Next.js App Router'daki Route Handlers, `app` klasörü içinde özel request handler yazmaya izin veriyor; bu sayede ayrı bir backend kurmadan `/api/generate-blueprint` gibi endpoint'ler yapılabilir. Vercel, Next.js projelerini doğrudan CLI veya Git entegrasyonu ile deploy edebiliyor; environment variable yönetimi de Vercel tarafında proje ortamlarına göre yapılabiliyor. Supabase ise AI uygulamaları için Postgres ve pgvector ile embedding saklama, indexleme ve sorgulamayı destekliyor.

### Hızlı Başlangıç Alternatifi

Daha da basitleştirmek istersen:

| Katman | Basit seçim |
| --- | --- |
| Frontend/backend | Next.js |
| DB | Supabase |
| AI | OpenAI Responses API |
| Agent görünümü | Uygulama içinde role-based pipeline |
| Deploy | Vercel |

İlk hafta (Sprint 2 başı) gerçek Agents SDK yerine role-based prompt pipeline yapılabilir. Sprint 3'te bu gerçek agent mimarisi olarak güçlendirilir.

---

## 11. Sistem Mimarisi

### Basit Mimari

```text
User
 ↓
Next.js Web App
 ↓
/api/projects
/api/generation-jobs
/api/generation-jobs/[id]
/api/generate-blueprint
/api/regenerate-output
/api/export-readme
 ↓
AI Orchestrator Service
 ↓
Pixie Agents
 ↓
Supabase Auth + Postgres RLS
 ↓
Output Hub
```

> Kod durumu: Yeni ana üretim akışı `/api/generation-jobs` üzerinden job
> oluşturur; workspace sonucu `/api/generation-jobs/[id]` ile poll eder.
> `/api/generate-blueprint` geriye uyumluluk için hâlâ durur.

### Agent Pipeline

```text
Raw Idea
  ↓
Pip / Orchestrator
  ↓
Pria / Product Pixie
  ↓
Moxie / Market Pixie
  ↓
Luma / UX Pixie
  ↓
Tinker / Tech Pixie
  ↓
Bugsy / QA Pixie
  ↓
Sprinta / Scrum Pixie
  ↓
Quill / Documentation Pixie
  ↓
Blueprint
```

### Agent Handoff Mantığı
OpenAI Agents SDK'de handoff, bir agent'ın işi başka uzman agent'a devretmesi için kullanılıyor; bu, BuildPixies'te "Product Pixie işi UX Pixie'ye devrediyor" gibi anlatılabilir. Sessions tarafında da agent'ların konuşma geçmişini farklı run'lar boyunca koruması destekleniyor; bu BuildPixies'in project memory özelliği için anlamlı.

---

## 12. Veri Modeli

### `projects`

| Alan | Tip | Açıklama |
| --- | --- | --- |
| id | uuid | Project id |
| owner_id | uuid | Supabase Auth kullanıcısı; RLS sahiplik anahtarı |
| title | text | Proje adı |
| raw_idea | text | Kullanıcının ham fikri |
| goal | text | Bootcamp / startup / portfolio |
| platform | text | Web / mobile / extension |
| target_audience | text | Hedef kullanıcı |
| constraints | jsonb | Süre, ekip, bütçe |
| output_depth | text | quick / detailed / bootcamp-ready |
| blueprint | jsonb | Üretilmiş tam blueprint çıktısı |
| status | text | draft / generating / ready / failed |
| created_at | timestamp | Oluşturma tarihi |
| updated_at | timestamp | Güncelleme tarihi |

**Kod durumu:** **Yapıldı.** İlk schema `202607040001_initial_schema.sql`, owner/RLS
ekleri `202607050001_auth_rls_generation_jobs.sql`, uygulama erişimi
`lib/projects.ts`.

### `generation_jobs`

| Alan | Tip | Açıklama |
| --- | --- | --- |
| id | uuid | Job id |
| project_id | uuid | Bağlı proje; null olabilir |
| owner_id | uuid | Supabase Auth kullanıcısı; RLS sahiplik anahtarı |
| status | text | queued / running / succeeded / failed |
| error | text | Hata varsa |
| blueprint | jsonb | Job sonucunda oluşan blueprint |
| created_at | timestamp | Tarih |
| updated_at | timestamp | Son güncelleme |
| started_at | timestamp | Çalışmaya başlama |
| completed_at | timestamp | Bitiş |

**Kod durumu:** **Yapıldı.** API: `app/api/generation-jobs/*`, storage:
`lib/generation-jobs.ts`, runner: `lib/generation-runner.ts`.

### Roadmap Veri Modelleri

Aşağıdaki tablolar ürün stratejisinde değerli, fakat mevcut kodda henüz ayrı
tablo olarak yok. Şimdilik `projects.blueprint` JSONB alanı bütün çıktı
paketini saklıyor.

#### `pixie_runs` — Sonraki sprint

| Alan | Tip | Açıklama |
| --- | --- | --- |
| id | uuid | Run id |
| project_id | uuid | Bağlı proje |
| pixie_name | text | Pip, Pria, Luma... |
| role | text | product, ux, tech... |
| status | text | waiting / running / done / failed |
| input | jsonb | Agent input |
| output | jsonb | Agent output |
| error | text | Hata varsa |
| created_at | timestamp | Tarih |

#### `outputs` — Sonraki sprint

| Alan | Tip | Açıklama |
| --- | --- | --- |
| id | uuid | Output id |
| project_id | uuid | Bağlı proje |
| type | text | product_brief, backlog, ux_flow... |
| title | text | Başlık |
| content_markdown | text | Markdown içerik |
| content_json | jsonb | Structured içerik |
| version | int | Revizyon |
| created_by | text | Hangi pixie |
| created_at | timestamp | Tarih |

#### `backlog_items` — Sonraki sprint

| Alan | Tip | Açıklama |
| --- | --- | --- |
| id | uuid | Item id |
| project_id | uuid | Bağlı proje |
| title | text | Task adı |
| user_story | text | User story |
| priority | text | P0/P1/P2 |
| sprint | int | Sprint önerisi |
| status | text | todo / doing / done |
| acceptance_criteria | jsonb | Kabul kriterleri |

#### `decisions` — Sonraki sprint

| Alan | Tip | Açıklama |
| --- | --- | --- |
| id | uuid | Decision id |
| project_id | uuid | Bağlı proje |
| decision | text | Alınan karar |
| reason | text | Neden |
| impact | text | Hangi alanı etkiler |
| created_by | text | Pixie/user |
| created_at | timestamp | Tarih |

#### `memory_chunks` — Sprint 3 / pgvector

| Alan | Tip | Açıklama |
| --- | --- | --- |
| id | uuid | Memory id |
| project_id | uuid | Bağlı proje |
| content | text | Hafıza metni |
| embedding | vector | Embedding |
| source_type | text | idea/output/decision |
| created_at | timestamp | Tarih |

---

## 13. Çıktı Formatları (Structured Outputs)

Bu ürünün profesyonel görünmesi için AI çıktıları düz paragraf değil, yapılandırılmış olmalı.

### Product Brief

```json
{
  "project_name": "string",
  "one_liner": "string",
  "problem": "string",
  "target_users": ["string"],
  "main_value": "string",
  "use_cases": ["string"],
  "success_metrics": ["string"]
}
```

### MVP Scope

```json
{
  "must_have": [
    { "feature": "string", "why": "string" }
  ],
  "nice_to_have": [
    { "feature": "string", "why_later": "string" }
  ],
  "out_of_scope": [
    { "feature": "string", "reason": "string" }
  ]
}
```

### Backlog

```json
{
  "items": [
    {
      "title": "Create project dashboard",
      "user_story": "As a user, I want to see my projects so that I can continue previous ideas.",
      "priority": "P0",
      "sprint": 1,
      "acceptance_criteria": [
        "Projects are listed as cards",
        "Each card has status and updated date"
      ]
    }
  ]
}
```

### Tech Plan

```json
{
  "recommended_stack": {
    "frontend": "Next.js",
    "backend": "Next.js Route Handlers",
    "database": "Supabase",
    "ai": "OpenAI"
  },
  "architecture": "string",
  "database_tables": ["string"],
  "api_routes": ["string"],
  "risks": ["string"]
}
```

---

## 14. API Tasarımı

Next.js içinde mevcut route'lar:

| Route | Method | Amaç | Kod durumu |
| --- | --- | --- | --- |
| `/api/projects` | GET | Projeleri listele | **Yapıldı** |
| `/api/projects` | POST | Yeni proje oluştur | **Yapıldı** |
| `/api/projects/[id]` | GET | Proje detayını getir | **Yapıldı** |
| `/api/generation-jobs` | POST | Blueprint generation job başlat | **Yapıldı** |
| `/api/generation-jobs/[id]` | GET | Job durumunu ve sonucu getir | **Yapıldı** |
| `/api/generate-blueprint` | POST | Geriye uyumlu direkt pipeline endpoint'i | **Yapıldı** |
| `/api/regenerate-output` | POST | Tek bölümü tekrar üret ve blueprint'i kaydet | **Yapıldı** |
| `/api/export-json` | POST | Blueprint'i JSON olarak dışa aktar | **Yapıldı** |
| `/api/export-readme` | POST | README markdown üret | **Yapıldı** |
| `/api/save-feedback` | POST | Kullanıcı feedback'ini kaydet | **Sonraki sprint** |

### `/api/generation-jobs` Input

```json
{
  "projectId": "uuid"
}
```

Alternatif olarak kaydedilmemiş fikir için:

```json
{
  "input": {
    "rawIdea": "I want to build an AI habit tracker for students...",
    "goal": "bootcamp",
    "platform": "web",
    "targetAudience": "students",
    "constraints": {
      "teamSize": 1,
      "timeline": "4 weeks",
      "budget": "free tools"
    },
    "outputDepth": "bootcamp-ready"
  }
}
```

### Job Başlatma Output'u

```json
{
  "job": {
    "id": "uuid",
    "projectId": "uuid",
    "status": "queued",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
}
```

### Job Polling Output'u

```json
{
  "job": {
    "id": "uuid",
    "status": "succeeded",
    "blueprint": {
      "productBrief": {},
      "mvpScope": {},
      "uxFlow": {},
      "techPlan": {},
      "backlog": {},
      "testPlan": {},
      "readme": "markdown"
    }
  }
}
```

> Kod durumu: Request validation `lib/api/schemas.ts`, response persistence
> `lib/projects.ts` ve job persistence `lib/generation-jobs.ts` içinde.

---

## 15. UI Tasarım Sistemi

BuildPixies için **"cute SaaS"** dili kullanalım.

### Genel His
- Tatlı ama oyuncak gibi değil
- Pastel ama okunabilir
- Pixie karakterleri var ama ürün hâlâ profesyonel
- "Magical workspace" hissi

### Renkler

| Amaç | Renk hissi |
| --- | --- |
| Ana renk | Lavender / violet |
| İkincil | Mint |
| Uyarı | Soft amber |
| Başarı | Soft green |
| Zemin | Off-white / very light lavender |
| Dark text | Slate / ink |

### Stil
- Büyük yuvarlatılmış kartlar
- Hafif gölgeler
- Glow efektleri
- Sparkle iconları
- Agent status badge'leri
- Smooth loading animasyonları

### Tasarım Referans Dili (sunumda anlatım)
> "We intentionally designed BuildPixies as a friendly AI workspace. The cute pixie metaphor lowers the intimidation barrier for beginners, while structured outputs keep the product useful for real development planning."

---

## 16. Sayfa Sayfa Detaylı Plan

### Landing Page

**Bölümler:**

1. **Navbar** — Logo: BuildPixies · Product · How it works · Pixies · Start building
2. **Hero** — Başlık: "Turn messy ideas into build-ready MVPs." Alt metin + CTA: "Start with an idea" + Secondary: "See sample blueprint"
3. **How it works** — Drop your idea → Pixies analyze it → Get your MVP blueprint
4. **Pixie Team** — Pria, Luma, Tinker, Bugsy, Sprinta
5. **Output Preview** — Product brief card, Backlog card, Tech plan card
6. **Footer**

### Dashboard

Kart yapısı:
```text
Project Card
- Name
- One-liner
- Status
- Last updated
- Pixies completed
- Open project
```

### New Project Wizard

Form alanları:
- Project idea
- Who is it for?
- What platform?
- What is your goal?
- How much time do you have?
- Do you have a preferred stack?
- Team size
- Output depth: Quick / Detailed / Bootcamp-ready

### Workspace

Layout:
```text
--------------------------------------------------
| Sidebar        | Main Workspace     | Output    |
| Project info   | Pixie team cards   | Preview   |
| Outputs list   | Current progress   | Feedback  |
--------------------------------------------------
```

Pixie card örneği:
```text
Luma
UX Pixie
Status: Designing flow...
Output: 5 screens mapped
```

### Output Hub

Sekmeler: Overview · Product · UX · Tech · Backlog · Tests · Docs · Export

Her sekmede:
- Markdown preview
- Copy button — **Yapıldı**
- Regenerate button — **Yapıldı** (bölüm bazlı üretim ve persistence)
- "Make shorter" / "Make more technical" / "Adapt for bootcamp" — **Sonraki sprint**

Mevcut kodda Output Hub; Plan, Product, Market, Scope, UX, Tech, Code, Backlog,
Tests, Sprints ve README sekmelerini gösterir. README sekmesinde Markdown copy,
JSON download ve README download kontrolleri vardır.

---

## 17. Bootcamp Mode

Bu özellik bizi ciddi şekilde ayrıştırır.

### Bootcamp Mode Ne Yapar?

Kullanıcı gerçek ilerleme notlarını girer:
```text
Today I created the landing page and project form.
Blocked by deployment env setup.
Next I will implement output generation.
```

BuildPixies bunu şu formatlara dönüştürür:
- Daily Scrum note
- Sprint Review
- Sprint Retrospective
- README sprint section
- Product status summary
- Backlog update explanation

> Bootcamp dokümanında sprint sonunda beklenen belgeler açıkça backlog dağıtma mantığı, daily scrum notları, sprint board updates, ürün durumu, sprint review ve retrospective olarak listeleniyor. BuildPixies'in Bootcamp Mode'u bu gereksinimi doğrudan ürün özelliğine dönüştürüyor.

### Etik Konumlandırma
> "BuildPixies does not fake sprint documentation. It helps users organize their real progress notes into a clear Scrum format."

Bu önemli. Çünkü sahte ilerleme üretmek etik olmaz.

---

## 18. Agent Prompt Stratejisi

### Pip (Orchestrator)
- Kullanıcının fikrini anlamalı
- Eksik bilgileri saptamalı
- Hangi pixie'nin hangi çıktıyı üreteceğine karar vermeli
- Output'ları birbiriyle tutarlı hale getirmeli
- Gereksiz karmaşıklığı kesmeli

### Pria (Product)
- Problem
- Hedef kullanıcı
- Değer önerisi
- Kullanım senaryoları
- MVP sınırı
- Başarı metrikleri

### Luma (UX)
- Kullanıcı yolculuğu
- Ekran listesi
- Her ekranın amacı
- Primary action
- Empty state
- Error state

### Tinker (Tech)
- Stack önerisi
- Veritabanı tabloları
- API endpoint'leri
- 3 sprintlik teknik plan
- Riskler
- Deploy yaklaşımı

### Bugsy (QA)
- Happy path testleri
- Edge-case testleri
- Hata mesajları
- Güvenlik riskleri
- Demo öncesi kontrol listesi

### Sprinta (Scrum)
- Product backlog
- Sprint backlog
- Acceptance criteria
- Daily note formatı
- Review ve retro taslağı

---

## 19. Clean Architecture Planı

Repo'da düzenli görünmek jüri için önemli.

### Önerilen Klasör Yapısı

```text
buildpixies/
  app/
    page.tsx
    dashboard/
      page.tsx
    projects/
      new/
        page.tsx
      [id]/
        page.tsx
    api/
      projects/
        route.ts
        [id]/
          route.ts
      generation-jobs/
        route.ts
        [id]/
          route.ts
      generate-blueprint/
        route.ts
      regenerate-output/
        route.ts
      export-readme/
        route.ts

  components/
    auth/
    landing/
    pixies/
    project/
    outputs/
    ui/

  lib/
    ai/
      orchestrator.ts
      prompts.ts
      schemas.ts
      pixies/
        product.ts
        ux.ts
        tech.ts
        qa.ts
        scrum.ts
    supabase/
      config.ts
      client.ts
      server.ts
    export/
      markdown.ts
    api/
      http.ts
      rate-limit.ts
      schemas.ts
    generation-jobs.ts
    generation-runner.ts
    projects.ts
    storage.ts

  types/
    generation-job.ts
    output.ts
    project.ts
    pixie.ts

  docs/
    sprint-1.md
    sprint-2.md
    sprint-3.md
```

### Mimari Prensipler
- UI component'leri ayrı
- AI prompt'ları `lib/ai` içinde
- TypeScript type'ları ayrı
- API routes sade
- Output formatları schema ile kontrol edilmeli
- README içinde mimari diyagram olmalı

---

## 20. Product Backlog

### Epic 1 — Landing & Onboarding

| ID | User Story | Öncelik | Kod durumu |
| --- | --- | --- | --- |
| BP-001 | Kullanıcı olarak ürünün ne yaptığını landing page'de anlamak istiyorum | P0 | **Yapıldı** — `app/page.tsx`, `components/landing/*` |
| BP-002 | Kullanıcı olarak örnek blueprint görmek istiyorum | P1 | **Yapıldı** — statik output preview var (`components/landing/output-preview.tsx`) |
| BP-003 | Kullanıcı olarak hızlıca yeni fikir girmek istiyorum | P0 | **Yapıldı** — `components/project/new-project-form.tsx` |

### Epic 2 — Project Creation

| ID | User Story | Öncelik | Kod durumu |
| --- | --- | --- | --- |
| BP-004 | Kullanıcı olarak yeni proje oluşturmak istiyorum | P0 | **Yapıldı** — `POST /api/projects`, `lib/projects.ts` |
| BP-005 | Kullanıcı olarak hedef kitle ve platform seçmek istiyorum | P0 | **Yapıldı** — form alanları + Zod schema |
| BP-006 | Kullanıcı olarak bootcamp/startup/portfolio amacı seçmek istiyorum | P1 | **Yapıldı** — goal select + API schema |

### Epic 3 — Pixie Workspace

| ID | User Story | Öncelik | Kod durumu |
| --- | --- | --- | --- |
| BP-007 | Kullanıcı olarak pixie takımımı görmek istiyorum | P0 | **Yapıldı** — `components/pixies/pixie-team.tsx` |
| BP-008 | Kullanıcı olarak hangi pixie'nin çalıştığını görmek istiyorum | P0 | **Kısmen yapıldı** — UI status var; gerçek per-pixie streaming/event henüz yok |
| BP-009 | Kullanıcı olarak tamamlanan çıktıları açmak istiyorum | P0 | **Yapıldı** — `components/outputs/output-hub.tsx` sekmeleri |

### Epic 4 — AI Blueprint Generation

| ID | User Story | Öncelik | Kod durumu |
| --- | --- | --- | --- |
| BP-010 | Kullanıcı olarak product brief üretmek istiyorum | P0 | **Yapıldı** — `productBrief` schema/prompt/output |
| BP-011 | Kullanıcı olarak MVP scope almak istiyorum | P0 | **Yapıldı** — `mvpScope` schema/prompt/output |
| BP-012 | Kullanıcı olarak UX flow almak istiyorum | P0 | **Yapıldı** — `uxFlow` schema/prompt/output |
| BP-013 | Kullanıcı olarak tech architecture almak istiyorum | P0 | **Yapıldı** — `techPlan` schema/prompt/output |
| BP-014 | Kullanıcı olarak backlog almak istiyorum | P0 | **Yapıldı** — `backlog` schema/prompt/output |
| BP-015 | Kullanıcı olarak test planı almak istiyorum | P1 | **Yapıldı** — `testPlan` schema/prompt/output |

### Epic 5 — Export

| ID | User Story | Öncelik | Kod durumu |
| --- | --- | --- | --- |
| BP-016 | Kullanıcı olarak çıktıları markdown olarak kopyalamak istiyorum | P1 | **Yapıldı** — Output Hub copy kontrolü |
| BP-017 | Kullanıcı olarak README taslağı üretmek istiyorum | P1 | **Yapıldı** — `lib/export/markdown.ts`, `/api/export-readme` |
| BP-018 | Kullanıcı olarak JSON export almak istiyorum | P2 | **Yapıldı** — `/api/export-json` ve download kontrolü |

### Epic 6 — Bootcamp Mode

| ID | User Story | Öncelik | Kod durumu |
| --- | --- | --- | --- |
| BP-019 | Kullanıcı olarak sprint notlarımı düzenlemek istiyorum | P1 | **Sonraki sprint** |
| BP-020 | Kullanıcı olarak review/retro taslağı almak istiyorum | P1 | **Sonraki sprint** |
| BP-021 | Kullanıcı olarak backlog dağıtma mantığı metni üretmek istiyorum | P1 | **Sonraki sprint** |

### Epic 7 — Güvenlik, Kalıcılık ve Operasyon

| ID | User Story | Öncelik | Kod durumu |
| --- | --- | --- | --- |
| BP-022 | Kullanıcı olarak projelerimin başkasına görünmemesini istiyorum | P0 | **Yapıldı** — Supabase `owner_id` + RLS |
| BP-023 | Kullanıcı olarak uzun AI üretimini sayfa donmadan takip etmek istiyorum | P0 | **Yapıldı** — `generation_jobs` + polling |
| BP-024 | Geliştirici olarak bilinen moderate audit uyarılarını kapatmak istiyorum | P0 | **Yapıldı** — `postcss@8.5.10` override |
| BP-025 | Geliştirici olarak gerçek durable queue/SSE streaming istiyorum | P1 | **Sonraki sprint** |
| BP-026 | Kullanıcı olarak anonim hesabımı email/OAuth hesaba bağlamak istiyorum | P1 | **Sonraki sprint** |
| BP-027 | Ürün sahibi olarak public abuse/quota/CAPTCHA koruması istiyorum | P1 | **Sonraki sprint** |

---

## 21. Sprint Planı (Takvime Bağlı)

Bootcamp takvimi:
- **Sprint 1:** 19 Haziran – 5 Temmuz (bitiyor!)
- **Sprint 2:** 6 Temmuz – 19 Temmuz
- **Sprint 3:** 20 Temmuz – 2 Ağustos
- **Teslim:** 2 Ağustos 23:59
- **Top 10 sunum:** 14 Ağustos

### Sprint 1 — 4–5 Temmuz (Kalan İki Gün)

**Sprint hedefi:** BuildPixies web pivot kararını belgelemek, repo ve ürün planını oturtmak.

#### Yapılacaklar
- [x] Ürün adı seçildi: **BuildPixies**
- [x] Public GitHub repo aç ve pushla (`avanalperen/BuildPixies` redirect'iyle güncel)
- [x] README template ekle (`BootcampScrumTemplate` formatında)
- [x] Ürün açıklaması yaz
- [x] Hedef kitleyi yaz
- [x] Product backlog ekle
- [x] Web pivot kararını `docs/decision-log.md` içine yaz
- [x] İlk wireframe'i çiz
- [x] Landing page taslak metnini hazırla
- [ ] Takıma ve asistana durum mesajı gönder (koddan doğrulanamaz; iletişim kanıtı gerekli)
- [x] Sprint 1 review ve retro yaz

#### Definition of Done
- Repo public
- README'de ürün fikri var
- Backlog var
- Sprint 1 notları var
- Web app mimari kararı var
- En az 1 ekran taslağı var

#### Sprint 1 Çıktıları (README'ye)

| Madde | İçerik |
| --- | --- |
| Backlog dağıtma mantığı | P0 story'ler seçildi; repo, README, fikir önceliklendirildi |
| Daily Scrum notları | Sprint başında solo; takım oluşunca Slack/WhatsApp günlük short sync |
| Sprint Board updates | GitHub Projects / Trello screenshot'ları |
| Ürün durumu | Fikir, backlog, wireframe, landing copy screenshot'ları |
| Sprint Review | Takım sprint sonuna doğru 3 kişiye tamamlandı; mobil→web pivot yapıldı; fikir/repo/backlog hazır |
| Sprint Retrospective | Takım iletişim kanalları oturtuldu; Sprint 2'de üç kişi tam kapasite kodlamaya geçilecek |

### Sprint 2 — 6–19 Temmuz (Çalışan MVP)

**Sprint hedefi:** Kullanıcı fikir girsin, BuildPixies workspace açılsın ve ilk gerçek blueprint çıktısı üretilsin.

| Gün | İş | Durum |
| --- | --- | --- |
| 6 Temmuz | Next.js projesi kur, Tailwind/shadcn ayarla | **Yapıldı** — `package.json`, `app/*`, `components/ui/*` |
| 7 Temmuz | Landing page tasarla | **Yapıldı** — `components/landing/*` |
| 8 Temmuz | Dashboard ve New Project ekranı | **Yapıldı** — `app/dashboard`, `app/projects/new` |
| 9 Temmuz | Supabase Auth/RLS canlı proje ayarı ve anon sign-in kontrolü | **Kod yapıldı** — migration + proxy; canlı Supabase ayarı deploy sırasında doğrulanacak |
| 10 Temmuz | Project create/list akışı | **Yapıldı** — `/api/projects`, `lib/projects.ts` |
| 11 Temmuz | Pixie workspace UI | **Yapıldı** — `components/project/workspace.tsx`, `components/pixies/*` |
| 12 Temmuz | AI prompt schemas | **Yapıldı** — `lib/ai/prompts.ts`, `lib/ai/schemas.ts` |
| 13 Temmuz | Product Brief generation | **Yapıldı** |
| 14 Temmuz | MVP Scope + Backlog generation | **Yapıldı** |
| 15 Temmuz | UX Flow generation | **Yapıldı** |
| 16 Temmuz | Tech Plan generation | **Yapıldı** |
| 17 Temmuz | Output Hub | **Yapıldı** — sekmeli çıktı hub + README download |
| 18 Temmuz | Hata düzeltme, screenshots | **Kısmen yapıldı** — Sprint 1 screenshots var; Sprint 2 final polish kalır |
| 19 Temmuz | Sprint 2 README, review, retro | **Zamanı gelmedi** |

#### Definition of Done
- Canlı veya local çalışan web app var
- Kullanıcı proje oluşturabiliyor
- En az 4 çıktı üretiliyor: Product brief, MVP scope, Backlog, UX flow veya Tech plan
- Pixie kartları görünüyor
- Output Hub çalışıyor
- README güncel

### Sprint 3 — 20 Temmuz – 2 Ağustos (AI Derinliği + Polish + Demo)

**Sprint hedefi:** Ürünü jüri demosuna hazır hale getirmek: agent derinliği, export, Bootcamp Mode, polish, video.

| Gün | İş | Durum |
| --- | --- | --- |
| 20 Temmuz | Agent pipeline'ı güçlendir | **Kısmen yapıldı** — role-based pipeline var; Agents SDK handoff yok |
| 21 Temmuz | Project memory / decisions tablosu | **Sonraki sprint** |
| 22 Temmuz | Regenerate section özelliği | **Erken tamamlandı** — PR #11 ve post-merge persistence düzeltmesi |
| 23 Temmuz | README export | **Yapıldı** |
| 24 Temmuz | Bootcamp Mode basic | **Sonraki sprint** |
| 25 Temmuz | Test Plan output | **Yapıldı** |
| 26 Temmuz | Landing page polish | **Kısmen yapıldı** — temel landing var, final polish kalır |
| 27 Temmuz | Workspace animasyonları | **Kısmen yapıldı** — status UI var, motion polish yok |
| 28 Temmuz | Deploy denemesi (Vercel) | **Sonraki sprint** |
| 29 Temmuz | Demo data hazırla | **Kısmen yapıldı** — sample fallback var; curated demo project kalır |
| 30 Temmuz | README final screenshots | **Kısmen yapıldı** — Sprint 1 screenshots var; final screenshots kalır |
| 31 Temmuz | Video script | **Planlandı** — bölüm 28 var; video script dosyası yok |
| 1 Ağustos | 3 dakikalık video çekimi | **Sonraki sprint** |
| 2 Ağustos | Final test + teslim | **Sonraki sprint** |

#### Definition of Done
- Uygulama deploy edilmiş veya deploy edilebilir durumda
- 3 dakikalık video hazır
- GitHub README tamam
- Sprint 1, 2, 3 belgeleri tamam
- Ürün demo akışı sorunsuz
- En az bir sample project hazır

### İleri Sprint İyileştirmeleri

| İyileştirme | Neden önemli | Önerilen sprint |
| --- | --- | --- |
| Bootcamp Mode basic | Ürünün akademi bağlamındaki özgünlüğünü artırır | Sprint 3 |
| SSE streaming / per-pixie events | Durable Vercel Queue tamamlandı; UI gerçek pipeline event'lerini henüz göstermiyor | Sprint 3 |
| Email/OAuth account linking | Anonymous auth demo için iyi; kalıcı kullanıcı hesabı için yükseltme gerekir | Sprint 3 |
| Quota, Turnstile/CAPTCHA, usage limit | Public AI endpoint maliyeti ve abuse riskini azaltır | Sprint 3 |
| Vercel + canlı Supabase smoke | Local build yetmez; final teslim canlı link ister | Sprint 3 |
| Curated demo project + video script dosyası | 3 dakikalık demo akışını risksizleştirir | Sprint 3 |
| Per-pixie run/event logging | Pixie status'ları gerçek pipeline olaylarına bağlanır | Sprint 3 / sonrası |
| pgvector memory + decisions | Proje hafızası ve tekrar üretim kalitesi güçlenir | Sprint 3 / sonrası |

---

## 22. Görev Dağılımı ve Minimum Plan

Takım 3 kişidir. Aşağıdaki scope Sprint 2'den itibaren üç kişiyle yürütülür.

### MVP Scope
1. Landing page
2. New Project form
3. Pixie workspace görünümü
4. Job endpoint + polling ile blueprint generation
5. Output Hub
6. README export
7. Supabase owner/RLS temeli
8. Bootcamp Mode basic
9. Vercel deploy

### Görev Dağılımı

| Kişi | Rol | Sorumluluk |
| --- | --- | --- |
| Muhammed Köseoğlu | Product Owner | Ürün vizyonu, backlog önceliklendirme, UI/UX, pixie avatarları, demo |
| Alperen Avan | Scrum Master | Sprint yönetimi, iletişim, Supabase ve database, dokümantasyon |
| Kemal Ersin Özkan | Developer | Frontend (Next.js), AI prompt/agent pipeline, kod kalitesi |

### Takım iletişim kanalı
> Slack + WhatsApp üzerinden günlük short sync'ler. Sprint başında planning,
> sonunda review + retro. Asistan ile haftalık ofis saatleri.

---

## 23. Proje Yönetimi ve README Yapısı

> Bootcamp dokümanında ürünün sıfırdan geliştirilmesi, GitHub'da belgelenmesi, takım rollerinin ve ürün bilgilerinin yazılması, sprint çıktılarının eklenmesi bekleniyor. README'yi ürün kadar ciddiye almalısın.

### GitHub README Ana Başlıkları

```md
# BuildPixies

## Team Name
...

## Team Members & Roles
...

## Product Name
BuildPixies

## Product Description
...

## Product Features
...

## Target Audience
...

## Product Backlog
...

## Sprint 1
### Sprint Goal
### Backlog Distribution Logic
### Daily Scrum Notes
### Sprint Board Updates
### Product Status
### Sprint Review
### Sprint Retrospective

## Sprint 2
...

## Sprint 3
...

## Technical Architecture
...

## AI Agent Architecture
...

## Screenshots
...

## Demo Video
...
```

### Sprint Board Önerisi
GitHub Projects kullanılabilir. Kolonlar: Backlog · Todo · In Progress · Review · Done. Ek olarak README'ye screenshot konulmalı.

---

## 24. Pazar ve Rekabet Anlatısı

### Problem
AI araçları çok güçlü ama yeni başlayanlar için hâlâ dağınık:
- Kullanıcı ne isteyeceğini bilmiyor
- Tek prompt ile gelen cevaplar uygulanabilir plana dönüşmüyor
- Ürün, UX, teknik mimari ve sprint planı ayrı ayrı düşünülüyor
- Junior kullanıcı "başlangıç kaosu" yaşıyor

### Çözüm
BuildPixies bu kaosu uzman agent'larla bölüyor:
- Product Pixie fikri netleştirir
- UX Pixie kullanıcı akışını çıkarır
- Tech Pixie mimariyi önerir
- Scrum Pixie backlog ve sprint planı oluşturur
- Docs Pixie README ve pitch hazırlar

### Farklılaşma
BuildPixies bir "kod yazdırma aracı" değil; bir **idea-to-MVP operating workspace**. Bu ayrım önemli.

---

## 25. Jüri Kriterlerine Göre Strateji

### Çalışan Proje
Gösterilecek demo:
1. Landing page açılır
2. Yeni fikir girilir
3. Pixie workspace çalışır
4. Blueprint çıktıları oluşur
5. Backlog ve README export gösterilir

### Özgünlük
> "BuildPixies combines AI agent orchestration with a beginner-friendly product planning workflow and a playful pixie-based interface."

### Ürün Tamamlanma
- Landing var
- Dashboard var
- Project flow var
- Outputs var
- Export var
- Sample fallback var; final curated demo project Sprint 3'te hazırlanacak

### Pazara Uygunluk
Hedef kitle çok net: Bootcamp teams, Hackathon participants, Junior builders, Solo founders.

### AI Öğeleri
- Role-based AI agents
- Orchestrator
- Structured JSON outputs
- Blueprint persistence ile temel project memory
- Regeneration by section API
- Bootcamp-specific documentation agent hedefi
- Guardrail: realistic MVP scope

> Final değerlendirmede YZ tarafında "yapay zeka öğeleri" 35 puanlık büyük bir alan; ön değerlendirme tarafında da AI agent, hafıza, orkestrasyon gibi teknik yönetimler ayrıca puanlanıyor.

---

## 26. Riskler ve Önlemler

| Risk | Etki | Önlem |
| --- | --- | --- |
| AI output çok uzun olur | UI bozulur | Section-based output |
| Agent pipeline yavaş olur | Demo kötü görünür | Durable Vercel Queue + dependency-aware paralel batches + polling + sample fallback |
| Supabase auth vakit alır | Geliştirme yavaşlar | Anonymous Supabase Auth + owner bazlı RLS; email/OAuth roadmap |
| Takım içi koordinasyon kopukluğu | Geliştirme yavaşlar | Günlük sync + net rol dağılımı |
| Deploy problemi | Teslim riski | Erken Vercel deploy |
| Prompt çıktısı tutarsız | Ürün kalitesi düşer | JSON schema + validation |
| Public AI endpoint abuse | Maliyet / kota riski | Rate limit var; Sprint 3'te quota + Turnstile/CAPTCHA |
| Paket güvenlik uyarıları | Deploy güveni düşer | `npm audit --omit=dev` takip edilir; PostCSS override eklendi |
| README eksik kalır | Puan kaybı | Her sprint sonunda güncelleme |
| Tasarım fazla çocuksu olur | Ciddiyet azalır | Cute SaaS dengesi |

---

## 27. Demo İçin Örnek Kullanıcı Fikri

Demo sırasında rastgele fikir girme. Önceden iyi sonuç veren bir fikir hazırla:

> "I want to build a web app for university students who struggle to manage group projects. It should help them create tasks, assign teammates, summarize progress, and prepare sprint reports."

Bu fikir BuildPixies'in kendi bootcamp bağlamıyla da uyumlu. Çıktılar güzel görünür:
- Target users: university students
- Features: project dashboard, task board, AI summary
- Tech stack: Next.js, Supabase, OpenAI
- Backlog: çok net
- Sprint plan: çok net

---

## 28. 3 Dakikalık Video Planı

| Süre | Bölüm | İçerik |
| --- | --- | --- |
| 0:00–0:20 | Problem | "Many people have app ideas, but they struggle to turn them into a clear MVP plan." |
| 0:20–0:40 | Solution | "BuildPixies gives every solo builder a tiny AI product team." |
| 0:40–1:30 | Product demo | Landing page → New idea → Pixies working → Output Hub |
| 1:30–2:10 | AI architecture | Pip orchestrator · Product/UX/Tech/Scrum pixies · Structured outputs · Project memory · Regeneration |
| 2:10–2:40 | Use cases and market | Bootcamp teams · Hackathon participants · Solo founders · Junior developers |
| 2:40–3:00 | Closing | "BuildPixies turns messy ideas into build-ready MVP blueprints." |

---

## 29. Güçlü Ürün Metinleri

### Hero Başlık
**Turn messy ideas into build-ready MVPs.**

### Hero Alt Metin
**BuildPixies gives you a tiny AI product team that transforms your rough idea into a product brief, UX flow, backlog, tech plan and launch-ready documentation.**

### CTA
**Summon your pixies**

Bu CTA çok iyi. Standart "Get started" yerine markaya özel.

Alternatif CTA'lar:
- Start building
- Create my MVP blueprint
- Turn idea into plan
- Meet my AI product team

### Kısa Açıklama
**BuildPixies is an AI-powered product planning workspace for solo builders, bootcamp teams and early founders.**

---

## 30. İlk 48 Saatlik Aksiyon Planı

### Bugün (4 Temmuz)
- Repo aç: `buildpixies`
- README iskeleti oluştur
- Next.js projesini başlat
- Landing page copy'sini yaz
- Product backlog'u README'ye ekle
- Web pivot kararını decision log olarak yaz
- Takıma mesaj at
- Asistana durumu bildir

### Yarın (5 Temmuz)
- Landing page ilk versiyon
- New Project form
- Pixie card component
- Mock output hub
- Sprint 1 review/retro
- İlk ekran görüntüleri

> Bu iki gün sonunda ürün "başlamış ve belgelenmiş" görünmeli.

---

## 31. Nihai Revize Karar

> **BuildPixies bir web uygulaması olacak. Kullanıcı fikrini yazacak, sevimli AI pixie agent'ları bu fikri analiz ederek ürün brief'i, MVP scope'u, UX flow'u, teknik mimariyi, backlog'u, test planını ve README export'unu üretecek. Ürün web-first SaaS gibi tasarlanacak, responsive olacak ve ileride mobil uygulamaya genişletilebilecek.**

### Bu pivot doğru çünkü:
- Bootcamp teslimine daha uygun
- Canlı link verilebilir
- Agent ve output deneyimi daha rahat gösterilir
- Üç kişilik takımla MVP çıkarmak daha mümkün
- "Cute but useful" marka dili daha güçlü görünür
- AI agent + hafıza + orkestrasyon puanlarına direkt oynar

**Mobile sadece roadmap'te şöyle geçsin:**
> "Future roadmap: mobile companion app for reviewing and refining MVP blueprints on the go."

---

## 32. Değerlendirme Kriterleriyle Hizalama

Bootcamp değerlendirmesi iki aşamalıdır: **Ön Değerlendirme** (tüm projeler) ve **Final Değerlendirme** (top 7 YZ + top 3 No-Code).

### Ön Değerlendirme Kriterleri — YZ

| Kriter | Max Puan | Bizim Stratejimiz |
| --- | --- | --- |
| Yarışmaya hazır, çalışan proje | 10 | Sprint 2 sonunda çalışan MVP; Sprint 3'te Vercel deploy + polish |
| Özgünlük | 10 | Web-first AI product workspace + pixie karakter konsepti; mevcut coding agent'lerden farklı |
| Ürün tamamlanma puanı | 10 | MVP kapsamı net; core akış (fikir → pixie → blueprint → export) tam çalışır |
| Pazara uygun, talep görebilecek uygulama | 10 | Bootcamp/hackathon öğrencileri + solo founder + junior dev net segment |

### Ekstra Puanlar — YZ

| Kriter | Max Puan | Bizim Stratejimiz |
| --- | --- | --- |
| YZ Modeli seçimi, kullanımı, geliştirmesi; AI Agent'ların kullanımı, hafıza, orkestrasyon vb. | 20 | OpenAI Agents SDK ile multi-agent orchestration, handoff, project memory (pgvector), structured outputs, guardrails |
| Kod içerisinde mimari yapı kullanımları, temiz kod prensipleri | 15 | Clean architecture (app/components/lib/types ayrımı), JSON schema validation, typed prompts, separation of concerns |
| Ürün canlıya alınmış veya canlıya alınabilecek şekilde geliştirilme | 10 | Vercel deploy; Next.js + Supabase tam stack canlıya alınabilir |

### Final Değerlendirme — YZ

| Kriter | Max Puan | Bizim Stratejimiz |
| --- | --- | --- |
| İhtiyaç ve Çözüm Eşleşmesi | 20 | Net problem (fikir → MVP planı kaosu) + pixie takımı çözümü |
| Kullanıcı Değeri ve Deneyimi | 10 | Cute SaaS UI, pixie workspace, structured outputs, export |
| Pazar Potansiyeli | 10 | Geniş hedef kitle (öğrenci, girişimci, junior dev, freelancer) |
| Fonksiyonel Yeterlilik | 15 | Core akış tam çalışır; revizyon + memory + bootcamp mode |
| Ürün bütünlüğü | 10 | Tutarlı tasarım dili, tamamlanmış akış, export, sample project |
| Yapay zeka öğeleri | 35 | Multi-agent orchestration + memory + structured outputs + guardrails |

---

## 33. Referans Repolardan Alınan Dersler

`references/` altındaki örnek repolar incelendi. Aşağıdaki dersler çıkarıldı:

### `OUA-zaten-Bootcamp-2023` (Ödüllü, Flutter + Firebase)
- **Ders:** README kalitesi ve sprint dokümantasyonu çok detaylı; her sprint için ekran görüntüleri, burndown chart, sprint notes ayrı ayrı.
- **Ders:** Teknoloji stack listesi README'de net listelenmiş.
- **Ders:** MVVM mimari + GetX routing + Hive local DB iyi bir mimari örneği.
- **Uygula:** Bizim README'mizde de teknoloji stack listesi (Next.js, Supabase, OpenAI, Vercel) ve mimari kararları net yazılacak. Mimari diyagramı README'ye konulacak.

### `planova` (Flutter + Gemini AI)
- **Ders:** AI entegrasyonu Sprint 3'te yapıldı (Gemini API). Biz Sprint 2'de role-based pipeline ile başlayıp Sprint 3'te gerçek agent mimarisine geçeceğiz.
- **Ders:** Lokalizasyon ve tema özellikleri final sprint'inde eklendi. Bizim için opsiyonel.
- **Ders:** Sprint puanlama mantığı net belgelenmiş (300/450/450 toplam 1200 puan).
- **Uygula:** Bootcamp Mode fikri (sprint notlarını düzenleme) planova'nın AI story generator'ünden ilham aldı.

### `GhostOfAnnaScrumExample` (Sprint döküman örneği)
- **Ders:** Sprint Review ve Retrospective yazımı kısa, net ve yapılandırılmış.
- **Ders:** Backlog düzeni açıklaması renk kodlu.
- **Uygula:** Sprint review/retro yazımında bu net yapıyı kullanacağız.

### `U-21-Cherry-Chasers` (Sprint puanlama örneği)
- **Ders:** Sprint puan hedefleri net (10/12/15 = 36 toplam puan).
- **Ders:** Tasarım grubu ayrımı (tasarım + developing).
- **Uygula:** Backlog puanlama stratejisini net belirleyeceğiz.

### `BootcampScrumTemplate` (Resmi şablon)
- **Ders:** README yapısı tam olarak bu formatta olmalı: Takım İsmi → Ürün İle İlgili Bilgiler → Sprint 1/2/3.
- **Ders:** Her sprint için 6 madde (backlog, daily, board, ürün durumu, review, retro) zorunlu.
- **Uygula:** README'mizi tam bu formatta hazırlayacağız (Bölüm 23'te).

---

## 34. Faydalı Linkler

- [OpenAI Agents SDK](https://developers.openai.com/api/docs/guides/agents)
- [OpenAI Agents SDK — Handoffs](https://openai.github.io/openai-agents-python/handoffs/)
- [Next.js Route Handlers](https://nextjs.org/docs/app/getting-started/route-handlers)
- [Next.js on Vercel](https://vercel.com/docs/frameworks/full-stack/nextjs)
- [Supabase AI & Vectors](https://supabase.com/docs/guides/ai)
- [Supabase pgvector](https://supabase.com/docs/guides/database/extensions/pgvector)
- [GitHub Copilot](https://github.com/features/copilot) (referans/konumlandırma için)
- [BootcampScrumTemplate](https://github.com/YapayZekaveTeknolojiAkademisi/BootcampScrumTemplate) (README formatı için — `references/` altında)
- [Bootcamp Slack kanalı: #bootcamp-2026](https://app.slack.com/) (sorular için, 48 saat içinde dönüş)
