# Sprint 2 Retrospective Kaydı

## İyi Gidenler

- OpenRouter üzerinden Free tier modeliyle gerçek structured output almayı başardık. Böylece test ve entegrasyon ortamımız bağımsız hale geldi.
- Output Hub kısmında PR #11 ile eklediğimiz Export (Markdown/JSON) ve Regenerate özellikleri, ürünün profesyonel bir SaaS gibi hissettirmesinde inanılmaz derecede etkili oldu.
- Curated Sample Blueprint eklemek, sistemi beklemeden ürünün vadettiği değeri 5 saniyede göstermek adına çok başarılı ve etkili bir hamle oldu.
- Teknik kalite hattının (GitHub Actions, Lint, Typecheck, E2E testleri) sprint boyunca bizi koruması, hataların merge edilmesini büyük oranda engelledi.

## Zorlayanlar

- Tam generation (üretim) sürecinin ortalama 250+ saniye sürmesi, hem UI'ın kilitlenmesine hem de olası hatalarda tüm sürecin çöpe gitmesine (Partial persistence eksikliği) neden oldu.
- Dokümantasyon, tasarım kalibrasyonları ve E2E testlerinin son güne yığılması, release öncesi kalite güvence sürecini sıkıştırdı.
- Rate limit'e takılan API call'ları, üretim esnasında uygulamanın kararlılığını test etmemizi zorlaştırdı.

## Öğrenimler

- Kullanıcıya bekleme süresinde ne olduğunu göstermezsek (Progressive UX / Event Contract eksikliği), arka planda ne kadar mükemmel bir AI çalışırsa çalışsın uygulama dışarıdan "bozuk" veya "donmuş" hissettiriyor. Mimariyi baştan buna göre kurgulamak kesinlikle şarttı.
- Tasarım değişikliklerini yaparken eski iddiaları (ör. 1000+ creator vb.) temizlemek, ürünün profesyonelliğini önemli ölçüde artırıyor. Gerçekçilikten kopmamak en değerli güven unsurudur.
- Test ve QA (Quality Assurance) süreçleri sprintin ayrılmaz bir parçasıdır. Sona bırakılan doğrulama işlemleri, sprint teslimini riske atar.

## Aksiyonlar

| Aksiyon | Owner | Hedef Tarih | Başarı Ölçütü | Story |
| --- | --- | --- | --- | --- |
| Pixie Event altyapısının kodlanması | Kemal | 24 Temmuz | Gerçek SSE/polling event'lerinin UI'a yansıması | BP-008-S3 |
| Partial Persistence altyapısının yazılması | Selin | 25 Temmuz | Hata anında `partial_error` statüsüyle verinin korunması | BP-031-S3 |
| Production Deploy ve Canlı Test | Dev Ekip | 28 Temmuz | Vercel'de uygulamanın Supabase RLS ile tam çalışması | BP-050 |
| Sprint kanıtı için günlük belge arşivlenmesi | Alperen | Sprint 3 sonu | Kanıtların son güne sıkışmaması ve backlog ile uyumlu olması | S3-Retro |
