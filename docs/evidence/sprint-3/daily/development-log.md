# Sprint 3 — Geliştirme Günlüğü (commit türevi)

> **Kaynak:** `git log --since=2026-07-19`, `main` branch.
> **Kapsam uyarısı:** Bu belge commit geçmişinden türetilmiş **gerçek**
> geliştirme kaydıdır. Takımın sözlü Daily Scrum notlarının yerine geçmez;
> onları tamamlar. Takımın kendi günlük notları bu klasöre ayrıca eklenecektir.

## 20 Temmuz — Sprint başlangıcı

**Kim:** Kemal Ersin Özkan
**Ne:** Üç README güncellemesi (Sprint 3 bölümünün açılması, backlog düzeni).
**Durum:** Planning günü; kod değişikliği yok.

## 21–27 Temmuz — Commit kaydı yok

Bu aralıkta `main` üzerine commit düşmemiştir. Planın 6.2–6.6 arası günleri
(event backend, progressive workspace, Command Center, output IA, feature
freeze) bu aralıkta öngörülüyordu; gerçekleşen iş 1 Ağustos'a kaydı.

> Takım notu gerekiyor: bu aralıktaki çalışma neden `main`'e yansımadı?
> (branch'te mi kaldı, blocker mı vardı, availability mi?) Retrospektifin
> girdisi.

## 28 Temmuz — Accessibility ve mobil düzeltmeler

**Kim:** Selin Akkaş
**Ne:** `Fix mobile blueprint actions bar + accessibility polish` — 9 dosya.
Mobilde gizlenen blueprint aksiyon çubuğu görünür yapıldı ve AppShell alt
navigasyonuyla çakışması giderildi. Ayrıca tab panellerinde eksik focus ring,
kontrast düşük warning badge, opaklıkla zayıflamış metin kontrastı, küçük
dokunma hedefleri ve dar ekranda adım etiketi çakışması düzeltildi.
**Story:** BP-037.

## 29 Temmuz — Sprint 2 kapanışı

**Kim:** Alperen Avan
**Ne:** PR #48 merge; Sprint 2 evidence ve board kayıtları `main`'e alındı.

## 1 Ağustos — Ürünleştirme günü

**Kim:** Muhammed Köseoğlu
Sekiz commit, sırayla:

| Commit | İş | Story |
| --- | --- | --- |
| `Report real generation progress` | Sahte pixie ilerlemesi kaldırıldı; `progress.steps[]` job kaydına yazılıyor, refresh sonrası devam, duplicate job engeli | BP-008R, BP-032 |
| `Persist partial blueprint sections` | Doğrulanan her bölüm anında kaydediliyor; başarısız run kazanımları kaybetmiyor | BP-031 |
| `Add MVP command center and group outputs` | Overview varsayılan görünüm; 11 sekme 5 gruba indi | BP-033, BP-034 |
| `Cover mid-job refresh and document AI trace` | Eksik E2E matris satırları; AI mimarisi ve üretim izi belgelendi | BP-048 |
| `Drop live deploy and evidence deploy readiness` | Canlı deploy kapsam dışı; deploy-ready kanıtı üretildi | ADR-012, BP-039R |
| `Close production dependency advisories` | 4 high açık kapatıldı (Next proxy bypass dahil) | BP-038, ADR-013 |
| `Add controlled refine and delivery pack route` | Talimatla bölüm düzeltme; Delivery Pack ayrı route | BP-035, BP-036 |
| `Add sprint 3 evidence and product screenshots` | Ürün Durumu kanıtı, README Sprint 3 bölümü | BP-043-S3 |

**Blocker'lar:** OpenRouter ücretsiz katman günlük kotası doldu; son ekran
görüntülerinin bir kısmı anahtarsız sample pipeline ile alındı ve kanıtta
açıkça işaretlendi.

## 2 Ağustos — Teslim günü

Video kaydı, kanıt tamamlama ve form gönderimi. Kayıt takım tarafından
eklenecek.
