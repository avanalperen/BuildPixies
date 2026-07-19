# Sprint 2 Kanıt Manifestosu

> **Tarihsel sprint:** 6 Temmuz – 19 Temmuz 2026
>
> **Paket normalizasyonu:** 19 Temmuz 2026
>
> **Durum:** Bootcamp minimum altı kanıt başlığı repository içinde tamamlandı.
>
> **Gerçeklik kuralı:** Sonradan eklenen hiçbir kayıt tarihsel sprint anında
> üretilmiş gibi gösterilmez. Tüm görseller ve kararlar projenin dürüstlüğünü yansıtır.

Bu klasör, Sprint 2 kapanışını tek yerden incelenebilir hale getirir. Tarihsel ürün görselleri ve yazılı Scrum kayıtları korunur. Tüm çıktıların gerçekliğine sadık kalınmış olup, eksiklikler olduğu gibi beyan edilmiştir.

## Zorunlu Kanıt Matrisi

| Bootcamp başlığı | Repository kanıtı | Kabul durumu | Kaynak sınırlaması |
| --- | --- | --- | --- |
| Backlog dağıtma mantığı | [`docs/sprint-2.md` §4](../../sprint-2.md#4-capacity-ve-backlog-dağıtma-mantığı) | Tamam | 25 Puanlık S2 kapanış backlog'u detaylandırıldı |
| Daily Scrum | [`daily/`](daily/) | Tamam | Günlük iletişim kayıtları/yazılı özetler mevcuttur |
| Sprint Board Updates | [`board/`](board/) | Tamam | Başlangıç, orta ve son board kanıtları eklendi |
| Ürün Durumu | [`product/`](product/) | Tamam | Landing Before/After ve Sample UI görüntüleri arşivlendi |
| Sprint Review | [`review/summary.md`](review/summary.md) | Tamam | Katılımcıların yer aldığı toplantı özeti işlendi |
| Sprint Retrospective | [`retrospective/summary.md`](retrospective/summary.md) | Tamam | Elde edilen dersler ve aksiyon kararları kayıtlıdır |

## 19 Temmuz Teknik Yeniden Doğrulaması

Sprint 2'nin bitişi ile proje genelinde temel fonksiyonların doğrulanması yapılmıştır. Bu sonuçlar PR #11 sonrası kod stabilitesini ifade eder:

- Provider hardenings: `14b4141 OpenRouter Free desteği` ve `6176086 429/5xx retry ve invalid output hardening`
- Output/Export desteği: `b5f1e26 Markdown copy ve JSON export`
- `npm run lint`: geçti
- `npm run typecheck`: geçti
- `npm run build`: geçti
- `npm run test:e2e`: geçti (Playwright akışları çalışıyor)

Bu doğrulama, Sprint 2 sonunda ulaşılan ürün kalitesini yansıtmakta ve Sprint 3 RC sürecine güvenli bir zemin hazırlamaktadır.

## Açık Kaynak Sınırlamaları

- Sprint başında 18 Temmuz code-freeze hedeflenmesine rağmen son güne sarkan evidence yükü kapanış sürecini kısıtlamıştır.
- Production ortamında deploy testi yapılamadığı için bazı API hız kısıtları yalnız development testlerine dayanmaktadır.
- Slack/WhatsApp yazışmalarının tamamı repo içinde bulunmadığından, bazı daily notları summary (yazılı özet) olarak korunmuştur.

Bu kısıtlamalara karşın, Bootcamp 6 zorunlu kanıt hedefine ulaşılmıştır. Gelecek sprint için evidence oluşturma sürecinin geliştirme ile eş zamanlı yürütülmesi karara bağlanmıştır.
