# BuildPixies — Bootcamp Uyumlu Master Ürün ve Teslim Planı

> **Belge türü:** Yaşayan ürün planı, teknik teslim planı ve Bootcamp kontrol
> merkezi
> **Sürüm:** 3.0 — Product Experience Reset
> **Son doğrulama:** 16 Temmuz 2026, Perşembe
> **Doğrulanan kod referansı:** `6176086 Harden AI generation`
> **Repository:** [avanalperen/BuildPixies](https://github.com/avanalperen/BuildPixies)
> **Kategori:** Yapay Zeka / Veri Bilimi
> **Kesin ürün teslimi:** **2 Ağustos 2026 Pazar, 23:59**
> **Takım içi güvenli teslim hedefi:** **2 Ağustos 2026, 18:00**
> **Planlanan Top 10 sunumu:** **14 Ağustos 2026** — Akademi/jüri takvimine
> göre değişebilir.

Bu dosya yalnızca “hangi özellikleri yapacağız?” sorusunu cevaplamaz. Aşağıdaki
dört hattın tek kaynağıdır:

1. Kullanıcının anlayacağı ve değer göreceği ürün deneyimi,
2. Yapay zeka, mimari, güvenlik ve kalite çalışmaları,
3. Her sprintte zorunlu Scrum kanıtları,
4. README, video, canlı ürün ve final formundan oluşan Bootcamp teslimi.

Planın amacı daha fazla özellik eklemek değil; **BuildPixies'i çalışan,
anlaşılır, kanıtlanabilir, demo edilebilir ve jüri kriterleriyle doğrudan
eşleşen bir ürün haline getirmektir.**

---

## İçindekiler

1. [Belge Kullanım Kuralları](#1-belge-kullanım-kuralları)
2. [Yönetici Özeti ve Kritik Karar](#2-yönetici-özeti-ve-kritik-karar)
3. [Kaynaklar ve Gerçeklik Hiyerarşisi](#3-kaynaklar-ve-gerçeklik-hiyerarşisi)
4. [Bootcamp Kuralları ve Değişmez Teslimler](#4-bootcamp-kuralları-ve-değişmez-teslimler)
5. [Resmî Takvim ve İç Kontrol Kapıları](#5-resmî-takvim-ve-iç-kontrol-kapıları)
6. [Takım, Roller ve Çalışma Modeli](#6-takım-roller-ve-çalışma-modeli)
7. [Ürün Vizyonu ve Stratejik Konumlandırma](#7-ürün-vizyonu-ve-stratejik-konumlandırma)
8. [Hedef Kullanıcılar, JTBD ve Kullanıcı Değeri](#8-hedef-kullanıcılar-jtbd-ve-kullanıcı-değeri)
9. [Lean Canvas ve Pazar Hipotezi](#9-lean-canvas-ve-pazar-hipotezi)
10. [Mevcut Deneyim Denetimi](#10-mevcut-deneyim-denetimi)
11. [Product Experience Reset](#11-product-experience-reset)
12. [Bilgi Mimarisi ve Ekran Spesifikasyonları](#12-bilgi-mimarisi-ve-ekran-spesifikasyonları)
13. [AI Ürün Mimarisi ve Pixie Orkestrasyonu](#13-ai-ürün-mimarisi-ve-pixie-orkestrasyonu)
14. [Teknik Mimari ve Veri Akışı](#14-teknik-mimari-ve-veri-akışı)
15. [Güvenlik, Gizlilik, Maliyet ve Dayanıklılık](#15-güvenlik-gizlilik-maliyet-ve-dayanıklılık)
16. [Repo Gerçeklik Denetimi](#16-repo-gerçeklik-denetimi)
17. [Master Product Backlog](#17-master-product-backlog)
18. [Öncelikli Story Kabul Kriterleri](#18-öncelikli-story-kabul-kriterleri)
19. [Sprint 1 Gerçekleşenler ve Kanıt Açıkları](#19-sprint-1-gerçekleşenler-ve-kanıt-açıkları)
20. [Sprint 2 Kapanış Planı](#20-sprint-2-kapanış-planı)
21. [Sprint 3 Gün Gün Final Planı](#21-sprint-3-gün-gün-final-planı)
22. [Scrum Kanıt ve README Operasyon Planı](#22-scrum-kanıt-ve-readme-operasyon-planı)
23. [Kalite, Test ve Release Stratejisi](#23-kalite-test-ve-release-stratejisi)
24. [Jüri Kriterleriyle Birebir Eşleme](#24-jüri-kriterleriyle-birebir-eşleme)
25. [Üç Dakikalık Video ve Demo Senaryosu](#25-üç-dakikalık-video-ve-demo-senaryosu)
26. [Final Teslim Checklist](#26-final-teslim-checklist)
27. [Referans Projelerden Alınan Dersler](#27-referans-projelerden-alınan-dersler)
28. [Risk Kaydı ve Kontenjan Planı](#28-risk-kaydı-ve-kontenjan-planı)
29. [Definition of Ready ve Definition of Done](#29-definition-of-ready-ve-definition-of-done)
30. [İletişim ve Scrum Şablonları](#30-iletişim-ve-scrum-şablonları)
31. [İlk 72 Saatlik Uygulama Sırası](#31-ilk-72-saatlik-uygulama-sırası)
32. [Kaynak Dizini](#32-kaynak-dizini)

---

## 1. Belge Kullanım Kuralları

### 1.1 Durum sözlüğü

Bu planda “Done” kelimesi dosya varlığı anlamına gelmez.

| Durum | Anlamı |
| --- | --- |
| **Done** | Kod `main` branch'inde, kabul kriterleri karşılanmış, otomatik test geçmiş ve sprint kanıtı hazırlanmış |
| **Code Complete** | Kod ve test hazır; canlı ortam, ekran görüntüsü veya README kanıtı eksik |
| **Partial** | Story'nin değer üreten bir kısmı çalışıyor; kabul kriterlerinin tamamı karşılanmıyor |
| **Planned** | Kapsam ve kabul kriterleri belli; geliştirme başlamadı |
| **Blocked** | Açık engel, sorumlu ve çözüm tarihi kayıtlı |
| **Dropped** | Bilinçli olarak kapsam dışına çıkarıldı; nedeni decision log'a yazıldı |
| **External Confirmation** | Koddan doğrulanamayan takım/form/asistan/iletişim bilgisi ekip tarafından teyit edilmeli |

### 1.2 Güncelleme ritmi

- Product Owner ürün hedefi, kullanıcı değeri ve kabul kriterlerini günceller.
- Scrum Master tarih, owner, story point, board ve kanıt durumunu günceller.
- Developer tamamladığı işin teknik kanıtını ve test sonucunu ekler.
- Her gün sonunda yalnızca değişen durumlar güncellenir.
- Her Sprint Review öncesi plan ile repo arasında doğrulama yapılır.
- Tarihsel sprint kayıtları geriye dönük “daha iyi görünmesi” için değiştirilmez;
  eksik kanıt sonradan eklenirse `backfilled` olarak açıkça etiketlenir.

### 1.3 Kanıt olmadan tamamlandı sayılmayacaklar

- Sadece component dosyası bulunması kullanıcı story'sini tamamlamaz.
- Sadece local çalışması deploy hazırlığını tamamlamaz.
- Sadece “done” etiketi issue'yu tamamlamaz; issue kapatılmalı ve PR/commit bağlanmalı.
- Sadece metin halinde “test edildi” yazılması kalite kanıtı değildir; komut/CI sonucu gerekir.
- Sample fallback gerçek AI üretimi gibi sunulamaz.
- Role-based prompt pipeline, olmadığı halde belirli bir Agents SDK kullanıyormuş
  gibi anlatılamaz.

---

## 2. Yönetici Özeti ve Kritik Karar

### 2.1 Bugünkü durum

BuildPixies'in çalışan bir Next.js uygulaması, güçlü bir tasarım sistemi,
proje oluşturma akışı, rol bazlı AI pipeline'ı, strict structured outputs,
generation job/polling modeli, durable queue, Supabase RLS temeli, export,
regenerate, Bootcamp Mode, Playwright E2E ve GitHub Actions kalite kapısı vardır.

Ancak ürün şu anda **görsel olarak tamamlanmış, deneyim olarak yeterince
açıklayıcı olmayan bir arayüz** hissi vermektedir. Kullanıcı:

- ürünün farkını landing'de kanıtla göremiyor,
- uzun üretim sırasında gerçek ilerlemeyi göremiyor,
- sonuç geldiğinde 11 sekme arasında neyin önemli olduğunu seçemiyor,
- “şimdi ne yapmalıyım?” sorusuna tek ekranda cevap alamıyor,
- Bootcamp Mode ile ana idea-to-MVP deneyiminin ilişkisini hemen anlayamıyor.

16 Temmuz canlı testinde tam 11 bölümlük blueprint üretimi **252 saniye**
sürmüştür. Bu süre teknik olarak route sınırı içinde olsa da, progressive ürün
deneyimi olmadan demo ve kullanıcı değeri açısından kabul edilemez.

### 2.2 Kritik ürün kararı

Sprint 2'nin kalanında ve Sprint 3'te öncelik “daha çok özellik” değil,
**Product Experience Reset** olacaktır:

1. Landing iddiasını gerçek örnekle kanıtlamak,
2. Üretimi gerçek pixie/section ilerlemesiyle görünür yapmak,
3. Sonucu bir “MVP Command Center” içinde özetlemek,
4. Kullanıcıya sonraki üç aksiyonu vermek,
5. Bootcamp özelliğini ana deneyimden ayırıp bağlama göre sunmak,
6. Tüm bunları Bootcamp kanıtlarıyla aynı anda belgelemek.

### 2.3 North Star

> **BuildPixies, dağınık bir fikri; kararları verilmiş, kapsamı sınırlandırılmış
> ve ilk sprinti hazır bir MVP planına dönüştürür.**

### 2.4 Ana başarı ölçütleri

| Ölçüt | Hedef |
| --- | --- |
| 5 saniye testi | Yeni kullanıcı ürünün ne yaptığını tek cümleyle anlatabilmeli |
| 30 saniye testi | Kullanıcı gerçek örnek blueprint'e ulaşabilmeli |
| İlk sistem geri bildirimi | Generate tıklamasından sonra 2 saniye içinde job/progress görünmeli |
| Progressive değer | İlk tamamlanan bölüm tüm pipeline bitmeden açılmalı |
| Sonuç anlaşılırlığı | Kullanıcı MVP özeti ve ilk 3 aksiyonu tek ekranda görmeli |
| Demo güvenliği | Curated sample project AI beklemeden açılmalı |
| Kalite | `lint`, `typecheck`, `build`, kritik E2E ve CI geçmeli |
| Bootcamp kanıtı | Her sprintin zorunlu 6 maddesi README'de bulunmalı |

---

## 3. Kaynaklar ve Gerçeklik Hiyerarşisi

### 3.1 Kaynak önceliği

Birbiriyle çelişen bilgi varsa aşağıdaki sıra uygulanır:

1. [`docs/bootcamp.md`](bootcamp.md) — resmî kılavuz,
2. [`docs/bootcamp bilgilendirme toplantısı.md`](<bootcamp bilgilendirme toplantısı.md>) — toplantıda açıklanan operasyon ayrıntıları,
3. `main` branch'indeki çalışan kod, Git geçmişi, PR ve CI,
4. Bu master plan,
5. [`README.md`](../README.md) ve sprint belgeleri,
6. GitHub Issues/Projects board,
7. Tasarım referansları ve eski niyet belgeleri.

### 3.2 İncelenen yerel referanslar

- [`references/BootcampScrumTemplate/README.md`](../references/BootcampScrumTemplate/README.md)
- [`references/GhostOfAnnaScrumExample/README.md`](../references/GhostOfAnnaScrumExample/README.md)
- [`references/U-21-Cherry-Chasers/README.md`](../references/U-21-Cherry-Chasers/README.md)
- [`references/OUA-zaten-Bootcamp-2023/README.md`](../references/OUA-zaten-Bootcamp-2023/README.md)
- [`references/planova/README.md`](../references/planova/README.md)
- `references/` altında bulunan screenshot, burndown, persona, sözleşme,
  flowchart ve proje yönetimi ekleri
- [`assets/magical_productivity_system/DESIGN.md`](../assets/magical_productivity_system/DESIGN.md)
- `assets/` altındaki landing, dashboard, wizard ve workspace görsel referansları

### 3.3 Planın doğruladığı dış durum

| Alan | 16 Temmuz 2026 doğrulaması |
| --- | --- |
| Repo | Public, default branch `main` |
| Remote | `avanalperen/BuildPixies` |
| Son commit | `6176086 Harden AI generation` |
| Son CI | Quality workflow başarılı; lint, typecheck, build, 3 E2E geçti |
| PR | PR #11 Selin Akkaş tarafından açıldı ve merge edildi |
| Canlı homepage | GitHub repo metadata içinde boş; Vercel proje bağı doğrulanmadı |
| Issue board | 10 issue açık; “done” etiketli olmalarına rağmen kapatılmamış |
| Ekip | README'de 4 kişi; resmî ekip formu durumu koddan doğrulanamaz |

---

## 4. Bootcamp Kuralları ve Değişmez Teslimler

### 4.1 Değişmez kurallar

- Ürün takım tarafından sıfırdan geliştirilmelidir.
- Hazır proje kullanımı, satın alınmış proje veya dışarıdan ücretli geliştirme
  desteği diskalifiye riski taşır.
- AI araçlarının kullanımı serbesttir; ancak ortaya çıkan ürün ve kararların
  sorumluluğu takımdadır.
- GitHub repository public olmalıdır.
- Commit geçmişi, ilk/son commit ve projenin altı haftalık gelişimi incelenebilir.
- Ürün, Scrum süreci ve sprint ilerlemeleri GitHub içinde belgelenmelidir.
- Son teslim gecikmesi kabul edilmez.
- Final video YouTube'a yüklenmiş ve en fazla 3 dakika olmalıdır.
- Canlı deploy opsiyonel olsa da ürün canlıya alınabilir biçimde geliştirilmiş
  olmalıdır; mümkünse canlı link sunulmalıdır.
- Product Owner ve Scrum Master dahil tüm ekip üyelerinin ürün geliştirmeye
  katkı vermesi beklenir.

### 4.2 Her sprint sonunda zorunlu 6 kanıt

| Zorunlu başlık | Minimum kabul edilebilir kanıt | BuildPixies standardı |
| --- | --- | --- |
| Backlog dağıtma mantığı | Neden bu story'ler seçildi, puan hedefi | Story/puan/owner/dependency/taşınan iş tablosu |
| Daily Scrum notları | Yazılı özet veya iletişim kanıtı | Tarihli kısa metin + redakte edilmiş ekran görüntüsü bağlantısı |
| Sprint Board Updates | Miro/ClickUp/Jira/Asana/GitHub Projects screenshot | Sprint başı, orta ve son board görüntüsü |
| Ürün Durumu | Çalışan ürün ekran görüntüleri | Caption, tarih, ilgili story ve mümkünse canlı URL |
| Sprint Review | Yapılanlar, yapılmayanlar, kararlar, katılımcılar | Demo sonucu, test sonucu, taşınan işler ve katılımcı listesi |
| Sprint Retrospective | İyi gidenler, sorunlar, aksiyonlar | Owner ve hedef tarih atanmış aksiyonlar |

Bu altı madde tamamlanmazsa mezuniyet mümkün olsa bile Top 10/ilk 3 şansı
ciddi biçimde kaybolur. Top 10 seçimi ürün ve proje yönetimi puanlarının birlikte
değerlendirilmesiyle yapılır.

### 4.3 Final teslim paketi

- Public GitHub repo,
- eksiksiz ürün/takım/backlog bilgisi,
- Sprint 1, 2 ve 3'ün altışar zorunlu kanıtı,
- çalışan ürün veya doğrulanmış deploy-ready paket,
- maksimum 3 dakikalık YouTube videosu,
- ürün teslim formundaki tüm alanlar,
- varsa canlı ürün URL'si,
- final README ve teknik mimari açıklaması.

---

## 5. Resmî Takvim ve İç Kontrol Kapıları

### 5.1 Resmî Bootcamp takvimi

| Tarih | Resmî etkinlik | BuildPixies açısından anlamı |
| --- | --- | --- |
| 12 Haziran 2026 | Takımların açıklanması | Takım iletişimi ve rol hazırlığı |
| 19 Haziran 2026 | Sprint 1 başlangıcı | Fikir, takım, repo ve ürün temeli |
| 5 Temmuz 2026 | Sprint 1 bitişi | İlk altı Scrum kanıtı |
| 6 Temmuz 2026, 20:00 | Sprint 2 başlangıcı ve soru-cevap | Çalışan MVP sprinti |
| 19 Temmuz 2026 | Sprint 2 bitişi | Çalışan ürün + ikinci kanıt paketi |
| 20 Temmuz 2026, 20:00 | Sprint 3 başlangıcı ve soru-cevap | Final polish, deploy, video, teslim |
| 2 Ağustos 2026, 23:59 | Kesin ürün teslimi | Geç teslim yok |
| 14 Ağustos 2026 | Planlanan Top 10 sunumu | Tarih değişebilir; seçilenlere format iletilecek |

### 5.2 Takım içi daha erken kapılar

| İç tarih | Kapı | Geçiş şartı |
| --- | --- | --- |
| 16 Temmuz | Plan ve gerçeklik reseti | Master plan, owner önerileri, P0 scope |
| 17 Temmuz 12:00 | Board hygiene | Story'ler açık/kapalı doğru, owner ve sprint belli |
| 18 Temmuz 18:00 | Sprint 2 code freeze | P0 kodu merge, kalite zinciri yeşil |
| 19 Temmuz 15:00 | Sprint 2 evidence freeze | README, board, screenshots, daily, review/retro hazır |
| 19 Temmuz 20:00 | Sprint 2 kapanış | `main` temiz, kanıt paketi kontrol edildi |
| 20 Temmuz 20:00 | Sprint 3 planning | Akademi soru-cevap çıktıları plana işlendi |
| 25 Temmuz 20:00 | Core feature freeze | Yeni ana özellik yok; yalnız eksik P0 ve bug |
| 28 Temmuz 20:00 | Release Candidate 1 | Canlı deploy/smoke, demo project, kritik E2E |
| 30 Temmuz 20:00 | Evidence ve README freeze | Final screenshotlar, mimari, kriter eşleme |
| 31 Temmuz 20:00 | Video script freeze | 3 dakikalık storyboard ve prova |
| 1 Ağustos 18:00 | Submission candidate | Video yüklenmiş, link incognito doğrulanmış |
| 2 Ağustos 18:00 | İç teslim | Form gönderilmiş olmalı |
| 2 Ağustos 23:59 | Resmî son an | Yalnız acil tampon; normal iş planı değildir |

### 5.3 Scope freeze kuralı

- 25 Temmuz'dan sonra yeni P1 başlanmaz.
- 28 Temmuz'dan sonra yeni özellik başlanmaz.
- Son beş gün; deploy, doğrulama, erişilebilirlik, kanıt, video ve bug içindir.
- “Jüri puanı getirir” gerekçesi tek başına özellik eklemek için yeterli değildir;
  özellik ana kullanıcı yolculuğuna ve ölçülebilir kanıta bağlanmalıdır.

---

## 6. Takım, Roller ve Çalışma Modeli

### 6.1 Repo üzerinde görünen takım

| Kişi | Scrum rolü | Önerilen ana sorumluluk | Kanıtlanan katkı / not |
| --- | --- | --- | --- |
| Muhammed Köseoğlu | Product Owner | Ürün vizyonu, UX kabulü, backlog önceliği, demo hikâyesi | Repo/ürün koordinasyonu |
| Alperen Avan | Scrum Master | Sprint ritmi, board, blocker, kanıt paketi, release checklist | Repo owner/iletişim |
| Kemal Ersin Özkan | Developer | Frontend, AI pipeline, entegrasyon, kalite | Resmî profil bağlantısı README'de tamamlanmalı |
| Selin Akkaş | Developer | Output deneyimi, export/regenerate, frontend kalite | PR #11 merge edilmiş katkı |

> Bu sorumluluk dağılımı master plan önerisidir. Resmî ekip bilgi formundaki
> roster, rol ve iletişim sorumluları bir sonraki takım sync'inde doğrulanmalı.
> Kılavuz ideal olarak 5 kişilik takımdan söz eder; bilgilendirme toplantısı,
> eksik üyelerle devam edilebileceğini açıklar. Repo gerçeği dört kişidir ve
> farklı gösterilmemelidir.

### 6.2 Herkesin ortak sorumluluğu

- Her üye ürün geliştirme sürecine aktif katkı verir.
- Her story'nin tek bir accountable owner'ı olur; destekçiler ayrıca yazılır.
- Blocker 24 saatten uzun saklanmaz; aynı gün kanala yazılır.
- PR açan kişi kabul kriteri ve test kanıtı ekler.
- Reviewer yalnız kod stilini değil kullanıcı sonucu ve dokümantasyon etkisini
  kontrol eder.
- Sprint sonunda kanıt işi yalnız Scrum Master'a bırakılmaz; herkes kendi
  çalışmasının kanıtını teslim eder.

### 6.3 Önerilen RACI

| İş | PO | SM | Dev-Kemal | Dev-Selin |
| --- | --- | --- | --- | --- |
| Ürün anlatısı ve kabul kriterleri | A/R | C | C | C |
| Board ve sprint kanıtı | C | A/R | R | R |
| Landing/sample deneyimi | A | C | C | R |
| Progressive generation backend | C | C | A/R | C |
| Workspace/Command Center | A | C | R | R |
| AI prompt/schema/reliability | C | C | A/R | C |
| Deploy/Supabase smoke | C | A | R | R |
| E2E/CI/quality gate | C | C | A/R | R |
| README ve final teslim | R | A/R | C | C |
| Video ve demo provası | A/R | R | C | C |

`A`: accountable, `R`: responsible, `C`: consulted. Dağılım takım sync'inde
değiştirilebilir; değişiklik bu tabloya ve board'a işlenir.

### 6.4 Scrum ritmi

| Etkinlik | Sıklık | Süre | Çıktı |
| --- | --- | --- | --- |
| Async Daily | Her gün | 5–10 dk | Dün/bugün/blocker/kanıt |
| Kısa teknik sync | Gerektiğinde | 15 dk | Interface ve dependency kararı |
| Mid-sprint review | Sprint ortası | 30 dk | Scope ve risk düzeltmesi |
| Sprint Review | Sprint sonu | 45 dk | Çalışan demo, test, tamamlanan/taşınan iş |
| Retrospective | Sprint sonu | 30 dk | En fazla 3 aksiyon, owner, tarih |
| Evidence closeout | Sprint sonu | 30 dk | README altı madde doğrulaması |

### 6.5 Git ve PR standardı

- Branch: `feat/bp-031-progress-events`, `fix/bp-039-deploy-smoke` gibi.
- Commit mesajları kısa ve İngilizce: `Add progress events`, `Refine command center`.
- Her commit tek mantıksal değişiklik taşır.
- PR açıklamasında story, kullanıcı sonucu, testler, screenshot ve risk bulunur.
- Secret, `.env.local`, kullanıcı verisi veya ham private mesaj commit edilmez.
- `main` merge öncesi lint, typecheck, build ve ilgili E2E geçer.
- Merge sonrası CI sonucu ve ilgili issue güncellenir/kapatılır.

---

## 7. Ürün Vizyonu ve Stratejik Konumlandırma

### 7.1 Ürün tanımı

BuildPixies, fikri olan fakat bu fikri uygulanabilir bir MVP planına nasıl
dönüştüreceğini bilmeyen kullanıcılar için web tabanlı bir **AI Product
Planning & MVP Builder Workspace**'tir.

### 7.2 Problem

Yeni başlayan ekipler ve solo builder'lar çoğunlukla fikir eksikliğinden değil,
karar eksikliğinden zorlanır:

- problem ve hedef kullanıcı bulanıktır,
- MVP kapsamı sürekli büyür,
- product, UX, tech ve delivery kararları birbirinden kopuktur,
- backlog ve acceptance criteria üretilemez,
- ilk sprintte ne yapılacağı belli değildir,
- bootcamp/hackathon teslim belgeleri son güne kalır,
- genel amaçlı chatbot cevapları uzun fakat eyleme dönük olmayabilir.

### 7.3 Çözüm

Kullanıcı dağınık fikrini girer. Uzman rollerdeki pixie pipeline:

1. eksik bilgileri ve guardrail'leri çıkarır,
2. product brief ve pazar açısını kurar,
3. MVP scope'u sınırlar,
4. UX ve teknik planı üretir,
5. backlog, test ve sprint planını hazırlar,
6. README/delivery çıktısına dönüştürür,
7. kullanıcıya tek ekranda karar özeti ve sonraki aksiyonları gösterir.

### 7.4 Doğru kategori

> **AI Product Planning & MVP Builder Workspace**
> Alt kategori: **Idea-to-MVP assistant for bootcamp teams, junior builders and
> small product teams**

BuildPixies bir coding agent veya yalnız doküman üretici olarak
konumlandırılmamalıdır. Cursor, Copilot veya Replit gibi kod üretim araçlarıyla
aynı vaadi vermek yerine, onların öncesindeki ürün kararlarını hazırlar.

### 7.5 Core promise

> **Give us a messy idea. Get a decision-ready MVP blueprint.**

Türkçe karşılığı:

> **Dağınık fikrini ver; kapsamı, ilk sprinti ve sonraki adımları belli bir MVP
> blueprint'i al.**

### 7.6 Farklılaştırıcılar

- Tek genel cevap yerine uzman rol ve bağımlılık sıralı orchestration,
- must-have / later / out-of-scope karar disiplini,
- product, UX, tech, QA ve delivery'nin aynı blueprint'te birleşmesi,
- Bootcamp/Hackathon için gerçek ilerleme notlarından source-grounded teslim
  paketi,
- section bazlı revizyon, export ve proje persistence,
- beginner-friendly pixie metaforu,
- “daha çok özellik” yerine uygulanabilir ilk sprint üretimi.

### 7.7 Kapsam dışı

- Tam otomatik production kodu üretmek,
- GitHub'a kullanıcı izni olmadan kod push etmek,
- Jira/Notion yerine tam proje yönetim platformu olmak,
- gerçek kullanıcı araştırması yapılmadan pazar gerçeği icat etmek,
- yapılmamış sprint işlerini yapılmış gibi belgelemek,
- ücretsiz router üzerinde production SLA vaat etmek,
- son teslim öncesi kapsamı mobil uygulamaya genişletmek.

### 7.8 Ürün ilkeleri

1. **Proof before promise:** İddia gerçek örnekle gösterilir.
2. **Progress before waiting:** Uzun iş görünür ve kademeli ilerler.
3. **Decisions before documents:** Önce karar özeti, sonra detay sekmeleri.
4. **Honest AI:** Kullanılan mimari ve fallback açıkça anlatılır.
5. **Action over volume:** Kullanıcı sonraki 3 işi bilir.
6. **Cute but credible:** Pixie dili erişilebilirlik sağlar; profesyonel
   kullanışlılığı gölgelemez.
7. **Evidence is part of Done:** Bootcamp kanıtı geliştirme işinin parçasıdır.

---

## 8. Hedef Kullanıcılar, JTBD ve Kullanıcı Değeri

### 8.1 Birincil persona — Bootcamp/Hackathon Builder

| Alan | Tanım |
| --- | --- |
| Bağlam | 2–5 kişilik ekip, kısıtlı zaman, farklı teknik seviyeler |
| Ana problem | Fikir var; scope, backlog, rol dağılımı ve teslim planı yok |
| Kaygı | Son gün çalışan ürün ve belgeleri yetiştirememek |
| Başarı | İlk sprint görevleri, acceptance criteria, demo ve README planı hazır |
| Satın alma/kullanma motivasyonu | Zaman kazanmak, boş sayfa korkusunu aşmak, takım hizalamak |

**JTBD:**

> Bir bootcamp fikrini seçtiğimde, ekibimin aynı hedefte çalışabilmesi ve teslim
> gününde kaos yaşamamak için fikri doğrulanabilir MVP kapsamına ve sprint
> planına çevirmek istiyorum.

### 8.2 İkincil persona — Solo Founder / Indie Hacker

| Alan | Tanım |
| --- | --- |
| Bağlam | Tek kişi veya çok küçük ekip; fikir çok, zaman az |
| Ana problem | Fikirleri karşılaştırma ve MVP sınırı çizme |
| Başarı | Problem, hedef kullanıcı, MVP, teknik yaklaşım ve ilk 2 sprint net |

**JTBD:**

> Yeni bir ürün fikrini düşündüğümde, kodlamaya başlamadan önce yanlış şeyi
> inşa etme riskini azaltmak için en küçük uygulanabilir planı görmek istiyorum.

### 8.3 Üçüncül persona — Junior Developer / Freelancer

**JTBD:**

> Belirsiz bir müşteri fikri aldığımda, beklentiyi yönetebilmek ve işi tahmin
> edebilmek için onu scope, user story, teknik plan ve test checklist'ine
> dönüştürmek istiyorum.

### 8.4 Kullanıcı yolculuğu başarı sinyalleri

- İlk fikir girişinde örnek veya yönlendirme kullanabilme,
- Eksik bilgi varsa bunu görünür biçimde görebilme,
- Üretim sırasında hangi kararın hazırlandığını anlayabilme,
- Overview ekranından MVP'yi 60 saniyede okuyabilme,
- İlk sprint görevlerini kopyalayabilme/indirebilme,
- Bir bölümü yeniden üretebilme veya daha küçük/teknik hale getirebilme,
- Bootcamp goal seçildiyse delivery pack'e geçebilme.

---

## 9. Lean Canvas ve Pazar Hipotezi

Bu tablo doğrulanmış pazar gerçeği değil, test edilecek ürün hipotezidir.

| Lean Canvas alanı | BuildPixies hipotezi |
| --- | --- |
| Problem | Fikirden scope/backlog/teknik plana geçiş dağınık; genel chatbot cevapları uygulanabilir sıraya dönüşmüyor |
| Mevcut alternatifler | ChatGPT/benzeri genel asistanlar, Notion şablonları, manuel Jira/Miro planı, mentor/freelancer desteği |
| Müşteri segmenti | Önce bootcamp/hackathon ekipleri; sonra solo founder ve junior freelancer |
| Early adopter | Teslim tarihi yaklaşan, fikri olan fakat backlog/README/sprint planı olmayan ekip |
| Unique value proposition | “Messy idea → decision-ready MVP blueprint + first sprint” |
| Çözüm | Guided intake, pixie orchestration, progressive output, command center, delivery export |
| Kanallar | Bootcamp toplulukları, GitHub, LinkedIn ürün demosu, öğrenci/hackathon toplulukları |
| Gelir hipotezi | Freemium sample/quick blueprint; ücretli sabit model, takım workspace'i ve export entegrasyonları |
| Maliyet | LLM inference, Supabase, Vercel, log/monitoring, destek |
| Ana metrik | Başlatılan fikirden export edilen blueprint oranı |
| Erken metrikler | Landing→wizard, wizard→generate, generate→overview, overview→export/regenerate |
| Savunulabilirlik | Bootcamp odaklı workflow bilgisi, yapılandırılmış karar şemaları, project memory, takım delivery paketi |

### 9.1 Doğrulama planı

- En az 3 hedef kullanıcıyla 15 dakikalık test yapılacak.
- Kullanıcıya ürün anlatılmadan landing gösterilecek.
- Kullanıcıdan “Bu ürün ne yapıyor?” cevabı alınacak.
- Örnek proje açtırılacak ve ilk üç aksiyonu bulması istenecek.
- “Hangi çıktıyı gerçekten kullanırdın?” sorusu sorulacak.
- Sonuçlar tarihli notlarla `docs/evidence/user-testing/` altında tutulacak.
- 27 Temmuz'a kadar en az 3 gözlem ve 3 somut değişiklik kararı çıkarılacak.

---

## 10. Mevcut Deneyim Denetimi

| Sorun | Kod/ürün kanıtı | Kullanıcı etkisi | Karar |
| --- | --- | --- | --- |
| “View Demo” gerçek demo değil | Hero CTA `/#features` bağlantısına gidiyor | İddia kanıtlanmıyor | Curated sample blueprint'e bağla |
| Doğrulanmamış sosyal kanıt | “Loved by 1,000+ creators” metni | Güven zedelenir | Gerçek metrik oluşana kadar kaldır |
| Plan/gerçeklik farkı | Eski plan olmayan `output-preview.tsx` dosyasını Done gösteriyor | Yanlış tamamlanma algısı | Backlog durumlarını yeniden denetle |
| Tüm pixie'ler aynı anda thinking | UI generate başında tüm statüleri değiştiriyor | Orchestration tiyatro gibi görünür | Gerçek job event'lerine bağla |
| Sonuç yalnız finalde açılıyor | Polling `succeeded/failed` bekliyor | 252 saniye boş bekleme | Partial blueprint + event polling |
| Çıktı aşırı parçalı | 11 yatay tab | Bilgi yükü, öncelik kaybı | Overview + 4 çıktı grubu |
| Yanlış panel başlığı | Tüm Output Hub “MVP Scope” başlığı altında | Information scent bozuk | “Blueprint”/aktif bölüm başlığı |
| Bootcamp Mode ana akışa yapışık | Workspace altında sürekli büyük form | Ürün kategorisi karışır | Goal-aware Delivery Pack alanı |
| Dashboard yalnız kart listesi | Next action/son aktivite yok | Proje yönetimi hissi zayıf | Project health + next action |
| Sign In bilgi mimarisi belirsiz | Anonymous session var, CTA beklenti yaratıyor | Auth vaadi anlaşılmıyor | Gerçek auth hazır değilse doğru etiketle |
| Tasarım ürünün önünde | Asset referansları birebir uygulandı | Güzel ama jenerik SaaS hissi | Tasarım kabulünü kullanıcı sonucuna bağla |

### 10.1 Korunacak güçlü alanlar

- Tutarlı indigo/pink/gold tasarım sistemi,
- responsive temel grid,
- guided wizard yapısı,
- pixie rol metaforu,
- strict output schemas,
- section regenerate/export,
- durable generation job modeli,
- Bootcamp Mode'un source-grounded etik yaklaşımı,
- E2E ve CI kalite kapısı.

---

## 11. Product Experience Reset

### 11.1 Hedef ana akış

```text
Landing
  → Gerçek örnek blueprint
  → Guided idea intake
  → Idea review / eksik bilgi
  → Progressive pixie generation
  → MVP Command Center
  → Detail groups
  → Refine / Export / Delivery Pack
```

### 11.2 Aşama bazlı deneyim

| Aşama | Kullanıcının sorusu | Ürünün cevabı |
| --- | --- | --- |
| Landing | “Bu ne?” | Dağınık fikir ile karar verilmiş blueprint'i yan yana göster |
| Sample | “Sonuç neye benziyor?” | Tıklanabilir gerçek curated proje |
| Intake | “Ne yazmalıyım?” | Örnek fikirler, kalite ipucu, oluşacak çıktılar |
| Review | “Eksik bir şey var mı?” | Audience, platform, goal, constraints ve eksik bilgiler |
| Generation | “Sistem ne yapıyor?” | Gerçek pixie, bölüm, durum ve tamamlanan çıktılar |
| Overview | “Bana ne önerdi?” | Problem, kullanıcı, 3 must-have, 3 out-of-scope, risk, ilk sprint |
| Detail | “Neden/nasıl?” | Product, Experience, Build, Delivery grupları |
| Action | “Şimdi ne yapacağım?” | İlk 3 görev, refine, export, share |

### 11.3 MVP Command Center

İlk açılan sonuç ekranı aşağıdakileri göstermelidir:

- Blueprint readiness ve son güncelleme,
- tek cümlelik ürün vaadi,
- ana problem ve birincil kullanıcı,
- 3 must-have feature,
- 3 out-of-scope kararı,
- önerilen ilk sprint hedefi,
- en büyük 3 ürün/teknik risk,
- eksik bilgiler,
- “Start here” ilk 3 backlog item,
- `Refine`, `Copy first sprint`, `Download`, `Open details` aksiyonları.

Bu overview mümkün olduğunca mevcut structured output verilerinden türetilmeli;
yalnız overview için ek ve pahalı bir AI çağrısı zorunlu olmamalıdır.

### 11.4 Progressive generation

İlk iterasyonda SSE zorunlu değildir. Mevcut polling genişletilecektir:

1. Generation job; `events`, `partialBlueprint`, `currentSection` ve
   `completedSections` taşıyacak.
2. Orchestrator `thinking`, `done`, `failed` event'lerini gerçek section ile
   job store'a yazacak.
3. Section tamamlandığında partial çıktı atomik şekilde job'a kaydedilecek.
4. Poll endpoint partial state'i döndürecek.
5. UI yalnız gerçek aktif pixie'yi “working” gösterecek.
6. Tamamlanan section anında açılacak.
7. Hata olursa tamamlanan işler korunacak; retry veya resume kararı görünür
   olacak.
8. Durable queue ve local fallback aynı event contract'ını kullanacak.

SSE ancak polling contract'ı stabil ve zaman uygunsa P1 optimizasyon olarak
eklenir.

### 11.5 Çıktı gruplama

| Grup | Mevcut bölümler |
| --- | --- |
| Overview | Mevcut section'ların türetilmiş karar özeti |
| Product | Orchestration Plan, Product Brief, Market Analysis, MVP Scope |
| Experience | UX Flow |
| Build | Tech Plan, Code Skeleton, Test Plan |
| Delivery | Backlog, Sprint Plan, README |

### 11.6 Refine aksiyonları

P1 kapsamında section bazlı kontrollü komutlar:

- Make the MVP smaller,
- Make this more technical,
- Adapt this for a 2-person team,
- Adapt this for Bootcamp delivery,
- Explain why this decision was made,
- Regenerate with feedback.

Free-form chat ilk sürüm için gerekli değildir. Kontrollü aksiyonlar daha iyi
ölçülebilir, test edilebilir ve schema-safe olur.

---

## 12. Bilgi Mimarisi ve Ekran Spesifikasyonları

### 12.1 Önerilen route yapısı

```text
/
/sample
/dashboard
/projects/new
/projects/[id]
/projects/[id]/delivery
/projects/[id]/settings          (P2)
```

### 12.2 Landing Page

**Amaç:** Ürünü 5 saniyede anlatmak ve 30 saniyede kanıtlamak.

**Zorunlu bloklar:**

1. Navbar: Product, How it works, Sample blueprint, Start building.
2. Hero: tek problem, tek vaat, iki gerçek CTA.
3. Before/After: ham fikir ve Command Center sonucu.
4. Interactive sample: Product/Build/Delivery'den küçük gerçek kesitler.
5. “How it works”: Idea → Pixies decide → Action plan.
6. Pixie roles: isim değil, aldığı karar ve ürettiği çıktı.
7. Bootcamp use case: ana segment için somut delivery pack.
8. Trust: GitHub, structured outputs, privacy yaklaşımı; sahte kullanıcı sayısı yok.
9. Final CTA: “Create my MVP blueprint”.

**Kabul:**

- `View sample blueprint` gerçek `/sample` veya curated project'e gider.
- “1,000+ creators” kaldırılır veya gerçek analitik kanıtı olmadan kullanılmaz.
- Mobile 390 px ve desktop 1440 px screenshot alınır.
- Hero metni ürün kategorisini “AI product planning” olarak açıklar.

### 12.3 Sample Blueprint

**Amaç:** AI beklemeden ürün değerini göstermek ve demo güvenliği sağlamak.

- Curated, kaliteli, sabit bir university project planner örneği kullanılır.
- `Sample` etiketi görünür; gerçek kullanıcı projesi gibi sunulmaz.
- Command Center ilk açılır.
- Product/Experience/Build/Delivery grupları gezilebilir.
- CTA, örneği kendi fikriyle yeniden başlatır.
- Sample veri uygulama sürümüyle schema uyumlu tutulur ve E2E ile doğrulanır.

### 12.4 New Project Wizard

**Amaç:** Kullanıcıdan minimum fakat yeterli bağlam almak.

**Adımlar:**

1. Idea: büyük textarea, 3 örnek fikir, karakter sayısı değil kalite ipucu.
2. Audience: kim, hangi bağlam, en büyük problem.
3. Goal: Bootcamp, Startup MVP, Client, Portfolio, Hackathon.
4. Platform: Web, Mobile, Extension, AI Tool, Marketplace, Desktop.
5. Constraints: timeline, team size, budget/stack tercihi, output depth.
6. Review: girilen bilgiler ve oluşacak çıktılar.

**Kabul:**

- Hata yalnız submit anında değil ilgili adımda gösterilir.
- Back/forward veri kaybetmez.
- Quick sample ile form doldurulabilir.
- Submit sonrası project URL oluşur ve generation kullanıcı aksiyonuyla başlar.

### 12.5 Workspace — Generation State

**Üst alan:** Project title, goal, status, last saved.
**Sol alan:** Fikir özeti ve constraints.
**Orta alan:** Gerçek sıraya göre pixie timeline.
**Ana alan:** Aktif/bitmiş section preview.
**Alt/yan aksiyon:** Cancel desteklenmiyorsa sahte cancel gösterilmez; retry/resume
gerçek davranışa bağlanır.

Her pixie kartı:

- rol,
- yaptığı gerçek iş,
- status,
- ilgili section,
- tamamlanma zamanı,
- açılabilir output bağlantısı göstermelidir.

### 12.6 Workspace — Ready State

- Command Center default görünüm,
- grouped navigation,
- active section başlığı,
- section regenerate ve refine,
- autosave durumu,
- export aksiyonları,
- hata/eksik bilgi göstergeleri.

### 12.7 Dashboard

Her proje kartında:

- proje adı ve one-liner,
- goal/platform,
- status,
- blueprint readiness,
- son aktivite,
- **next action**,
- açık proje butonu.

Boş state tek CTA ve bir sample linki içermelidir. Junk/test projeleri final
screenshot ve canlı demo ortamından temizlenmelidir.

### 12.8 Delivery Pack / Bootcamp Mode

Bootcamp Mode ana workspace altındaki sürekli form olmak yerine ayrı ve goal-aware
bir alana taşınacaktır.

**Girdiler:** Sprint name, sprint goal, factual progress notes, evidence links.
**Çıktılar:** Daily summary, product status, Sprint Review, Retrospective,
backlog update explanation, README sprint section, missing information.
**Etik kural:** Yapılmamış iş veya var olmayan evidence üretilemez.
**Kabul:** Eksik bilgi açıkça işaretlenir; source notes kaybolmaz; Markdown copy
ve download çalışır.

### 12.9 Responsive ve erişilebilirlik

- 390×844, 768×1024 ve 1440×1000 viewport doğrulanır.
- Klavye ile wizard, tabs/navigation ve action buttons kullanılabilir.
- Focus görünürdür.
- Kontrast kritik metinlerde WCAG AA hedefler.
- Loading yalnız renk/animasyonla anlatılmaz; metin ve `aria-live` kullanılır.
- `prefers-reduced-motion` korunur.
- Uzun AI içeriği taşma ve yatay scroll üretmez.
- Form error'ları alanla programatik ilişkilidir.

---

## 13. AI Ürün Mimarisi ve Pixie Orkestrasyonu

### 13.1 Mevcut gerçek mimari

BuildPixies bugün OpenAI-compatible chat completions üzerinde çalışan,
bağımlılık koruyan **role-based prompt pipeline** kullanır. Bu, uzman roller ve
orchestration içeren gerçek bir AI uygulamasıdır; ancak belirli bir Agents SDK
handoff sistemi değildir. Jüri anlatısında bu ayrım korunmalıdır.

### 13.2 Pixie ve output eşlemesi

| Pixie | Rol | Output / karar |
| --- | --- | --- |
| Pip | Orchestrator | Orchestration plan, missing information, sequence, guardrails |
| Pria | Product | Product brief ve MVP scope |
| Moxie | Market | Competitors, positioning, differentiation, market risk |
| Luma | UX | Journey, screens, actions, empty/error states |
| Tinker | Tech | Stack, architecture, tables, API routes, risk |
| Bitsy | Code | File tree, starter tasks, conventions |
| Bugsy | QA | Happy path, edge case, security, demo checklist |
| Sprinta | Scrum | Backlog ve sprint plan |
| Quill | Docs | README / delivery documentation |

### 13.3 Pipeline bağımlılıkları

```text
Pip: orchestration plan
  ├─ Pria: product brief
  ├─ Moxie: market analysis
  ├─ Pria/Luma/Tinker: scope + UX + tech
  ├─ Bitsy/Bugsy/Sprinta: code + tests + backlog
  ├─ Sprinta: sprint plan
  └─ Quill: README
```

Bağımsız işler batch halinde çalışır; sonraki aşamalar önceki structured
output'ları context olarak kullanır.

### 13.4 Sağlayıcı stratejisi

1. `OPENROUTER_API_KEY` varsa OpenRouter tercih edilir.
2. Varsayılan model `openrouter/free` düşük maliyetli demo/geliştirme içindir.
3. OpenRouter yok, `OPENAI_API_KEY` varsa OpenAI-compatible fallback çalışır.
4. İki key de yoksa deterministic sample fallback kullanılır.
5. Sample çıktılar UI ve videoda `Sample` olarak etiketlenir.

### 13.5 Mevcut dayanıklılık

- Provider timeout,
- `Retry-After` uyumlu 429/5xx retry,
- OpenRouter için varsayılan 4 retry,
- JSON fence normalization ve parsing,
- strict Zod section schemas,
- geçersiz structured output için bir section retry,
- güvenli client error mesajı,
- provider/status/error type/request id içeren secret-safe log,
- data collection varsayılan `deny`,
- parameter support zorunluluğu,
- generation route'larında geniş max duration.

### 13.6 Sprint 3 AI kanıt hedefi

Jüriye “AI var” demek yerine aşağıdaki teknik kanıt gösterilir:

- rol ve prompt sorumluluk tablosu,
- pipeline dependency diagram,
- schema örneği,
- provider routing kararı,
- retry/validation/guardrail örneği,
- project blueprint persistence,
- regenerate sırasında previous output context kullanımı,
- per-pixie event/trace kaydı,
- sample fallback ile gerçek AI ayrımı.

### 13.7 Agents SDK ve vector memory kararı

- Belirli bir SDK kullanmak Bootcamp kılavuzunda zorunlu değildir.
- Agents SDK migration yalnız ürün kararlılığını düşürmeden somut handoff/tracing
  değeri üretiyorsa yapılır.
- `pgvector` yalnız semantic retrieval ihtiyacı kanıtlanırsa eklenir.
- Kısa vadede project blueprint, previous outputs ve decision log tablosu daha
  anlamlı memory kanıtıdır.
- Sırf puan için kullanılmayan teknoloji eklenmez; kılavuz amaç dışı eklenen
  özelliklerin puan getirmeyeceğini açıkça belirtir.

---

## 14. Teknik Mimari ve Veri Akışı

### 14.1 Güncel stack

| Katman | Teknoloji |
| --- | --- |
| Framework | Next.js 16.2.10 App Router |
| Runtime | Node.js >=24.15.0, TypeScript, React 19 |
| UI | Tailwind CSS v4, Base UI/shadcn patterns, Motion, Lucide |
| Validation | Zod 4 strict request/output schemas |
| AI client | OpenAI Node SDK üzerinden OpenRouter/OpenAI-compatible API |
| Database/Auth | Supabase Postgres, anonymous auth, owner RLS |
| Background work | Vercel Queue + generation jobs + lease/retry |
| Local fallback | `.local/*.json` namespaced store |
| Tests | ESLint, TypeScript, Next build, Playwright, Supabase SQL tests |
| CI | GitHub Actions Quality workflow |

### 14.2 Ana veri akışı

```text
Browser
  → POST /api/projects
  → Project persisted (Supabase or local store)
  → POST /api/generation-jobs
  → Job created
  → Vercel Queue worker OR Next after() local runner
  → AI orchestration batches
  → strict section validation
  → partial events/outputs (planned)
  → atomic blueprint + job completion
  → GET /api/generation-jobs/:id polling
  → Command Center / Output groups
  → regenerate / export / delivery pack
```

### 14.3 Temel veri varlıkları

| Varlık | Ana alanlar | Durum |
| --- | --- | --- |
| Project | id, owner, raw idea, goal, platform, audience, constraints, status, blueprint | Done |
| GenerationJob | id, project, status, generation input, blueprint/error, attempts, lease | Done |
| BootcampReport | source notes, sprint metadata, structured report | Done |
| RateLimit | owner/bucket/window/count | Done |
| GenerationEvent | pixie, section, status, timestamp, safe message | Planned P0 |
| PartialBlueprint | completed sections during job | Planned P0 |
| DecisionMemory | accepted/rejected decisions and rationale | Planned P2 |

### 14.4 API envanteri

| Endpoint | Amaç | Koruma/Not |
| --- | --- | --- |
| `GET /api/projects` | Proje listesi | Owner-aware storage |
| `POST /api/projects` | Proje oluştur | Zod + rate limit |
| `GET /api/projects/:id` | Proje detayı | Owner/RLS |
| `POST /api/generation-jobs` | Async blueprint başlat | 300s, rate limit, durable/local runner |
| `GET /api/generation-jobs/:id` | Job poll | Owner-aware |
| `POST /api/queues/generate-blueprint` | Queue callback | Node runtime, retry/lease |
| `POST /api/generate-blueprint` | Senkron/uyumluluk üretimi | 300s; ana UI job endpoint kullanır |
| `POST /api/regenerate-output` | Tek section regenerate | 120s, strict validation |
| `POST /api/bootcamp-report` | Source-grounded delivery report | 120s, ayrı rate limit |
| `POST /api/export-readme` | Markdown export | Request validation |
| `POST /api/export-json` | JSON export | Request validation |

### 14.5 Mimari kalite hedefleri

- Route handler yalnız HTTP sınırını yönetir; domain logic `lib/` içinde kalır.
- Request ve provider output aynı schema değildir; ikisi ayrı doğrulanır.
- Server-only key hiçbir `NEXT_PUBLIC_` değişkeninde bulunmaz.
- Storage adapter local ve Supabase davranışını aynı contract'ta tutar.
- Worker idempotent olmalıdır.
- Partial event geliştirmesi durable/local runner davranışını ayırmamalıdır.
- Error log kullanıcı girdisini, token'ı veya API key'i içermemelidir.

---

## 15. Güvenlik, Gizlilik, Maliyet ve Dayanıklılık

### 15.1 Güvenlik baseline

- API key'ler server-only environment'ta,
- `.env.local` Git ignore altında,
- anonymous Supabase user + `owner_id` RLS,
- service role yalnız server tarafında,
- Zod ile body/size validation,
- rate-limited AI endpoints,
- generic upstream error,
- CI'da deterministic AI fallback,
- production ortamında local store kapalı olmalı,
- secret scanning final checklist'in parçası.

### 15.2 OpenRouter privacy kararı

- Varsayılan provider preference `data_collection: deny`.
- `OPENROUTER_ALLOW_DATA_COLLECTION=1` yalnız açık veri etkisi kararıyla açılır.
- Demo girdilerinde kişisel veri kullanılmaz.
- Final videoda API key, browser devtools secret veya kişisel proje gösterilmez.

### 15.3 Maliyet ve kota

- Free router geliştirme ve düşük trafik demo için uygundur; availability ve
  latency değişkendir.
- Bir blueprint bugün 11 completion çağrısı üretmektedir.
- Tam canlı test 252 saniye sürmüş; demo sırasında sıfırdan tam üretim risklidir.
- Curated sample project final videonun ana güvenlik ağıdır.
- Canlı demoda gerçek üretim gösterilecekse sabit/predictable model ve küçük
  test bütçesi feature freeze öncesi kararlaştırılır.
- Public deploy için per-user quota ve Turnstile/CAPTCHA P1'dir.

### 15.4 Hata ve fallback ilkesi

| Hata | Kullanıcı davranışı | Sistem davranışı |
| --- | --- | --- |
| 429/5xx | “Provider busy, retrying” | Backoff/retry, sonra güvenli 503 |
| Invalid JSON/schema | “Output is being corrected” | İlgili section bir kez yeniden üret |
| Timeout | Tamamlanan section'ları koru | Job failed/resumable tasarımı |
| Queue unavailable | Açık status/error | Job fail + project status update |
| No AI key | Sample mode etiketi | Deterministic fallback |
| Storage unavailable | Projeyi kaydedemediğini söyle | Hosted ortamda fail closed |

---

## 16. Repo Gerçeklik Denetimi

### 16.1 Çalışan alanlar

| Alan | Durum | Kod/kanıt |
| --- | --- | --- |
| Landing/dashboard/wizard/workspace | Code Complete | `app/`, `components/` |
| Project create/list/detail | Done | API + storage + E2E |
| 11-section blueprint | Done | prompts, schemas, orchestrator, live smoke |
| OpenRouter integration | Done | client, env docs, live inference |
| AI retry/schema hardening | Done | commit `6176086`, CI success |
| Job + polling | Done | job routes/store/UI |
| Durable queue/lease | Code Complete | queue route, worker, migrations |
| Supabase RLS/rate limit | Code Complete | migrations + SQL test |
| Export/regenerate | Done | PR #11 + persistence hardening |
| Bootcamp Mode | Code Complete | UI/API/schema/persistence/export |
| E2E/CI | Done | 3 Playwright test, Quality workflow |
| Design system | Code Complete | assets referansları uygulanmış |

### 16.2 Partial veya eksik alanlar

| Alan | Gerçek durum | Sonraki karar |
| --- | --- | --- |
| Landing sample blueprint | Eski plan Done diyor; ilgili component yok | P0 gerçek sample oluştur |
| Per-pixie progress | UI status var, gerçek event yok | P0 partial events |
| Command Center | Yok | P0 |
| Output information architecture | 11 tab | P0 regroup |
| Bootcamp area separation | Ana workspace altında | P1 delivery route |
| Canlı Vercel deploy | Repo homepage boş, `.vercel` bağı yok | P0 Sprint 3 |
| Canlı Supabase smoke | Kod var, production kanıtı yok | P0 Sprint 3 |
| User testing | Kanıt yok | 3 test P1 |
| Final video | Yok | 31 Temmuz–1 Ağustos |
| Final screenshots | Sprint 1 görselleri eski tasarım | Sprint 2/3 yeniden çek |
| Sprint 2 README altı kanıt | Henüz ara güncelleme | 19 Temmuz zorunlu |
| Issue hygiene | “done” issue'lar açık | 17 Temmuz düzelt |
| Repo description | Eski “Dev-in-a-Box” anlatısı | Güncelle |
| Repo homepage | Boş | Deploy sonrası ekle |
| Team socials | Kemal/Selin bilgileri eksik olabilir | External confirmation |

### 16.3 Dokümantasyon tutarsızlıkları

- Eski plan üç kişilik takım gösteriyordu; README dört kişi gösteriyor.
- Eski plan `components/landing/output-preview.tsx` dosyasını var ve Done
  gösteriyordu; repo envanterinde böyle bir dosya yok.
- Sprint 1 belgesi eski remote adını içeriyor.
- README'de BP-002 Done işaretli; gerçek sample blueprint deneyimi yok.
- GitHub Issues #1–#10 “done” etiketi taşıdığı halde açık.
- Product screenshots yeni design rebuild sonrası güncellenmemiş.

Bu maddeler ürün hatası değilse bile değerlendirme sırasında güvenilirlik
zayıflatır ve Sprint 2 kapanışında düzeltilmelidir.

---

## 17. Master Product Backlog

Story point ölçeği: `1, 2, 3, 5, 8`. 8'den büyük iş bölünür. Owner atamaları
öneridir ve takım sync'inde kesinleşir.

### 17.1 Mevcut backlog gerçeklik özeti

| Aralık | Durum |
| --- | --- |
| BP-001–BP-028 | Çoğu kodlandı; BP-002, BP-008, BP-025 ve deploy/evidence yorumları yeniden açılmalı |
| BP-029–BP-050 | Product Experience Reset, production, evidence ve final teslim backlog'u |

### 17.2 Yeni ve revize backlog

| ID | Story / sonuç | P | SP | Durum | Sprint | Önerilen owner | Bağımlılık | Kanıt |
| --- | --- | ---: | ---: | --- | --- | --- | --- | --- |
| BP-001R | Landing ürünü 5 saniyede doğru anlatır | P0 | 3 | Planned | S2 | PO + Selin | Copy kararı | Desktop/mobile screenshot + 3 test |
| BP-002R | Gerçek sample blueprint görülebilir | P0 | 5 | Planned | S2 | Selin | Curated data | `/sample` E2E + screenshot |
| BP-008R | Pixie statüleri gerçek job event'lerinden gelir | P0 | 8 | Planned | S2–S3 | Kemal | Job event contract | API smoke + UI E2E |
| BP-025R | Partial outputs polling ile açılır; SSE opsiyonel | P0 | 8 | Planned | S3 | Kemal | BP-008R | Long-running E2E |
| BP-029 | Sahte sosyal kanıt ve ölü CTA kaldırılır | P0 | 1 | Planned | S2 | Selin | Yok | Link test + screenshot |
| BP-030 | Curated demo project schema-safe ve versiyonlu olur | P0 | 3 | Planned | S2 | PO + Selin | Output schema | Fixture validation |
| BP-031 | Job events ve partial blueprint persist edilir | P0 | 8 | Planned | S2–S3 | Kemal | Migration/store design | Unit/SQL/API test |
| BP-032 | Workspace gerçek timeline ve progressive output gösterir | P0 | 8 | Planned | S3 | Kemal + Selin | BP-031 | Playwright |
| BP-033 | MVP Command Center overview eklenir | P0 | 5 | Planned | S3 | PO + Selin | Curated mapping | UX acceptance + E2E |
| BP-034 | 11 tab, 4 anlamlı çıktı grubuna dönüşür | P0 | 5 | Planned | S3 | Selin | BP-033 | Responsive screenshot |
| BP-035 | Controlled refine aksiyonları eklenir | P1 | 5 | Planned | S3 | Kemal | Regenerate API | Schema test |
| BP-036 | Bootcamp Mode ayrı Delivery Pack alanına taşınır | P1 | 5 | Planned | S3 | Selin | Route/IA | Goal-aware E2E |
| BP-037 | Landing/wizard/workspace accessibility ve mobile polish | P0 | 5 | Planned | S3 | Selin | Core UI freeze | Keyboard/mobile test |
| BP-038 | Safe generation event/log observability | P1 | 3 | Planned | S3 | Kemal | BP-031 | Log sample, no secret |
| BP-039 | Vercel production deploy | P0 | 5 | Planned | S3 | SM + Kemal | Env/Supabase | Public URL + smoke |
| BP-040 | Production Supabase migration/auth/RLS smoke | P0 | 5 | Planned | S3 | SM + Kemal | Supabase project | Auth isolation evidence |
| BP-041 | Public quota + Turnstile/CAPTCHA kararı | P1 | 5 | Planned | S3 | Kemal | Deploy | Abuse test/ADR |
| BP-042 | Sprint screenshot/evidence klasörü ve naming standardı | P0 | 2 | Planned | S2 | SM | Team artifacts | Relative README links |
| BP-043 | Sprint 2 altı zorunlu README maddesi | P0 | 3 | Planned | S2 | SM + herkes | Evidence | README review |
| BP-044 | 3 dakikalık video, thumbnail ve doğrulanmış YouTube linki | P0 | 8 | Planned | S3 | PO + SM | RC1 | Incognito link check |
| BP-045 | Final submission form ve release checklist | P0 | 3 | Planned | S3 | SM | Video/deploy/README | Submission proof |
| BP-046 | GitHub issue/label/description/homepage hygiene | P0 | 2 | Planned | S2 | SM | Deploy URL kısmi | Board screenshot |
| BP-047 | En az 3 hedef kullanıcı testi | P1 | 3 | Planned | S3 | PO | RC UX | Tarihli bulgu tablosu |
| BP-048 | AI architecture/trace kanıt sayfası | P0 | 3 | Planned | S3 | Kemal + PO | Event logs | README diagram + demo |
| BP-049 | Decision memory tablosu ve rationale | P2 | 8 | Planned | S3 sonrası | Kemal | Core freeze | ADR/prototype |
| BP-050 | Email/OAuth account linking | P2 | 8 | Planned | S3 sonrası | Kemal | Production auth | Auth E2E |

### 17.3 Öncelik sırası

**Sprint 2 zorunlu:** BP-001R, BP-002R, BP-029, BP-030, BP-042, BP-043,
BP-046 ve BP-008R/BP-031'in contract tasarımı.
**Sprint 3 core:** BP-008R, BP-025R, BP-031, BP-032, BP-033, BP-034,
BP-037, BP-039, BP-040, BP-044, BP-045, BP-048.
**Zaman kalırsa:** BP-035, BP-036, BP-038, BP-041, BP-047.
**Final sonrası:** BP-049, BP-050 ve tam Agents SDK migration.

---

## 18. Öncelikli Story Kabul Kriterleri

### BP-002R — Gerçek Sample Blueprint

- Sample route AI key olmadan açılır.
- Fixture mevcut `blueprintSchema` ile doğrulanır.
- `Sample project` etiketi görünür.
- Overview ve tüm output grupları açılır.
- “Use this structure for my idea” CTA wizard'a gider.
- Sample route production E2E kapsamındadır.
- Landing `View Demo` bu route'a gider.

### BP-031 — Job Events ve Partial Blueprint

- Durable ve local job store aynı event tipini kullanır.
- Event alanları: id, pixie, section, status, safe message, timestamp.
- Section `done` olmadan partial output publish edilmez.
- Poll response backward compatible olur.
- Owner isolation korunur.
- Retry duplicate event üretse bile UI idempotent işler.
- Tamamlanan partial data job failure sonrası kaybolmaz.
- Raw prompt/output loglanmaz.

### BP-032 — Progressive Workspace

- İlk 2 saniyede queued/running state görünür.
- Aynı anda yalnız gerçek aktif pixie'ler working görünür.
- Tamamlanan bölüm anında tıklanabilir olur.
- Page refresh job takibini kaybetmez.
- Failed state tamamlanan section'ları gösterir.
- Retry varsa gerçek endpoint'e bağlıdır.
- Mobile'da timeline ve output okunur.
- Screen reader status değişimlerini duyabilir.

### BP-033 — MVP Command Center

- Default tab `Overview` olur.
- Bir cümlelik ürün, hedef kullanıcı, must-have, out-of-scope, risk, first
  sprint ve next actions gösterilir.
- Veriler mevcut validated blueprint'ten deterministic türetilir.
- Eksik liste boşsa uygun empty state gösterilir.
- First sprint kopyalanabilir.
- Sample ve gerçek project aynı component'i kullanır.

### BP-039/BP-040 — Production Release

- Vercel build başarılı.
- Production Supabase migration'ları uygulanmış.
- Anonymous user A, user B'nin projesini okuyamaz.
- Project create → generation/sample → export smoke geçer.
- Queue callback ve region config doğrulanır.
- Hosted ortam local JSON store'a düşmez.
- Server-only env browser bundle/log içinde görünmez.
- GitHub repo homepage canlı URL'ye güncellenir.

### BP-043 — Sprint 2 README Closeout

- Altı zorunlu başlık eksiksiz.
- Daily notları tarihli ve gerçek.
- Board baş/orta/son screenshotları relative path ile bağlı.
- Yeni tasarım ve gerçek blueprint screenshotları var.
- Review; tamamlanan, taşınan ve başarısız işleri ayırıyor.
- Retro aksiyonlarında owner ve tarih var.
- Katılımcılar gerçek toplantı katılımına göre yazılmış.

---

## 19. Sprint 1 Gerçekleşenler ve Kanıt Açıkları

### 19.1 Sprint bilgisi

- **Dönem:** 19 Haziran – 5 Temmuz 2026
- **Hedef:** Fikir, takım, repo, plan, web pivot ve çalışan teknik temel
- **Ürün sonucu:** Çalışan Next.js iskeleti ve ilk blueprint akışı
- **Tarihsel belge:** [`docs/sprint-1.md`](sprint-1.md)

### 19.2 Gerçekleşen güçlü işler

- BuildPixies fikri ve web-first pivot,
- public repo ve README,
- landing, dashboard, wizard, workspace, Output Hub,
- project APIs ve local/Supabase storage,
- role-based AI prompts/schemas,
- generation job/polling,
- owner RLS temeli,
- README export,
- Sprint 1 ürün screenshotları,
- decision log.

### 19.3 Eksik/iyileştirilecek kanıtlar

| Kanıt | Durum | Düzeltme |
| --- | --- | --- |
| Backlog mantığı | README'de var | Story point ölçeği gelecekte Fibonacci ile standardize edilir |
| Daily Scrum | Metin var | Gerçek iletişim screenshot'ları varsa redakte edilerek `backfilled` eklenir |
| Board update | Link ve özet var | Sprint 1 tarihli board screenshot'ı eklenmeli |
| Ürün durumu | 5 screenshot var | Mevcut haliyle yeterli; tarihi/caption korunmalı |
| Review | Var | Katılımcı ve taşınan iş doğruluğu teyit edilir |
| Retro | Var | Aksiyon owner/tarih formatına taşınabilir |

Tarihsel gerçekliği korumak için mevcut olmayan eski screenshot üretilmez.
Elde gerçek kaynak varsa sonradan eklenen kanıt açıkça `backfilled on <date>`
olarak işaretlenir.

---

## 20. Sprint 2 Kapanış Planı

### 20.1 Sprint bilgisi

- **Dönem:** 6 Temmuz – 19 Temmuz 2026
- **Hedef:** Kullanıcı fikir girsin, gerçek blueprint üretilsin, sonuç
  saklansın/export edilsin; çalışan MVP kanıtlanabilsin.
- **Bugünkü durum:** Core hedef fazlasıyla kodlandı; ürün anlaşılırlığı ve sprint
  kanıtı kapanış riski.

### 20.2 Sprint 2 gerçekleşen teknik kapsam

- PR #11: Markdown copy, JSON export, section regenerate controls,
- regenerate persistence ve eşzamanlı istek koruması,
- Sprint Plan output,
- durable Vercel Queue, lease, retry ve atomic completion,
- Supabase distributed rate limit,
- source-grounded Bootcamp Mode,
- Playwright demo journey ve GitHub Actions,
- design references'ın uygulanması,
- OpenRouter Free integration,
- 429/5xx retry ve invalid output hardening,
- canlı key, tek section ve tam pipeline smoke.

### 20.3 16–19 Temmuz günlük plan

#### 16 Temmuz — Gerçeklik ve ürün reseti

| İş | Owner | Çıktı |
| --- | --- | --- |
| Master planı bootcamp kaynaklarıyla güncelle | PO | Bu belge |
| Ekip roster/rol/form durumunu doğrula | SM | External confirmation notu |
| Issue #1–#10 state/label temizliği planı | SM | Board hygiene checklist |
| Landing/workspace baseline screenshot al | Selin | Sprint 2 before kanıtı |
| Progressive event contract taslağı | Kemal | Type/API/migration notu |
| Sprint 2 evidence klasörünü oluştur | SM | Dosya yapısı ve naming |

#### 17 Temmuz — Proof before promise

| İş | Owner | Çıktı |
| --- | --- | --- |
| Sahte sosyal kanıtı kaldır, CTA düzelt | Selin | BP-029 |
| Curated sample fixture ve route | Selin + PO | BP-002R/BP-030 |
| Landing Before/After sample bölümü | Selin | BP-001R |
| Event/partial schema ve storage contract | Kemal | BP-031 ilk dilim |
| Daily/board kanıtlarını arşivle | SM | Evidence links |
| Repo description'ı ürün kategorisine hizala | SM + PO | GitHub metadata |

#### 18 Temmuz — Entegrasyon ve code freeze

| İş | Owner | Çıktı |
| --- | --- | --- |
| Sample E2E ve responsive kontrol | Selin | CI test |
| Job event backend ilk dikey dilim | Kemal | Gerçek Pip/section status |
| Command Center low-fidelity component/data mapping | PO + Selin | Sprint 3 hazır başlangıç |
| `lint`, `typecheck`, `build`, E2E | Dev ekip | Green quality gate |
| Sprint 2 final product screenshots | PO/SM | Desktop + mobile |
| Code freeze 18:00 | SM | Açık blocker listesi |

#### 19 Temmuz — Sprint closeout

| Saat | İş | Owner |
| --- | --- | --- |
| 10:00 | Board ve story state doğrulama | SM |
| 11:00 | Product demo + acceptance | PO + ekip |
| 12:00 | Sprint Review | Ekip |
| 13:00 | Retrospective | Ekip |
| 14:00 | README altı zorunlu madde | SM + herkes |
| 15:00 | Evidence freeze | SM |
| 16:00 | Final lint/type/build/E2E | Dev ekip |
| 17:00 | README link ve privacy kontrolü | PO + SM |
| 18:00 | Sprint 2 commit/push/CI | Reviewer |
| 20:00 | Kapanış ve Sprint 3 input listesi | Ekip |

### 20.4 Sprint 2 Definition of Done

- Kullanıcı proje oluşturabiliyor.
- Gerçek OpenRouter ile validated blueprint üretilmiş.
- Blueprint project/job'a kaydoluyor.
- Regenerate/export çalışıyor.
- Sample blueprint AI beklemeden açılıyor.
- Landing gerçek sample'a bağlanıyor.
- En az ilk gerçek pixie progress dilimi veya tamamlanmış event contract'ı var;
  kalan iş Sprint 3'e açıkça taşınmış.
- Main kalite zinciri yeşil.
- README'de altı zorunlu sprint kanıtı var.
- Board screenshot ve yeni ürün screenshotları ekli.
- Review/Retro gerçek katılımcı ve kararlarla yazılı.

---

## 21. Sprint 3 Gün Gün Final Planı

### 21.1 Sprint bilgisi

- **Dönem:** 20 Temmuz – 2 Ağustos 2026
- **Sprint Goal:** BuildPixies'i ürün değeri net, progressive AI deneyimi olan,
  deploy edilmiş, kanıtları ve 3 dakikalık videosu hazır bir submission
  candidate haline getirmek.

### 21.2 Günlük plan

#### 20 Temmuz — Planning ve Akademi soru-cevap

- Sprint 2 review/retro aksiyonlarını Sprint 3'e taşı.
- 20:00 soru-cevap toplantısına katıl veya notlarını al.
- Değişen teslim/sunum kuralı varsa bu plana işle.
- Sprint 3 capacity ve owner'ları teyit et.
- P0/P1 ayrımını board'a uygula.
- **Exit:** Sprint goal, sprint backlog ve owner'lar kesin.

#### 21 Temmuz — Progressive event backend

- GenerationEvent/partial blueprint modelini tamamla.
- Local store ve Supabase migration/adapter davranışını hizala.
- Orchestrator callback'lerini job persistence'a bağla.
- Poll response contract testini yaz.
- **Exit:** API gerçek section progress döndürüyor.

#### 22 Temmuz — Progressive workspace

- Timeline gerçek events ile çalışır.
- Refresh/reconnect job durumunu korur.
- Partial section preview açılır.
- Failed state completed sections'ı korur.
- Mobile state kontrol edilir.
- **Exit:** 4 dakikalık job artık boş bekleme değildir.

#### 23 Temmuz — MVP Command Center

- Overview data mapping,
- must-have/out-of-scope/risk/first sprint/next action,
- sample ve gerçek proje ortak component,
- copy first sprint,
- empty/partial states.
- **Exit:** Kullanıcı tek ekranda MVP kararını anlar.

#### 24 Temmuz — Output IA ve refinement

- 11 tab → Overview/Product/Experience/Build/Delivery,
- active header düzeltmesi,
- kontrollü refine aksiyonlarından en değerlisi,
- regenerate feedback validation.
- **Exit:** Detaylar karar hiyerarşisini bozmaz.

#### 25 Temmuz — Core feature freeze

- Delivery Pack ayrımı yalnız core stabilse yapılır.
- Tüm P0 story acceptance review.
- Agents SDK/pgvector için go/no-go kararı.
- Yeni ana özellik dondurulur.
- **Exit:** Açık yalnız bug, deploy, evidence, accessibility.

#### 26 Temmuz — Production security ve observability

- Env matrix,
- quota/Turnstile kararı,
- safe logs/request IDs,
- hosted local-store fail-closed,
- RLS/owner isolation,
- dependency audit.
- **Exit:** Production readiness checklist %80+.

#### 27 Temmuz — UX test ve accessibility

- 3 hedef kullanıcı testinden en az 2'si,
- 5-second comprehension,
- sample→overview task,
- mobile/keyboard/focus/aria,
- en kritik 3 UX düzeltmesi.
- **Exit:** Bulgu ve karar tablosu hazır.

#### 28 Temmuz — Release Candidate 1

- Vercel deploy,
- Supabase production migrations,
- anonymous auth/RLS smoke,
- project→generation/sample→export smoke,
- production URL GitHub homepage'e eklenir,
- incognito test.
- **Exit:** Public RC1 erişilebilir.

#### 29 Temmuz — Demo project ve architecture evidence

- Curated project final içeriği,
- AI architecture diagram,
- model/routing/schema/retry açıklaması,
- README technical architecture,
- issue/PR/CI kanıt bağlantıları.
- **Exit:** Jüri AI ve mimari kriterlerini repodan görebilir.

#### 30 Temmuz — Evidence ve README freeze

- Sprint 3 board screenshots,
- final landing/dashboard/wizard/workspace/overview/delivery screenshots,
- Lean Canvas/persona özeti,
- tüm sprint linkleri,
- repo description/topics/homepage,
- broken link kontrolü.
- **Exit:** README submission-ready.

#### 31 Temmuz — Video script ve prova

- 180 saniyelik script,
- screen recording shot list,
- demo data reset,
- iki süreli prova,
- ses/çözünürlük/cursor kontrolü,
- thumbnail.
- **Exit:** Script 2:50–3:00 aralığında.

#### 1 Ağustos — Video ve Submission Candidate

- Final video kaydı,
- edit, subtitle gerekiyorsa ekleme,
- YouTube upload,
- incognito playback,
- tüm submission linklerini tek dosyada toplama,
- release tag adayı.
- **Exit:** Video ve ürün linkleri çalışıyor.

#### 2 Ağustos — Final teslim

- 10:00 production smoke,
- 11:00 README/links/secret/privacy review,
- 12:00 final team sign-off,
- 14:00 form doldurma,
- **18:00 iç teslim ve gönderim**,
- 18:00–23:59 yalnız kanıtlanmış teslim hatası için tampon.

### 21.3 Sprint 3 Definition of Done

- Public veya açıkça deploy-ready çalışan ürün,
- progressive generation veya jüriye gösterilebilir gerçek event kanıtı,
- MVP Command Center,
- curated sample project,
- responsive ve keyboard-usable core journey,
- production Supabase/RLS smoke,
- final README ve üç sprint kanıtı,
- 3 dakikayı aşmayan YouTube videosu,
- form 2 Ağustos 18:00 iç hedefine kadar gönderilmiş,
- `main` green CI ve temiz worktree,
- son dakika başlamış açık P0 yok.

---

## 22. Scrum Kanıt ve README Operasyon Planı

### 22.1 Önerilen dosya yapısı

```text
docs/
  evidence/
    sprint-1/
      daily/
      board/
      product/
    sprint-2/
      daily/
      board/
      product/
      review/
      retrospective/
    sprint-3/
      daily/
      board/
      product/
      review/
      retrospective/
    user-testing/
    architecture/
```

### 22.2 Dosya adlandırma

```text
2026-07-17-daily-whatsapp-01-redacted.png
2026-07-17-board-mid-sprint.png
2026-07-19-product-command-center-desktop.png
2026-07-19-product-command-center-mobile.png
2026-07-19-review-notes.md
```

### 22.3 Privacy standardı

- Telefon numaraları, özel mesajlar ve ilgisiz konuşmalar kırpılır/blur edilir.
- API key, environment value, e-mail ve kullanıcı ID görünmez.
- Screenshot'a anlamlı alt yazı eklenir.
- Kanıtın tarihi ve neyi kanıtladığı yazılır.
- Dış image host yerine mümkün olduğunca repo-relative dosya kullanılır.

### 22.4 Sprint README şablonu

Her sprint bölümü aynı sırayı kullanır:

1. Sprint dönemi ve hedefi,
2. Sprint capacity ve planlanan/tamamlanan story point,
3. Backlog dağıtma mantığı,
4. Daily Scrum,
5. Sprint Board Updates,
6. Ürün Durumu,
7. Teknik doğrulama,
8. Sprint Review ve katılımcılar,
9. Sprint Retrospective,
10. Taşınan işler ve sonraki sprint aksiyonları.

### 22.5 Story point standardı

- Fibonacci: 1, 2, 3, 5, 8.
- Puan iş süresi değil; belirsizlik, karmaşıklık ve risk karşılaştırmasıdır.
- Planlanan ve tamamlanan puan ayrı yazılır.
- Bitmeyen story kısmi puan almaz; sonraki sprint'e taşınır veya bölünür.
- Geçmiş Sprint 1'in 100 puan yaklaşımı tarihsel kayıt olarak kalabilir;
  Sprint 2 kapanışından itibaren yeni standarda geçiş açıklanır.

### 22.6 Board standardı

Kolonlar:

```text
Backlog → Ready → In Progress → Review → Done
```

Her issue:

- story ID,
- user outcome,
- priority,
- sprint,
- owner,
- acceptance criteria,
- test/evidence,
- dependency,
- PR/commit linki taşır.

“Done” issue açık bırakılmaz. Kapatılamıyorsa etiket `code-complete` veya
`partial` olmalıdır.

---

## 23. Kalite, Test ve Release Stratejisi

### 23.1 Her PR kalite kapısı

```bash
npm run lint
npm run typecheck
npm run build
npm run test:e2e
```

Değişikliğe göre ek doğrulama:

- Supabase migration: SQL test + local/remote migration planı,
- AI client: mock provider contract + secret-safe log,
- UI: desktop/mobile screenshot + keyboard check,
- route: valid/invalid/unauthorized/rate-limited request,
- docs: `git diff --check`, link/path ve tarih kontrolü.

### 23.2 E2E kritik yolculuklar

1. Landing → sample blueprint,
2. Landing → wizard → project,
3. Project → deterministic generation → overview,
4. Section regenerate → persistence,
5. README/JSON export,
6. Bootcamp delivery report,
7. Dashboard project state,
8. Invalid input rejection,
9. Mobile core journey,
10. Progressive job refresh/reconnect — BP-032 ile eklenecek.

### 23.3 Canlı AI smoke politikası

- CI gerçek provider kullanmaz.
- Mock provider; header, auth, model, response format, token parametreleri ve
  privacy preferences'ı doğrular.
- Canlı smoke manuel ve düşük frekanslıdır.
- Çıktıda key veya ham hassas content gösterilmez.
- Final demo öncesi tek section ve curated full pipeline test edilir.

### 23.4 Release checklist

- Main ile origin senkron,
- worktree temiz,
- CI green,
- production build green,
- migrations applied,
- env matrix complete,
- smoke test pass,
- screenshots current,
- README current,
- rollback/known issues notu,
- release tag.

### 23.5 Known limitation standardı

Ürün eksikleri gizlenmez. README ve demo için kısa liste:

- Free model latency/availability,
- current role-based pipeline vs future SDK handoff,
- anonymous auth/account linking durumu,
- partial progress/SSE durumu,
- production quota sınırı.

Bu şeffaflık ürünün bitmemiş görünmesi değil, teknik karar kalitesidir.

---

## 24. Jüri Kriterleriyle Birebir Eşleme

### 24.1 Ön değerlendirme — YZ

| Kriter | Max | BuildPixies kanıtı | Eksik | Deadline |
| --- | ---: | --- | --- | --- |
| Yarışmaya hazır çalışan proje | 10 | Core E2E, generation, export, Bootcamp Mode | Public RC + progressive UX | 28 Temmuz |
| Özgünlük | 10 | Pixie orchestration + idea-to-MVP + delivery pack | 5-second anlatı ve sample proof | 19 Temmuz |
| Ürün tamamlanma | 10 | Landing→project→blueprint→export | Command Center, deploy, final polish | 30 Temmuz |
| Pazara uygunluk | 10 | Bootcamp/junior builder problem eşleşmesi | 3 user test + Lean Canvas | 27–30 Temmuz |

### 24.2 Ekstra teknik puan alanları — YZ

| Kriter | Max | Kanıt stratejisi | Yapılmayacak hata |
| --- | ---: | --- | --- |
| AI model/agent/memory/orchestration | 20 | Provider rationale, role graph, strict schemas, persistence, regenerate context, event trace | Kullanılmayan SDK/vector DB eklemek veya yanlış claim |
| Mimari/clean code | 15 | App/lib/types ayrımı, validation, storage adapter, queue lease, RLS, CI | Sadece klasör ağacı gösterip kararları açıklamamak |
| Canlı/deploy-ready ürün | 10 | Vercel URL, Supabase production smoke, env docs, CI | Local çalışmayı deploy kabul etmek |

### 24.3 Final değerlendirme — YZ

| Kriter | Max | Demo/README mesajı |
| --- | ---: | --- |
| İhtiyaç ve çözüm eşleşmesi | 20 | “Fikir çok, uygulanabilir karar ve ilk sprint yok” problemi → Command Center |
| Kullanıcı değeri ve deneyimi | 10 | 5 saniye anlatı, progressive progress, ilk 3 aksiyon, export |
| Pazar potansiyeli | 10 | Bootcamp/hackathon wedge → solo builder/freelancer genişlemesi |
| Fonksiyonel yeterlilik | 15 | Create, generate, partial progress, refine, persist, export, delivery |
| Ürün bütünlüğü | 10 | Tutarlı IA, design system, sample, dashboard, error states |
| Yapay zeka öğeleri | 35 | Çok aşamalı orchestration, schema, guardrail, memory context, retry, trace |

### 24.4 Jüri anlatısında kullanılacak dürüst teknik cümle

> BuildPixies currently uses a dependency-aware, role-based orchestration
> pipeline over OpenAI-compatible models. Each pixie owns a strict structured
> output, later steps consume validated earlier decisions, projects persist the
> resulting blueprint, and section regeneration reuses project context. We
> prioritize traceable product decisions and resilient outputs over adding an
> SDK only for its name.

### 24.5 Puan kaybettirecek durumlar

- Broken public link,
- 3 dakikayı aşan video,
- sprint altı maddelerinin eksikliği,
- sahte kullanıcı/metrik iddiası,
- gerçek olmayan agent/memory claim'i,
- AI beklerken boş ekran,
- README ile repo durumunun çelişmesi,
- açık secret veya kişisel veri,
- son gün eklenmiş ve test edilmemiş özellik,
- private/erişilemeyen board veya video linki.

---

## 25. Üç Dakikalık Video ve Demo Senaryosu

### 25.1 Video amacı

Video feature turu değil, problem→çözüm→kanıt→teknik derinlik hikâyesidir.
Maksimum süre 3 dakikadır; hedef final export **2:50–2:58** olmalıdır.

### 25.2 Zaman kodlu storyboard

| Süre | Görüntü | Anlatı |
| --- | --- | --- |
| 0:00–0:15 | Ham fikir/boş sayfa problemi | “Ideas fail between inspiration and an actionable plan.” |
| 0:15–0:30 | Landing Before/After | BuildPixies'in tek cümlelik vaadi |
| 0:30–0:50 | Wizard hızlı giriş | Audience, goal, constraints |
| 0:50–1:15 | Pixie timeline kısa kayıt | Gerçek role/section progress; uzun bekleme hızlandırılmış veya önceden kaydedilmiş |
| 1:15–1:45 | Command Center | Must-have, out-of-scope, risk, first sprint, next actions |
| 1:45–2:05 | Build/Delivery detayı | Tech plan, backlog, tests, README export |
| 2:05–2:20 | Bootcamp Delivery Pack | Gerçek notlardan review/retro; fake progress yok |
| 2:20–2:42 | AI architecture diagram | Role graph, schemas, persistence, retry, queue, RLS |
| 2:42–2:55 | Pazar ve kapanış | Bootcamp teams → solo builders; core promise |

### 25.3 Demo güvenliği

- Ana video curated project kullanır.
- Sıfırdan full free-router generation'ın 252 saniyesi videoda beklenmez.
- Gerçek progress kısa kayıt/ hızlandırma ile gösterilebilir; kurgu olduğu
  gizlenmez.
- Demo browser'da bildirim, password manager, personal bookmark kapalıdır.
- Seed/sample data temiz ve profesyoneldir.
- Junk local project isimleri görünmez.
- Network/console secret gösterilmez.

### 25.4 Video teknik checklist

- 1080p,
- okunabilir browser zoom,
- temiz mikrofon,
- mouse hareketi kontrollü,
- background müzik varsa konuşmayı bastırmaz,
- subtitle opsiyonel fakat önerilir,
- YouTube public veya erişilebilir unlisted,
- copyright problemi olmayan asset/audio,
- thumbnail,
- incognito playback,
- süre 3:00 altında.

---

## 26. Final Teslim Checklist

### Repository

- [ ] Repo public.
- [ ] Default branch `main`.
- [ ] Main CI green.
- [ ] Worktree ve remote senkron.
- [ ] Açık P0 issue yok veya known issue olarak açıklanmış.
- [ ] Repo description BuildPixies'i doğru anlatıyor.
- [ ] Homepage canlı URL.
- [ ] README broken link yok.
- [ ] Secret ve `.env.local` tracked değil.
- [ ] License kararı verildi.
- [ ] Final tag/release oluşturuldu.

### Ürün

- [ ] Landing 5-second test geçiyor.
- [ ] Sample blueprint açılıyor.
- [ ] Wizard çalışıyor.
- [ ] Project persistence çalışıyor.
- [ ] Generation/progressive state çalışıyor.
- [ ] Command Center okunuyor.
- [ ] Regenerate ve export çalışıyor.
- [ ] Delivery Pack çalışıyor.
- [ ] Mobile core journey çalışıyor.
- [ ] Error/empty/loading state'leri mevcut.

### Production

- [ ] Vercel URL erişilebilir.
- [ ] Production Supabase migration'ları güncel.
- [ ] RLS owner isolation smoke geçti.
- [ ] Queue/worker çalışıyor.
- [ ] Hosted local store kapalı.
- [ ] Env değerleri server-only.
- [ ] Rate limit/abuse kararı uygulanmış veya risk kayıtlı.
- [ ] Incognito smoke geçti.

### Bootcamp belgeleri

- [ ] Takım adı, üyeler, roller.
- [ ] Ürün adı, açıklama, özellikler, hedef kitle.
- [ ] Product Backlog URL.
- [ ] Sprint 1 altı zorunlu madde.
- [ ] Sprint 2 altı zorunlu madde.
- [ ] Sprint 3 altı zorunlu madde.
- [ ] Board screenshotları.
- [ ] Ürün screenshotları.
- [ ] Daily kanıtları.
- [ ] Review/Retro katılımcıları.
- [ ] Teknik mimari ve AI anlatısı.
- [ ] Known limitations.

### Video ve form

- [ ] Video 3:00 altında.
- [ ] YouTube linki incognito çalışıyor.
- [ ] Canlı URL incognito çalışıyor.
- [ ] GitHub URL doğru.
- [ ] Form alanları önceden taslaklandı.
- [ ] Scrum Master gönderimden sorumlu.
- [ ] Takım 2 Ağustos 12:00 sign-off verdi.
- [ ] Form 2 Ağustos 18:00 iç hedefinde gönderildi.
- [ ] Gönderim kanıtı saklandı.

---

## 27. Referans Projelerden Alınan Dersler

### 27.1 BootcampScrumTemplate

**Ders:** Akademi'nin minimum beklentisi nettir: backlog mantığı, daily,
board, ürün screenshotı, review ve retro.
**BuildPixies uygulaması:** README aynı başlık sırasını korur; teknik detaylar
bu minimumun üstüne eklenir.

### 27.2 Ghost of Anna

**Güçlü yönler:** Takım/ürün anlatısı, hedef kitle, pazarlama planı, her sprintte
puan mantığı, board, ürün screenshotları, katılımcı isimleri ve taşınan işler.
**Ders:** Ürün hikâyesi ve sprint hikâyesi birlikte anlatılmalı.
**BuildPixies uygulaması:** Yalnız commit listesi değil; her sprintin kullanıcı
ve ürün sonucunu Review'da anlat.

### 27.3 Cherry Chasers

**Güçlü yönler:** Tasarım/development iş bölümü, çok sayıda görsel, puan devri,
final video ve tamamlanan kapsamın açık özeti.
**Ders:** Tamamlanmayan iş bir sonraki sprint'e dürüstçe taşınabilir.
**BuildPixies uygulaması:** BP-008R/BP-031 gibi story'ler bölünür; kısmi iş Done
gösterilmez.

### 27.4 zaten

**Güçlü yönler:** Yoğun ürün screenshotları, board değişimi, burndown,
additional documents, persona, navigation map, marka ve teknoloji evriminin
görünür olması.
**Ders:** Jüri repo içinde gelişimi görebilmelidir.
**BuildPixies uygulaması:** Sprint başı/sonu karşılaştırması, architecture
diagram ve current/future technology ayrımı eklenir.

### 27.5 Planova

**Güçlü yönler:** Her sprintte app screenshot, project management screenshot,
burndown, günlük kanıt; finalde persona, Lean Canvas, tech tree, FAQ, yasal
dokümanlar ve iki dilde promo video.
**Ders:** Son sprint yalnız kod değil, ürünleştirme ve sunum sprintidir.
**BuildPixies uygulaması:** 25 Temmuz feature freeze; son hafta deploy, user
test, evidence, README ve video.

### 27.6 Referanslardan alınmayacak kötü alışkanlıklar

- Okunamayacak kadar uzun ve tekrarlı README,
- bağlamsız onlarca screenshot,
- sonradan eklenmiş fakat tarihselmiş gibi sunulan daily kayıtları,
- açıklanmayan yüksek story point sayıları,
- private/bozuk board linklerine bağımlılık,
- ürün değeri yerine yalnız görsel kalabalık,
- Türkçe/İngilizce metni kontrolsüz iki kez tekrarlamak.

BuildPixies README'si kanıt açısından zengin fakat taranabilir olacak;
`<details>` blokları ve ayrı `docs/evidence/` dosyaları kullanılabilir.

---

## 28. Risk Kaydı ve Kontenjan Planı

| Risk | Olasılık | Etki | Tetikleyici | Önlem | Kontenjan | Owner |
| --- | --- | --- | --- | --- | --- | --- |
| Ürün ne olduğu anlaşılmıyor | Yüksek | Çok yüksek | 5-second test başarısız | Landing proof + sample + Command Center | Video curated sample ile açılır | PO |
| Full generation çok yavaş | Yüksek | Çok yüksek | >180s | Partial progress + batches | Sample project; sabit model bütçesi | Kemal |
| OpenRouter 429/availability | Orta-yüksek | Yüksek | Provider 429/503 | Retry/backoff, safe error | Sample, alternatif provider/model | Kemal |
| Invalid output | Orta | Yüksek | Parse/schema fail | Strict schema + section retry | Partial result + retry | Kemal |
| Route 300s sınırı | Orta | Yüksek | Job >300s | Durable queue + partial output | Fewer/combined demo sections | Kemal |
| Deploy gecikmesi | Orta | Çok yüksek | 28 Temmuz RC yok | Erken Vercel/Supabase smoke | Deploy-ready video/local kanıt; yine de public URL hedefi | SM |
| Evidence eksikliği | Orta | Çok yüksek | Sprint sonu altı madde eksik | Günlük arşiv ve evidence owner | Gerçek kaynak varsa backfill, asla icat etme | SM |
| Team roster belirsiz | Orta | Orta | Form/README farklı | Resmî roster sync | External confirmation notu | SM |
| Scope creep | Yüksek | Yüksek | 25 Temmuz sonrası feature | Freeze ve P0 gate | P1 drop | PO |
| Yanlış AI claim'i | Orta | Yüksek | “Agents SDK/pgvector var” ama yok | Dürüst architecture page | Current/future ayrımı | PO + Kemal |
| Public abuse | Orta | Yüksek | Çoklu generation spam | Rate limit + quota/CAPTCHA | Demo access limit/sample | Kemal |
| Secret/privacy sızıntısı | Düşük | Çok yüksek | Env/log/screenshot | Ignore, safe logs, redaction | Key revoke/rotate | Ekip |
| Auth/RLS hatası | Orta | Çok yüksek | Cross-user read | Production isolation test | Public demo sample-only | Kemal |
| Video geç/uzun | Orta | Çok yüksek | 1 Ağustos video yok | 31 Temmuz script freeze | Basit tek take + curated project | PO + SM |
| Tasarım polish scope'u yutar | Yüksek | Orta | Yeni component çok, değer az | UX metric-based acceptance | Design freeze | PO |
| README/repo çelişkisi | Orta | Yüksek | Done ama dosya/kanıt yok | 19/30 Temmuz audits | Durumu Partial yap | SM |

### 28.1 Drop sırası

Zaman daralırsa şu sırayla kapsam düşürülür:

1. Email/OAuth linking,
2. pgvector memory,
3. Agents SDK migration,
4. free-form chat,
5. Turnstile UI — private demo quota ile geçici çözüm,
6. Bootcamp area route ayrımı — mevcut form iyileştirilerek kalabilir,
7. controlled refine çeşitleri — tek regenerate korunur.

Asla düşürülmeyecekler:

- çalışan core journey,
- sample blueprint,
- anlaşılır overview,
- sprint kanıtları,
- deploy/deploy-ready doğrulama,
- final video ve form,
- security baseline,
- quality gate.

---

## 29. Definition of Ready ve Definition of Done

### 29.1 Story Definition of Ready

Bir story ancak şu şartlarda `Ready` olur:

- kullanıcı sonucu tek cümle,
- priority ve sprint,
- owner,
- acceptance criteria,
- dependency,
- risk,
- test planı,
- evidence planı,
- 8 veya daha az story point.

### 29.2 Story Definition of Done

- Acceptance criteria karşılandı.
- Kod `main` branch'inde.
- Reviewer onayı var.
- Lint/typecheck/build ve ilgili testler geçti.
- Error/loading/empty state değerlendirildi.
- Mobile/accessibility etkisi kontrol edildi.
- Security/privacy etkisi değerlendirildi.
- Dokümantasyon güncellendi.
- Screenshot/CI/API smoke gibi kanıt hazır.
- Issue kapatıldı ve PR/commit bağlı.

### 29.3 Sprint Definition of Done

- Sprint goal demo edilebilir.
- Planlanan/tamamlanan/taşınan story'ler ayrılmış.
- Board güncel.
- Altı zorunlu Bootcamp maddesi README'de.
- Review ve Retro tamamlanmış.
- Retro aksiyonlarının owner ve tarihi var.
- Main green ve senkron.
- Ürün screenshotları güncel.

### 29.4 Release Definition of Done

- Public URL veya doğrulanmış deploy-ready paket,
- production smoke,
- no open critical/high known issue,
- CI green,
- no secret,
- README/current screenshots,
- demo fixture,
- rollback/contingency,
- team sign-off.

---

## 30. İletişim ve Scrum Şablonları

### 30.1 Async Daily

```md
## Daily — YYYY-MM-DD — İsim

- Dün: Tamamlanan story/PR/çıktı
- Bugün: Tek ana hedef
- Blocker: Yok / açık engel + ihtiyaç
- Kanıt: PR, commit, screenshot veya test linki
- Risk: Sprint goal'u etkileyen bir şey var mı?
```

### 30.2 Sprint Review

```md
## Sprint Review — Sprint N

- Sprint goal:
- Demo edilen kullanıcı yolculuğu:
- Tamamlanan story'ler:
- Tamamlanmayan/taşınan story'ler ve nedeni:
- Test/CI sonucu:
- Canlı ürün durumu:
- Alınan ürün/teknik kararlar:
- Stakeholder/TA geri bildirimi:
- Katılımcılar:
```

### 30.3 Retrospective

```md
## Sprint Retrospective — Sprint N

### İyi gidenler
- ...

### Zorlayanlar
- ...

### Bırakacağımız şey
- ...

### Başlatacağımız şey
- ...

### Devam edeceğimiz şey
- ...

| Aksiyon | Owner | Tarih | Başarı ölçütü |
| --- | --- | --- | --- |
| ... | ... | ... | ... |
```

### 30.4 Blocker bildirimi

```md
BLOCKER: <kısa başlık>
Story: BP-XXX
Başlangıç: YYYY-MM-DD HH:MM
Etkisi: <hangi kabul kriteri/tarih>
Denenenler: <en fazla 3 madde>
İhtiyaç: <kimden hangi karar/erişim>
Kontenjan: <çözülmezse ne düşürülecek>
```

### 30.5 TA/office hour soru formatı

Teknik çözüm istemek yerine süreç/kural netliği için:

```md
- Bağlam: BuildPixies, AI Product Planning web uygulaması
- İlgili resmî kural:
- Bizim uygulamamız:
- Belirsiz kalan nokta:
- İstediğimiz doğrulama:
```

---

## 31. İlk 72 Saatlik Uygulama Sırası

### İlk 24 saat

- [ ] Bu master plan takım tarafından okunur ve owner'lar teyit edilir.
- [ ] Resmî roster/ekip formu durumu doğrulanır.
- [ ] GitHub Issues #1–#10 gerçek state'e getirilir.
- [ ] BP-001R, BP-002R, BP-008R, BP-029–BP-046 issue'ları önceliğe göre açılır.
- [ ] Sprint 2 board screenshotı alınır.
- [ ] Evidence klasörü/naming standardı oluşturulur.
- [ ] Landing sahte sosyal kanıt/CTA düzeltmesi başlar.
- [ ] Curated sample fixture içeriği PO tarafından kabul edilir.

### 24–48 saat

- [ ] `/sample` veya eşdeğer sample project route tamamlanır.
- [ ] Landing Before/After ve sample CTA tamamlanır.
- [ ] Sample schema test ve E2E eklenir.
- [ ] Progressive event contract teknik tasarımı kabul edilir.
- [ ] Repo description güncellenir.
- [ ] Daily kanıtları arşivlenir.

### 48–72 saat

- [ ] Job event backend ilk dikey dilimi merge edilir veya Sprint 3'e net story
  olarak taşınır.
- [ ] Command Center data mapping prototipi kabul edilir.
- [ ] Mobile/desktop Sprint 2 screenshots alınır.
- [ ] Sprint Review ve Retro yapılır.
- [ ] README altı zorunlu madde tamamlanır.
- [ ] CI green ve Sprint 2 kapanışı yapılır.

### 72 saat sonunda beklenen sonuç

BuildPixies yalnız güzel bir landing ve boş workspace gibi görünmemeli;
kullanıcı gerçek sample sonucu görebilmeli, ürün vaadini anlayabilmeli ve
progressive generation'ın teknik/ürün yolu hazır olmalıdır. Aynı anda Sprint 2
Bootcamp kanıt paketi eksiksiz kapanmalıdır.

---

## 32. Kaynak Dizini

### Bootcamp ana kaynakları

- [`docs/bootcamp.md`](bootcamp.md)
- [`docs/bootcamp bilgilendirme toplantısı.md`](<bootcamp bilgilendirme toplantısı.md>)
- [Bootcamp ekip bilgileri formu](https://forms.gle/CrMgeK8Ucd8mEmsE9)
- [Bootcamp takım değiştirme formu](https://forms.gle/KCmRmfQ3PDV2KBhC6)
- Slack `#bootcamp-2026` — proje yönetimi soruları; kılavuza göre 48 saat
  içinde dönüş hedefi

### Yerel referanslar

- [`references/BootcampScrumTemplate/README.md`](../references/BootcampScrumTemplate/README.md)
- [`references/GhostOfAnnaScrumExample/README.md`](../references/GhostOfAnnaScrumExample/README.md)
- [`references/U-21-Cherry-Chasers/README.md`](../references/U-21-Cherry-Chasers/README.md)
- [`references/OUA-zaten-Bootcamp-2023/README.md`](../references/OUA-zaten-Bootcamp-2023/README.md)
- [`references/planova/README.md`](../references/planova/README.md)

### BuildPixies proje kaynakları

- [`README.md`](../README.md)
- [`docs/decision-log.md`](decision-log.md)
- [`docs/sprint-1.md`](sprint-1.md)
- [`docs/sprint-2.md`](sprint-2.md)
- [`docs/sprint-3.md`](sprint-3.md)
- [`assets/magical_productivity_system/DESIGN.md`](../assets/magical_productivity_system/DESIGN.md)
- [GitHub Issues](https://github.com/avanalperen/BuildPixies/issues)
- [GitHub Actions](https://github.com/avanalperen/BuildPixies/actions)

### Son karar

> **BuildPixies final teslim stratejisi; daha çok agent, daha çok sekme veya daha
> çok animasyon eklemek değildir. Strateji; ürün değerini ilk 30 saniyede
> kanıtlamak, uzun AI işini kademeli ve dürüst göstermek, sonucu eyleme dönük bir
> Command Center'da toplamak, çalışan ürünü production kalitesiyle doğrulamak ve
> altı haftalık gerçek Scrum gelişimini eksiksiz kanıtlamaktır.**
