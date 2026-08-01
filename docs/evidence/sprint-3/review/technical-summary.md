# Sprint 3 — Sprint Review (teknik bölüm)

> **Tarih:** 1 Ağustos 2026 · **Kod referansı:** `ee1009e`
> **Kapsam:** Bu belge review'ın koddan doğrulanabilir bölümüdür. Demo sonucu,
> katılımcı listesi ve takım kararları takım tarafından eklenecektir.

## Tamamlananlar

| Story | Sonuç | Doğrulama |
| --- | --- | --- |
| BP-008R | Pixie durumu gerçek job event'lerinden geliyor | E2E + ekran görüntüsü 03 |
| BP-031 | Doğrulanan bölümler anında kaydediliyor | E2E assertion + migration `202608010002` |
| BP-025R / BP-032 | Refresh/reconnect üretimi kaybetmiyor; tamamlanan bölüm run bitmeden açılıyor | Mid-job refresh E2E + görüntü 09 |
| BP-033 | MVP Command Center, Overview varsayılan | E2E + görüntü 04 |
| BP-034 | On bir bölüm beş grupta, aktif grubu adlandıran header, deep-link (`?view=`) | Görüntü 05 + E2E |
| BP-035 | Talimatla kontrollü bölüm düzeltme | E2E (200 + 400 sınır testi) |
| BP-036 | Delivery Pack ayrı route | E2E + görüntü 06 |
| BP-038 | Log yüzeyi secret-safe, bağımlılık açıkları kapalı | `security-audit.md` |
| BP-039R | Deploy-ready paket kanıtlandı | `deploy-readiness.md` |
| BP-048 | AI mimarisi ve üretim izi belgelendi | README diyagramı |

## Tamamlanmayanlar ve nedenleri

| Story | Durum | Neden |
| --- | --- | --- |
| BP-039, BP-040 | Dropped | Takım canlı deploy yapmama kararı aldı; bootcamp kuralı canlı linki opsiyonel sayıyor (ADR-012) |
| BP-041 | Dropped | Go koşulu "public abuse riski" canlı yüzey olmadan oluşmuyor (ADR-014) |
| BP-037 | Code Complete | Otomatik klavye/mobil testi var; gerçek cihaz denemesi yapılmadı |
| BP-047 | Blocked | Üç gerçek katılımcı bulunamadı; protokol hazır |
| BP-044 | Açık | Video kaydı ve YouTube upload |
| BP-045 | Açık | Teslim formu gönderimi |

## Kalite sonucu

```text
npm run lint       ✓
npm run typecheck  ✓
npm run build      ✓  15 route
npm run test:e2e   ✓  11/11
npm audit --omit=dev  0 açık
```

E2E kapsamı sprint boyunca 6 → 11 senaryoya çıktı. Eklenen beşi doğrudan bu
sprintin çıktısını koruyor: gerçek progress kaydı, mid-job refresh, kontrollü
refine, mobil klavye yolculuğu ve curated sample rotası.

## Sprint sırasında bulunan ve düzeltilen gerçek hatalar

Bunlar plandan değil, çalışırken ortaya çıktı:

1. **Sahte ilerleme.** `OrchestratorEvent` altyapısı vardı ama hiçbir çağıran
   `onEvent` geçmiyordu; UI'daki pixie durumları tamamen dekoratifti.
2. **Bir bölüm timeout alınca 8 bölümlük iş çöpe gidiyordu.** Gerçek koşuda
   gözlendi; geçici hatalar için bölüm bazlı tekrar deneme eklendi.
3. **Next.js proxy bypass advisory'si.** Oturum bootstrap'i `proxy.ts`
   üzerinden çalıştığı için doğrudan ilgiliydi; 16.2.12'ye çıkıldı.
4. **`postcss@8.5.10` sabitlemesi** (ADR-005'te bir açığı kapatmak için
   eklenmişti) kendisi açık bir sürümü sabitler hale gelmişti.
5. **Ölü `/api/generate-blueprint` endpoint'i** çalışan job'ın proje durumunu
   ezebiliyordu; kaldırıldı.
6. **`/sample` sayfasında export butonları ölüydü.** Sample projesinin id'si
   UUID olmadığı için export uçları `400` dönüyordu; sayfanın ilk E2E'si
   yazılınca ortaya çıktı. İstemci artık kalıcı olmayan projeler için
   blueprint'i gövdede gönderiyor.
7. **Queue callback yetkisiz çağrıyı reddetmiyordu** (plan §10.1). Route
   kapatıldı ve opsiyonel shared secret eklendi.

## Takım tarafından eklenecek

- [ ] Demo tarihi, katılımcılar ve demo sonucu
- [ ] Product Owner kabul kararı
- [ ] Sprint sonrası taşınan işlerin sahibi ve hedef tarihi
