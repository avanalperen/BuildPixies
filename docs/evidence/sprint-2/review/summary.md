## Sprint 2 Review — 19 Temmuz 2026

### Sprint Goal Sonucu
Kullanıcının fikrini girip, AI beklemeden ürünün değerini anlayabileceği **Curated Sample Blueprint** hazırlandı. Uzun süren AI işlemleri için `Regenerate` ve `Export` (JSON/Markdown) özellikleri eklendi. Landing page yalan/sahte iddialardan arındırıldı. Hedef başarıyla karşılandı.

### Demo Edilen Artış
- Güncellenmiş Landing Page (Asılsız iddialardan arındırılmış, doğrudan Sample'a giden akış)
- `/sample` rotasında çalışan 100+ satırlık örnek "DogWalker Pro" Blueprint'i
- Output Hub'da "Regenerate Section" (Bölüm bazlı yenileme) yeteneği
- Output Hub'da "Export JSON" ve "Copy Markdown" yeteneği
- Sprint raporu oluşturan Bootcamp Mode
- Sprint 3 için hazırlanan Pixie Event Contract ve Partial Persistence tasarımları (ADR-009, ADR-010)

### Tamamlanan Story'ler
- BP-001R, BP-002R, BP-029, BP-030 (Ürün Dili ve Örnek Proje)
- BP-008R-S2, BP-031-S2 (Sprint 3 Mimari Hazırlıkları)
- BP-042, BP-043, BP-046 (Kanıt ve Repozitörü Hijyeni)
- Output Export & Regenerate (PR #11)

### Taşınan / Başarısız İşler
- Command Center görsel prototipi (Sprint 3'e bırakıldı, Command Center scope'uyla birleşti)
- Gerçek Event/Status backend entegrasyonu (Sadece mimari olarak tasarlandı, Sprint 3'te kodlanacak)
- Production Vercel/Supabase deploy ve testleri (Sprint 3 RC aşamasına bırakıldı)

### Kalite Sonucu
- lint: Geçti
- typecheck: Geçti
- build: Geçti
- E2E: Mevcut Playwright testleri yeşil, Sample route aktif
- CI URL: Repo GitHub Actions sekmesinde görülebilir

### Kararlar
- Uzun süren AI taleplerinde 429/5xx hatalarında veriyi kaybetmemek için Partial Persistence modeline geçilecek (ADR-010).
- İstemci ile sunucu arasında Event (SSE vb.) mantığıyla Pixie aşamaları anlık aktarılacak (ADR-009).

### Katılımcılar
- Muhammed Köseoğlu (PO)
- Alperen Avan (SM)
- Kemal Ersin Özkan (Dev)
- Selin Akkaş (Dev)
