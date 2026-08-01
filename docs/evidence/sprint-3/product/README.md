# Sprint 3 — Ürün Durumu Kanıtı

> **Tarih:** 1 Ağustos 2026
> **Kod referansı:** `565a8f9 Add controlled refine and delivery pack route`
> **Ortam:** `npm run build && npm run start` (production modu, local)

Her görselin hangi story'yi kanıtladığı ve hangi sağlayıcıyla üretildiği
aşağıda açıkça yazılıdır. Canlı URL yoktur (bkz. ADR-012).

| # | Görsel | Kanıtladığı | Sağlayıcı |
| --- | --- | --- | --- |
| 01 | `01-landing-desktop.png` | BP-001R landing ürün vaadini tek ekranda anlatır | — |
| 02 | `02-landing-mobile.png` | BP-037 landing 390px'te yatay taşma olmadan okunur | — |
| 03 | `03-generation-timeline-real-ai.png` | **BP-008R / BP-025R / BP-031** — bölüm bazlı gerçek ilerleme, tamamlanan bölüm run bitmeden açık | **Gerçek OpenRouter üretimi** |
| 04 | `04-command-center.png` | BP-033 Overview varsayılan görünüm; ürün, kitle, kapsam, risk, ilk sprint tek ekranda | Curated sample |
| 05 | `05-output-groups.png` | BP-034 on bir bölüm beş gruba indi; her bölümde Refine + Regenerate (BP-035) | Curated sample |
| 06 | `06-delivery-pack.png` | BP-036 Delivery Pack ayrı route: export'lar + Bootcamp Mode | Sample pipeline |
| 07 | `07-dashboard.png` | Proje kalıcılığı ve durum rozetleri | Sample pipeline |
| 08 | `08-workspace-mobile.png` | BP-037 workspace 390px'te okunur | Curated sample |
| 09 | `09-resume-after-refresh.png` | **BP-032** — sayfa yenilendikten sonra devam eden üretim kaldığı yerden izleniyor, Generate butonu kilitli | **Gerçek OpenRouter üretimi** |
| 10 | `10-workspace-ready.png` | Tamamlanmış blueprint ile workspace | Sample pipeline |

## Sağlayıcı notu (dürüstlük)

03 ve 09 numaralı görseller **gerçek OpenRouter üretimi** sırasında, 1 Ağustos
2026'da yakalanmıştır; ekrandaki bölüm içerikleri modelden gelmedir.

Diğer görseller, ücretsiz sağlayıcı günlük kotası dolduğu için **anahtarsız
sample pipeline** ile üretilmiştir. Sample pipeline ürünün belgelenmiş bir
davranışıdır (anahtar yoksa deterministik çıktı) ve UI akışı gerçek üretimle
birebir aynıdır; yalnız bölüm içerikleri sabittir. Sample çıktı hiçbir yerde
gerçek AI üretimi gibi sunulmamaktadır.

## Teknik kanıt belgeleri

- [`deploy-readiness.md`](deploy-readiness.md) — production build, production
  modunda 16 adımlık smoke, canlıya alma adımları (BP-039R)
- [`security-audit.md`](security-audit.md) — log yüzeyi denetimi, bundle secret
  taraması, bağımlılık açıklarının kapatılması (BP-038)
