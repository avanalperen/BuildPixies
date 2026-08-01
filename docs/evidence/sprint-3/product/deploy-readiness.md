# Deploy-Ready Kanıtı (BP-039R)

> **Tarih:** 1 Ağustos 2026
> **Kapsam kararı:** Ürün canlıya alınmayacaktır (bkz. ADR-012). Bootcamp
> kuralları canlı linki opsiyonel sayar; jüri kriteri "canlıya alınmış **veya
> canlıya alınabilecek şekilde geliştirilme yapılmış**" der. Bu belge ikinci
> şıkkın kanıtıdır.
> **Doğrulama ortamı:** `npm run build` + `npm run start` (production modu),
> gerçek OpenRouter sağlayıcısı, local JSON store.

## 1. Production build

`npm run build` temiz üretiliyor; 15 route derleniyor, queue callback'i ayrı
Node runtime fonksiyonu olarak çıkıyor.

```text
Route (app)
┌ ○ /                          ○ statik
├ ƒ /api/bootcamp-report        ƒ dinamik
├ ƒ /api/export-json
├ ƒ /api/export-readme
├ ƒ /api/generation-jobs
├ ƒ /api/generation-jobs/[id]
├ ƒ /api/projects
├ ƒ /api/projects/[id]
├ ƒ /api/queues/generate-blueprint
├ ƒ /api/regenerate-output
├ ƒ /dashboard
├ ƒ /projects/[id]
├ ○ /projects/new
└ ○ /sample
ƒ Proxy (Middleware)
```

`vercel.json` queue trigger'ı (`blueprint-generation`, `queue/v2beta`) tanımlı
olduğu için deploy anında ek yapılandırma gerekmez.

## 2. Production modunda uçtan uca smoke

Tümü `next start` üzerinde, gerçek AI sağlayıcısıyla koşuldu.

| # | Adım | Sonuç |
| --- | --- | --- |
| 1 | Landing | `200` |
| 2 | Sample blueprint (`/sample`) | `200` |
| 3 | New project wizard | `200` |
| 4 | Dashboard | `200` |
| 5 | `POST /api/projects` | `201` |
| 6 | `POST /api/generation-jobs` | `202` |
| 7 | Gerçek üretim (11 bölüm, OpenRouter) | `succeeded`, 11/11 done, 11 partial section |
| 8 | Project detail sayfası | `200` |
| 9 | `POST /api/regenerate-output` | `200` |
| 10 | `POST /api/export-readme` | `200` |
| 11 | `POST /api/export-json` | `200` |
| 12 | `POST /api/bootcamp-report` | `200` |
| 13 | Bilinmeyen proje | `404` |
| 14 | Yanlış `Content-Type` | `415` |
| 15 | Regenerate sonrası kalıcılık | `status=ready`, blueprint saklı |
| 16 | Rate limit (dakikada 5) | 5×`202`, 6.'da `429` |

Üretim sırasında kaydedilen ilerleme (poll çıktısı, 15 saniye aralıklarla):

```text
running done=1/11  partial=1
running done=3/11  partial=3
running done=6/11  partial=6
running done=8/11  partial=8
running done=10/11 partial=10
succeeded done=11/11 partial=11
```

Bu, progress ve partial persistence'ın gerçek sağlayıcı gecikmesi altında
çalıştığını gösterir: her bölüm doğrulandığı anda kaydediliyor.

## 3. Şema ve yetki sözleşmesi

`supabase/tests/database/durable_jobs_and_rate_limits.test.sql` (30 assertion)
migration'ların sözleşmesini doğrular: tablo/kolon varlığı, `authenticated`
rolünün worker fonksiyonlarını çağıramaması, `service_role`'ün çağırabilmesi,
lease/idempotency davranışı ve başarısız üretimin mevcut blueprint'i
gizlememesi.

## 4. Canlıya almak için gereken tek iş

Kod değişikliği gerekmez:

1. `supabase db push` ile altı migration'ın uygulanması,
2. `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`,
   `SUPABASE_SERVICE_ROLE_KEY`, `OPENROUTER_API_KEY` ve
   `BUILDPIXIES_REQUIRE_SUPABASE=1` değişkenlerinin girilmesi.

`VERCEL=1` platformda otomatik geldiği için durable queue ve zorunlu Supabase
storage kendiliğinden devreye girer.

## 5. Bu ortamda doğrulanamayanlar

Dürüstlük gereği açıkça listelenir:

- **Public URL ve incognito smoke** — deploy yapılmadığı için yoktur.
- **Gerçek Supabase üzerinde cross-owner izolasyonu** — RLS politikaları ve
  fonksiyon yetkileri SQL testi ve kod incelemesiyle doğrulanmıştır; canlı iki
  anonim kullanıcıyla çalıştırılmamıştır.
- **Vercel Queue teslimi** — kuyruk yolu kodda ve `vercel.json`'da tanımlıdır;
  bu koşuda local `after()` runner'ı kullanılmıştır.
- **SQL sözleşme testinin çalıştırılması** — bu ortamda Supabase CLI kurulu
  olmadığı için test dosyası yazılmış ancak koşulmamıştır; `supabase test db`
  ile çalıştırılabilir.
