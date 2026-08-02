# Sprint 3 Retrospective (Süreç ve Aksiyonlar)

Teknik çıkarımlar için `technical-findings.md` dosyasına bakabilirsiniz. Süreç retrospektifimiz aşağıdadır.

### İyi Gidenler
- Sprint 3 boyunca takım içi iletişim Slack/WhatsApp senkronizasyonlarıyla çok daha sıkı tutuldu ve entegrasyon cehennemi yaşanmadı.
- Partial Persistence ve Event Polling gibi karmaşık mimariler, planlandığı gibi eksiksiz ve dayanıklı (durable) çalıştı.
- Kullanıcı testlerinden elde edilen erken geri bildirimler (MVP Command Center) ürün mimarisi tercihimizin doğruluğunu net bir şekilde kanıtladı.

### İyileştirilmesi Gerekenler
- Vercel canlı deploy'u konusundaki "kapsam daraltma" kararını almakta biraz geciktik; en başta "deploy-ready paketi" teslim etme hedefini net koysaydık zaman ve eforu daha iyi optimize edebilirdik.
- Kimi günlerde PR'ların birikmesi, CI/CD pipeline'larında ve test koşumlarında son dakika darboğazlarına (bottleneck) sebep oldu.

### Aksiyonlar

| Aksiyon | Sorumlu | Hedef Tarih |
| --- | --- | --- |
| Submission öncesi final projenin Release tag'inin (v1.0.0) atılması ve form gönderimi | Alperen Avan | 2 Ağustos 2026 |
| Proje demo videosunun montajlanıp YouTube'a yüklenmesi ve linkin eklenmesi | Muhammed Köseoğlu | 2 Ağustos 2026 |
| Kapsam dışı bırakılan Agents SDK ve pgvector mimarisi için Bootcamp sonrası detaylı Roadmap çıkarılması | Kemal Ersin Özkan | Bootcamp Sonrası |
