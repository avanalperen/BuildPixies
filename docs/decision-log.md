# Decision Log — BuildPixies

## ADR-001: Mobil uygulamadan web uygulamasına pivot

**Tarih:** 4 Temmuz 2026
**Durum:** Kabul edildi

### Bağlam

BuildPixies başlangıçta mobil uygulama (tatlı AI yazılım geliştirme takımı)
olarak planlanıyordu. Bootcamp teslim süreci (2 Ağustos, 3 dakikalık video,
canlı demo, top 10 sunumu) ve takım gerçeği göz önüne alındığında
mobil yerine web-first gitmek değerlendirildi.

### Karar

Mobil yerine web uygulaması (Next.js) olarak ilerlenecek. Tatlı pixie karakter
estetiği korunacak ama ürün "satılabilir SaaS" gibi görünecek.

### Gerekçe

| Alan | Mobilde zordu | Web'de avantaj |
| --- | --- | --- |
| Demo | Telefon ekranı kısıtlı | Büyük ekran, net anlatım |
| Output görüntüleme | Uzun metinler yorucu | Doküman paneli rahat |
| Backlog board | Dar alan | Kanban board kolay |
| Kod iskeleti | Mobilde kötü deneyim | Code block / file tree güzel |
| Export | Sınırlı | Markdown, JSON, kopyala, indir |
| Deploy | App store gerekebilir | Vercel linki yeterli |
| Bootcamp teslim | APK/TestFlight karmaşık | Canlı link + video kolay |

### Sonuçlar

- Bootcamp teslimine daha uygun (canlı link + video).
- AI agent ve output deneyimi daha rahat gösterilir.
- Üç kişilik takımla MVP çıkarmak daha mümkün.
- "Cute but useful" marka dili daha güçlü görünür.
- AI agent + hafıza + orkestrasyon puanlarına direkt oynar.

### Mobile roadmap'te

> "Future roadmap: mobile companion app for reviewing and refining MVP
> blueprints on the go."

---

## ADR-002: Takım MVP scope'u

**Tarih:** 4 Temmuz 2026
**Durum:** Kabul edildi

### Bağlam

Takım 3 kişidir (Product Owner, Scrum Master, Developer). Bootcamp zorunlu
etkinlik olduğu için net rol dağılımıyla ilerleniyor.

### Karar

Plan bölüm 22'deki görev dağılımı uygulanacak:
landing, new project form, pixie workspace, tek endpoint ile blueprint
generation, output hub, README export, Bootcamp Mode (basic), Vercel deploy.
Takım gelirse görev dağılımı plana göre entegre edilecek. Durum asistana
bildirilecek.

---

## ADR-003: Sprint 2'de role-based pipeline, Sprint 3'te Agents SDK

**Tarih:** 4 Temmuz 2026
**Durum:** Kabul edildi

### Karar

Sprint 2'de hız için role-based prompt pipeline (her pixie ayrı prompt ile
ardışık çağrılıyor). Sprint 3'te gerçek OpenAI Agents SDK handoff + project
memory (pgvector) + structured outputs (Zod) + guardrails.

### Gerekçe

Çalışan MVP'yi Sprint 2 sonunda göstermek; AI derinliğini Sprint 3'te jüri
demo'suna hazırlamak. OpenAI anahtarı yoksa sample blueprint ile çalışan demo
(fallback) — demo güvenliği için kritik.

---

## ADR-004: API validation, guarded AI endpoints and persisted blueprint

**Tarih:** 4 Temmuz 2026
**Durum:** Kabul edildi

### Bağlam

İlk teknik denetimde API route'larının request body'yi TypeScript cast ile
güvendiği, AI endpoint'lerinin rate-limit/body limit olmadan public olduğu ve
blueprint çıktısının sadece client state'te kaldığı görüldü.

### Karar

Route handler'larda Zod tabanlı runtime request validation, body size limit,
basit IP bucket rate-limit ve generic hata cevapları kullanılacak. Generate
sonucunda blueprint proje kaydına yazılacak; local geliştirmede JSON fallback,
hosted deployment'ta Supabase zorunlu storage politikası uygulanacak.

### Sonuçlar

- Bozuk JSON/invalid section/malformed blueprint 500 yerine 400 döner.
- OpenAI maliyetli endpoint'leri kısa pencere rate-limit ile korunur.
- Refresh sonrası hazır proje blueprint çıktısını kaybetmez.
- Production deploy öncesi Supabase schema/migration gereksinimi görünürdür.

---

## ADR-005 — Owner bazlı Supabase RLS ve generation job modeli

**Tarih:** 5 Temmuz 2026
**Durum:** Kabul edildi

### Bağlam

Sprint 1 sonunda kalan dürüst riskler; Supabase Auth/RLS eksikliği, uzun AI
pipeline'ın tek request'e bağlı kalması ve Next/PostCSS audit uyarılarıydı.
Public çok-kullanıcılı kullanımda proje kayıtları owner bazlı ayrılmalı, AI
üretimi de UI'da poll edilebilir bir duruma taşınmalıydı.

### Karar

Supabase kullanılan ortamlarda anonymous Auth oturumu ile `owner_id` üretilecek,
`projects` ve `generation_jobs` tabloları RLS politikalarıyla sadece kendi
sahibine açık olacak. AI üretimi `POST /api/generation-jobs` ile job oluşturup
Next `after()` içinde çalışacak; UI sonucu `/api/generation-jobs/[id]` üzerinden
poll edecek. Next'in mevcut stabil sürümünde güvenli patch olmadığı için
`postcss@8.5.10` transitive override kullanılacak.

### Sonuçlar

- Supabase Data API, owner dışı project/job satırlarını RLS ile gizler.
- Local demo Supabase olmadan JSON fallback ile çalışmaya devam eder.
- Uzun generation akışı kullanıcı arayüzünde job status üzerinden izlenir.
- Harici durable queue/SSE streaming ve email/OAuth account linking roadmap'e
  bırakılır.

---

## ADR-006 — Output export ve kalıcı bölüm yenileme

**Tarih:** 16 Temmuz 2026
**Durum:** Kabul edildi

### Bağlam

PR #11, Output Hub'a Markdown kopyalama, JSON export ve bölüm bazlı regenerate
kontrollerini ekledi. Post-merge incelemede regenerate sonucunun yalnızca client
state'inde kaldığı ve paralel isteklerin blueprint güncellemelerini birbiriyle
yarıştırabildiği görüldü.

### Karar

Proje kimliği verilen regenerate istekleri server'daki owner-scoped proje
verisini kaynak kabul edecek. Üretilen bölüm tam blueprint şemasıyla yeniden
doğrulanacak ve proje kaydına yazılacak. UI aynı anda yalnızca bir generation
işlemine izin verecek.

### Sonuçlar

- Bölüm yenilemeleri sayfa yenilendiğinde kaybolmaz.
- Client'ın gönderdiği eski veya değiştirilmiş proje bağlamı kalıcı kaydı ezmez.
- Paralel UI isteklerinden doğan son-yazan-kazan veri kaybı önlenir.
- Sprint Plan çıktısı Output Hub içinde görünür ve yenilenebilir olur.
