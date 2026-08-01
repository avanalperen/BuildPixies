# Sprint 3 — Board Durumu

> **Kaynak:** `gh issue list --repo avanalperen/BuildPixies --state all`
> **Çekim tarihi:** 1 Ağustos 2026
> **Board:** GitHub Issues (README'de Product Backlog URL olarak belirtilen)

## Canlı board sayımı

| Ölçüm | Değer |
| --- | --- |
| Toplam issue | 19 |
| Açık | 0 |
| Kapalı | 19 |
| `sprint-1` etiketli | 10 |
| `sprint-2` etiketli | 9 |
| **`sprint-3` etiketli** | **0** |
| `P0` etiketli | 19 |
| `done` etiketli | 19 |

## Bulgu

**Sprint 3 için GitHub board'unda hiç issue açılmamıştır.** Sprint 1 ve Sprint 2
işleri issue olarak takip edilmiş ve kapatılmışken, Sprint 3 backlog'u yalnızca
`docs/sprint-3.md` içinde yaşamıştır.

Bunun iki sonucu var:

1. Sprint 3 için "board başı / orta / freeze / final" ekran görüntüsü üretmek
   mümkün değildir; gösterilecek bir board hareketi yoktur.
2. Sprint 3'ün iş takibi doküman üzerinden yürümüştür; bu, planın kendi
   "Sprint Board Updates" zorunlu kanıtıyla çelişir.

## Bu boşluğu kapatmanın iki dürüst yolu

**A. Issue'ları şimdi açmak (backfill).** Sprint 3 story'leri
(`docs/sprint-3.md` §4.2) gerçek durumlarıyla issue'ya dönüştürülür. Planın
kendi kuralı gereği bunlar **`backfilled` etiketiyle** açıkça işaretlenmelidir:

> "Tarihsel sprint kayıtları geriye dönük 'daha iyi görünmesi' için
> değiştirilmez; eksik kanıt sonradan eklenirse `backfilled` olarak açıkça
> etiketlenir." — `docs/plan.md` §1.2

**B. Olmadığını yazmak.** Sprint 3'te board yerine doküman tabanlı takip
kullanıldığı Sprint Review ve Retrospektif'te açıkça belirtilir; retro
aksiyonu olarak kaydedilir.

Bu seçim takımındır. Backfill edilecekse issue'lar tek tek gerçek durumlarıyla
(Done / Dropped / Blocked) ve gerekçe referanslarıyla (ADR-012, ADR-014)
açılmalıdır.

## Sprint 1–2 board kanıtı

Önceki sprintlerin board görselleri yerinde:
`docs/evidence/sprint-2/board/2026-07-19-board-closeout-backfilled.png`
