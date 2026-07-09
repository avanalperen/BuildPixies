# Referans Projeler

YZTA Bootcamp 2026 sürecinde örnek/ referans olarak kullanılan repolar. Tüm repolar **git submodule** olarak eklenmiştir; yalnızca okuma ve ilham amacıyla kullanılırlar, kendi projemize doğrudan kod kopyalamak için değildir.

> ⚠️ Bootcamp kuralları gereği **hazır proje kullanmak, satın alma yapmak, dışarıdan destek almak diskalifiye sebebidir.** Bu repolar yalnızca Scrum süreci, dökümantasyon yapısı ve teknik yaklaşım için referanstır.

---

## Repo Özeti

| # | Klasör | Tip | Öne Çıkan Referans Değeri |
| --- | --- | --- | --- |
| 1 | `BootcampScrumTemplate` | Scrum Şablonu | Sprint döküman yapısı / README kalıbı |
| 2 | `OUA-zaten-Bootcamp-2023` | **Flutter (Ödüllü)** | Flutter + Firebase mimarisi, teknoloji stack |
| 3 | `planova` | **Flutter** | Mobil uygulama + AI entegrasyonu, Sprint dokümantasyonu |
| 4 | `GhostOfAnnaScrumExample` | Scrum Örneği | Sprint review/retrospective kalıpları |
| 5 | `U-21-Cherry-Chasers` | Oyun (Unity) | Sprint puanlama ve board örneği |

---

## 1. `BootcampScrumTemplate`
- **Kaynak:** https://github.com/YapayZekaveTeknolojiAkademisi/BootcampScrumTemplate
- **İçerik:** Resmi bootcamp Scrum şablonu. README + `ProjectManagement/Sprint1Documents/`
- **Referans için:** Repo README'si, proje README'sinin nasıl yazılacağına dair kalıp (Takım, Ürün, Backlog, Sprint bölümleri). Sprint 1 doküman klasör yapısı.
- **Neden önemli:** Akademi'nin kendi yayınladığı şablon — README formatına uymak için ilk durak.

## 2. `OUA-zaten-Bootcamp-2023` ⭐
- **Kaynak:** https://github.com/burakcevheroglu/OUA-zaten-Bootcamp-2023
- **İçerik:** 2. dönem OUA **En İyi Uygulama Ödülü** kazanan `zaten` kiralama platformu. Flutter + Firebase.
- **Referans için:**
  - Detaylı README ve Sprint 1/2/3 dokümantasyon kalitesi
  - Teknoloji stack listesi (Firebase, Riverpod, Hive, Stripe, Stream Chat, OneSignal, Google Maps...)
  - MVVM mimari kullanımı, GetX routing
  - `bootcampFiles/` klasöründe sprint dokümanları
- **Neden önemli:** Ödüllü, gerçek bir mobil uygulama referansı — mimari ve teknoloji seçimleri için en güçlü örnek.

## 3. `planova`
- **Kaynak:** https://github.com/olgnbrn/planova
- **İçerik:** Zaman yönetimi mobil uygulaması (Flutter). AI destekli kişisel hikaye aracı (Gemini API).
- **Referans için:**
  - Detaylı ürün açıklaması, hedef kitle ve özellik tanımları
  - Sprint 1/2/3 notları (Firebase, Gemini API entegrasyonu, lokalizasyon, tema)
  - `Project_Management_Files/` klasöründe sprint artifacts'ları
- **Neden önemli:** **AI entegrasyonlu Flutter mobil uygulama** örneği — bizim projemizle en alakalı iki repodan biri.

## 4. `GhostOfAnnaScrumExample`
- **Kaynak:** https://github.com/IbrmSerhat/GhostOfAnnaScrumExample
- **İçerik:** Unity Adventure/Puzzle oyunu `The Ghost of Anna` için Scrum dökümantasyonu.
- **Referans için:** Sprint 1/2/3 Review ve Retrospective yazım kalıbı, puan tamamlama mantığı, backlog düzeni açıklamaları.
- **Neden önemli:** Sprint dökümanlarının nasıl yazılacağına dair temiz, kısa ve net bir örnek.

## 5. `U-21-Cherry-Chasers`
- **Kaynak:** https://github.com/kevsoOther/U-21-Cherry-Chasers
- **İçerik:** Multiplayer 3D arena oyunu (Unity). README'de sprint süreçleri mevcut.
- **Referans için:** Sprint puanlama stratejisi (toplam 36 puan / sprint dağılımı), Daily Scrum yönetimi (WhatsApp/Discord), tasarım grubu ayrımı yaklaşımı.
- **Neden önemli:** Sprint planlama ve görev dağılımı için farklı bir yaklaşım örneği.

---

## Submodule Yönetimi

Bu repolar git submodule olarak izlendiğinden, kendi ana repomuzun geçmişini kirlenmeden güncelleyebiliriz.

### İlk kurulum (fresh clone sonrası)
```bash
git submodule update --init --recursive
```

### Tüm referans repoları en son commit'e güncelle
```bash
git submodule update --remote --merge
```

### Tek bir referansı güncelle
```bash
git submodule update --remote references/OUA-zaten-Bootcamp-2023
```

### Bir referansın belirli bir commit'ine geçmek
```bash
cd references/<repo-adi>
git checkout <commit-hash>
cd ../..
git add references/<repo-adi>
git commit -m "references: <repo-adi> <commit-hash>'e güncellendi"
```

---

## Önerilen Kullanım

1. **README ve sprint dokümantasyon kalıbı** için önce `BootcampScrumTemplate` → sonra `OUA-zaten-Bootcamp-2023` README'lerine bak.
2. **Flutter mimari ve teknoloji seçimleri** için `OUA-zaten-Bootcamp-2023` ve `planova` repolarını incele.
3. **AI entegrasyonu** için `planova`'nın Gemini API kullanım notlarını (Sprint 3) oku.
4. **Sprint review/retrospective yazımı** için `GhostOfAnnaScrumExample` ve `U-21-Cherry-Chasers` README'lerini örnek al.
5. **Kod kopyalama yapma** — yalnızca yapı, yaklaşım ve dökümantasyon kalıplarından ilham al.
