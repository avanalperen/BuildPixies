# BuildPixies — Sprint 2 Ayrıntılı Uygulama ve Kapanış Planı

> **Belge türü:** Aktif sprint execution planı, gerçekleşen iş kaydı ve kapanış checklist'i
> **Sprint:** 2 / 3
> **Dönem:** 6 Temmuz – 19 Temmuz 2026
> **Durum:** Aktif; 19 Temmuz evidence freeze ve kapanış hedefleniyor
> **Sprint hedefi:** Kullanıcının fikirden gerçek, doğrulanmış ve saklanan MVP blueprint'ine ulaşabildiği çalışan ürünü kanıtlamak; ürün vaadini sample deneyimiyle anlaşılır hale getirmek
> **Master plan:** [`docs/plan.md`](plan.md)
> **Doğrulanan kod tabanı:** `4f0be85 Revise bootcamp plan`

Sprint 2, yalnız daha fazla özellik ekleme sprinti değildir. Teknik MVP büyük
ölçüde çalışmaktadır; kapanış başarısı ürünün ilk bakışta anlaşılması, gerçek
örnekle kanıtlanması, uzun AI işleminin dürüst yönetilmesi ve Bootcamp'in altı
zorunlu kanıtının eksiksiz hazırlanmasına bağlıdır.

---

## 1. Sprint Kimliği ve Ürün Sonucu

### 1.1 Sprint Goal

> Kullanıcı fikrini girecek, BuildPixies proje workspace'ine ulaşacak, gerçek
> OpenRouter/OpenAI-compatible pipeline üzerinden validated blueprint
> üretecek, sonucu proje kaydında görecek, gerekli bölümü yeniden üretecek ve
> README/JSON olarak dışa aktarabilecek. Yeni kullanıcı ürünün değerini gerçek
> sample üzerinden AI beklemeden anlayabilecek.

### 1.2 Sprint sonunda beklenen ürün artışı

1. Landing → wizard → project → generation → output → export akışı çalışır.
2. AI çıktıları strict schema ile doğrulanır ve project blueprint'ine yazılır.
3. Section regenerate eski çıktıyı kontrollü biçimde günceller.
4. Long-running generation request'i UI'ı kilitlemez; job/polling ile takip edilir.
5. Queue retry, lease ve idempotency duplicate completion riskini azaltır.
6. Bootcamp Mode yalnız kullanıcının gerçek ilerleme notlarından rapor üretir.
7. Curated sample blueprint ürün vaadini 30 saniye içinde kanıtlar.
8. Landing sahte sosyal kanıt veya ölü CTA içermez.
9. Sprint 2'nin altı zorunlu kanıtı README ve repository içinde bulunur.

### 1.3 Sprint başarı ölçütleri

| Ölçüt | Kapanış hedefi | Ölçüm / kanıt |
| --- | --- | --- |
| 5 saniye testi | 3 test kullanıcısının en az 2'si ürünü doğru anlatır | Tarihli test notu |
| Sample erişimi | Landing'den en fazla 1 CTA ile açılır | E2E + screenshot |
| İlk sistem feedback'i | Generate sonrası 2 saniye içinde job state | E2E/video |
| AI doğruluğu | Blueprint schema-safe | Schema/provider smoke |
| Persistence | Refresh sonrası blueprint ve regenerate sonucu korunur | HTTP/E2E smoke |
| Export | Markdown kopya, README ve JSON çalışır | Playwright |
| Kalite | lint, typecheck, build, E2E ve CI yeşil | GitHub Actions |
| Scrum kanıtı | Altı zorunlu alan eksiksiz | README/evidence audit |

---

## 2. Durum, Gerçeklik ve Scope Kuralları

### 2.1 Durum sözlüğü

| Durum | Anlamı |
| --- | --- |
| **Done** | Main'de, acceptance geçti, test ve sprint kanıtı hazır |
| **Code Complete** | Kod/test hazır; screenshot, README veya canlı doğrulama eksik |
| **Partial** | Kabul kriterlerinin bir bölümü çalışıyor; tamamı karşılanmıyor |
| **Planned** | Kapsam ve kabul kriterleri belli, uygulama başlamadı |
| **External Confirmation** | Form, toplantı, iletişim veya ekip teyidi gerekiyor |

### 2.2 Kapanış scope kuralı

- 18 Temmuz 18:00 sonrasında yeni ana özellik merge edilmez.
- Kapanışa kadar P0 ürün anlatısı, sample ve evidence işleri önceliklidir.
- Gerçek progressive backend tamamlanmazsa contract ve taşınan story açık yazılır.
- Agents SDK, pgvector memory ve account linking Sprint 2 kapsamı değildir.
- Production deploy, Sprint 3 RC kapısıdır; Sprint 2 kapanışını bloke etmez.
- “Code Complete” iş, evidence olmadan Done sayılmaz.

---

## 3. Takım, Sorumluluk ve RACI

### 3.1 Repo üzerinde görünen takım

| Kişi | Rol | Sprint 2 önerilen odağı |
| --- | --- | --- |
| Muhammed Köseoğlu | Product Owner | Ürün anlatısı, sample kabulü, UX testleri, Sprint Review |
| Alperen Avan | Scrum Master | Board, daily/evidence, blocker, closeout ve README |
| Kemal Ersin Özkan | Developer | AI runtime, job/event contract, persistence ve güvenlik |
| Selin Akkaş | Developer | Sample/landing/output deneyimi, responsive UI ve görsel kanıt |

Owner dağılımı master plan önerisidir. Takım sync'inde değişirse board ve bu
belge birlikte güncellenir.

### 3.2 Sprint 2 RACI

| İş alanı | PO | SM | Kemal | Selin |
| --- | --- | --- | --- | --- |
| Landing ve sample mesajı | A | C | C | R |
| Curated sample fixture | A/R | C | C | R |
| AI runtime ve provider hardening | C | C | A/R | C |
| Job event/partial contract | C | C | A/R | C |
| Output/export/regenerate | C | C | R | A/R |
| Bootcamp evidence | R | A/R | R | R |
| Quality gate | C | C | A/R | R |
| Review ve retro | A/R | A/R | R | R |

`A`: accountable, `R`: responsible, `C`: consulted.

---

## 4. Capacity ve Backlog Dağıtma Mantığı

### 4.1 Puan standardı

- Fibonacci: `1, 2, 3, 5, 8`.
- Puan süre değil; karmaşıklık, risk ve belirsizlik karşılaştırmasıdır.
- Sprint 1'in 100 puan sistemi tarihsel kalır.
- Sprint ortasında tamamlanmış eski işler geriye dönük tahmin edilmez.
- Bitmeyen story kısmi puan kazanmaz; bölünür veya Sprint 3'e taşınır.

### 4.2 16 Temmuz reseti sonrası kapanış backlog'u

| ID | Sonuç | P | SP | Durum | Önerilen owner | Kanıt |
| --- | --- | ---: | ---: | --- | --- | --- |
| BP-001R | Landing ürünü 5 saniyede doğru anlatır | P0 | 3 | Planned | PO + Selin | Desktop/mobile + test |
| BP-002R | Gerçek sample blueprint görülebilir | P0 | 5 | Planned | Selin | `/sample` E2E + screenshot |
| BP-029 | Sahte sosyal kanıt ve ölü CTA kaldırılır | P0 | 1 | Planned | Selin | Link test |
| BP-030 | Curated sample schema-safe ve versiyonlu olur | P0 | 3 | Planned | PO + Selin | Fixture validation |
| BP-042 | Evidence klasörü ve naming standardı | P0 | 2 | Planned | SM | Relative paths |
| BP-043 | Sprint 2 altı zorunlu README maddesi | P0 | 3 | Planned | SM + herkes | README audit |
| BP-046 | Issue/label/description/homepage hygiene | P0 | 2 | Planned | SM | Board screenshot |
| BP-008R-S2 | Pixie event sözleşmesi tasarlanır | P0 | 3 | Planned | Kemal | Type/API contract |
| BP-031-S2 | Partial persistence dikey dilimi tasarlanır | P0 | 3 | Planned | Kemal | Migration/store plan |
| **Kapanış toplamı** |  |  | **25** |  |  |  |

Bu 25 puan, 16–19 Temmuz kapanış kapsamıdır; Sprint 2'nin önceki günlerinde
teslim edilen büyük teknik artış ayrıca aşağıda belgelenir ve geriye dönük
story point üretilmez.

### 4.3 Seçim mantığı

1. Ürün anlaşılmıyorsa teknik derinlik kullanıcı değeri üretmez.
2. Sample, 252 saniyeye varan free-provider beklemesini demo riski olmaktan çıkarır.
3. Evidence işi son güne bırakılırsa Bootcamp puanı doğrudan riske girer.
4. Event contract, Sprint 3 progressive UX'inin en kritik bağımlılığıdır.
5. Production deploy önemli fakat Sprint 3 RC gününde kontrollü ele alınacaktır.

---

## 5. Sprint İçinde Tamamlanan Teknik Artış

### 5.1 Repo ile doğrulanan teslimler

| Alan | Sonuç | Durum | Ana kanıt |
| --- | --- | --- | --- |
| Takım | Selin Akkaş takım listesine eklendi | Done | `8b5eb97` |
| Output | Markdown copy ve JSON export | Code Complete | PR #11 / `b5f1e26` |
| Regenerate | Bölüm bazlı UI ve persistence | Code Complete | `0eec8b6`, `33317d1` |
| Concurrency | Full/regenerate çakışma koruması | Code Complete | Post-merge hardening |
| Sprint output | Sprint Plan sekmesi | Code Complete | Output docs/code |
| Runtime | Durable queue, lease, retry, atomic completion | Code Complete | Runtime commits |
| Rate limit | Supabase owner bazlı atomik state | Code Complete | Migration/runtime |
| Bootcamp Mode | Source-grounded report, save ve export | Code Complete | `ff8ad3b` |
| Test | Kritik demo Playwright yolculuğu | Done | `80d4928` |
| CI | Push/PR quality workflow | Done | `75c5d19` |
| Design | Assets referanslarına göre tasarım rebuild | Code Complete | `85d81ee` |
| Provider | OpenRouter Free desteği | Code Complete | `14b4141` |
| AI güvenilirlik | 429/5xx retry ve invalid output hardening | Code Complete | `6176086` |
| Plan | Bootcamp master plan reseti | Done | `4f0be85` |

### 5.2 Canlı smoke sonucu ve öğrenim

- Gerçek key ile provider bağlantısı doğrulandı.
- Project create ve generation job akışı çalıştı.
- Full pipeline testinde üretim yaklaşık **252 saniye** sürdü.
- Ayrı bir denemede OpenRouter `429` döndürdü.
- Retry ve hata standardı güçlendirildi.
- Sonuç: yalnız teknik polling yeterli değil; progressive section event ve
  curated sample ürün açısından zorunlu hale geldi.

### 5.3 Done sayılmayan alanlar

- Tasarım rebuild yapılmış olsa da yeni ürün screenshotları henüz kanıt paketinde değil.
- Sample blueprint route henüz doğrulanmadı.
- Landing'deki sosyal kanıt ve demo CTA gerçekliği düzeltilmeli.
- Pixie durumları gerçek job events ile bağlı değil.
- Production Vercel/Supabase smoke yapılmadı.
- Sprint 2 altı zorunlu kanıtı kapanmadı.

---

## 6. Gün Gün Uygulama ve Kanıt Planı

### 6.1 6–15 Temmuz doğrulama tablosu

| Tarih | Repo ile görülen durum | Evidence aksiyonu |
| --- | --- | --- |
| 6 Temmuz | Sprint başlangıcı ve 20:00 Akademi soru-cevap | Toplantı notu varsa ekle; External Confirmation |
| 7–8 Temmuz | Ayrı commit görünmüyor | Yapılmayan iş icat edilmez; gerçek daily varsa eklenir |
| 9 Temmuz | Takım listesi ve proje sıralaması güncellendi | Commit + gerçek daily notu |
| 10–15 Temmuz | Ayrı commit görünmüyor | Yerel/iletişim çalışması takımca teyit edilirse yazılır |

Commit görünmemesi hiç çalışma yapılmadığı anlamına gelmez; ancak repository
dışı faaliyeti kanıtsız biçimde gerçekleşmiş saymak da doğru değildir.

### 6.2 16 Temmuz — Teknik teslim ve gerçeklik reseti

| İş | Sorumlu | Çıktı | Durum |
| --- | --- | --- | --- |
| PR #11 merge ve profesyonel post-merge hardening | Dev ekip | Export/regenerate/persistence | Tamamlandı |
| Queue/rate limit/Bootcamp Mode/E2E/CI | Dev ekip | Çalışan teknik artış | Tamamlandı |
| Design reference rebuild | Selin + ekip | Yeni görsel temel | Tamamlandı |
| OpenRouter ve AI hardening | Kemal | Provider runtime | Tamamlandı |
| Master plan Bootcamp uyumu | PO | 2.101 satırlık kaynak plan | Tamamlandı |
| Baseline landing/workspace screenshot | Selin | Before kanıtı | Tamamlandı |
| Roster/form teyidi | SM | External confirmation notu | Tamamlandı |

### 6.3 17 Temmuz — Proof before promise

| İş | Owner | Acceptance | Kanıt |
| --- | --- | --- | --- |
| Sahte `1,000+ creators` iddiasını kaldır | Selin | Kanıtsız metrik yok | Screenshot + text search |
| `View Demo` CTA'yı gerçek sample'a bağla | Selin | CTA `/sample` veya eşdeğer route'a gider | Playwright |
| Curated sample fixture oluştur | PO + Selin | `blueprintSchema` doğrular | Fixture test |
| Before/After sample anlatısı | PO + Selin | Kullanıcı 30 saniye içinde çıktıyı görür | Mobile/desktop |
| Generation event type/API contract | Kemal | Local/durable store ortak sözleşme | Type/test note |
| Daily/board evidence arşivi | SM | Privacy-safe relative files | Link audit |
| Repo description düzelt | SM + PO | AI product planning kategorisi net | GitHub metadata |

**Gün çıkış kapısı:** Landing vaadi gerçek bir sonuçla kanıtlanıyor; sample AI
key olmadan açılıyor; event contract review edilebilir.

### 6.4 18 Temmuz — Entegrasyon ve code freeze

| İş | Owner | Acceptance | Kanıt |
| --- | --- | --- | --- |
| Sample E2E | Selin | Landing → sample → overview/details çalışır | CI |
| Responsive sample | Selin | 390 px ve 1440 px okunur | Screenshot |
| Event backend ilk dikey dilim | Kemal | En az gerçek section/status persist edilir | API smoke |
| Command Center mapping prototipi | PO + Selin | Mevcut blueprint'ten deterministic alanlar | Review notu |
| Tam kalite zinciri | Dev ekip | lint/typecheck/build/E2E green | CI |
| Sprint 2 final screenshot | PO + SM | Caption, tarih, story ilişkisi | Evidence klasörü |
| Code freeze | SM | Açık P0/known issue listesi | Board |

**Gün çıkış kapısı:** 18:00 itibarıyla yeni ana özellik yok; yalnız blocker,
kanıt ve doğrulama düzeltmeleri kalır.

### 6.5 19 Temmuz — Sprint closeout

| Saat | Aktivite | Owner | Çıkış koşulu |
| --- | --- | --- | --- |
| 10:00 | Board ve issue state audit | SM | Done issue kapalı, partial doğru etiketli |
| 11:00 | Product demo ve PO acceptance | PO + ekip | Core journey çalışır |
| 12:00 | Sprint Review | Ekip | Karar, sonuç, katılımcı kaydı |
| 13:00 | Retrospective | Ekip | En fazla 3 owner/tarihli aksiyon |
| 14:00 | README altı zorunlu madde | SM + herkes | Eksik başlık yok |
| 15:00 | Evidence freeze | SM | Link, caption, privacy kontrolü |
| 16:00 | Final quality chain | Dev ekip | CI green |
| 17:00 | README ve broken-link kontrolü | PO + SM | Repo tutarlı |
| 18:00 | Commit/push/reviewer check | Reviewer | Main temiz ve senkron |
| 20:00 | Sprint 3 input listesi | Ekip | Carryover ve owner kesin |

---

## 7. Öncelikli Story Acceptance Criteria

### 7.1 BP-001R — Landing anlaşılırlığı

- Hero tek cümlede fikirden build-ready MVP planına dönüşümü anlatır.
- Ana CTA wizard'a, demo CTA gerçek sample'a gider.
- Kanıtsız kullanıcı sayısı, başarı oranı veya marka logosu bulunmaz.
- Before/After alanı girdiyi ve somut blueprint sonucunu gösterir.
- Mobile CTA görünür ve keyboard ile çalışır.
- En az üç 5-second test sonucu tarihli not edilir.

### 7.2 BP-002R/BP-030 — Curated sample

- AI key veya provider erişimi olmadan açılır.
- Fixture mevcut `blueprintSchema` ile doğrulanır.
- “Sample project” etiketi belirgin görünür.
- Product, Experience, Build ve Delivery içeriği anlamlıdır.
- “Use this structure for my idea” CTA wizard'a gider.
- Sample gerçek AI çıktısıymış gibi yanlış sunulmaz.
- Route Playwright kritik akışındadır.

### 7.3 BP-008R-S2/BP-031-S2 — Event contract

- Event alanları en az `id`, `pixie`, `section`, `status`, `message`, `timestamp` içerir.
- Raw prompt veya hassas output event/log içine yazılmaz.
- Local ve durable job store aynı domain tipini kullanabilir.
- Retry duplicate event üretse bile client idempotent işleyebilir.
- Section ancak schema-safe sonuçtan sonra `done` olur.
- Poll response mevcut client'ı kırmayacak biçimde versiyonlanır.
- Sprint 3 migration ve UI bağımlılıkları belgelenir.

### 7.4 BP-043 — Evidence closeout

- README'de altı zorunlu başlık aynı sırayla bulunur.
- Daily notları tarihli ve gerçektir.
- Board başlangıç/orta/son görselleri varsa relative path ile bağlıdır.
- Yeni tasarım ve sample/blueprint ekran görüntüleri caption taşır.
- Review tamamlanan, taşınan ve başarısız işleri ayırır.
- Retro aksiyonlarında owner ve hedef tarih vardır.
- Katılımcılar gerçek toplantı katılımına göre yazılır.

---

## 8. Bootcamp Zorunlu Altı Kanıt Planı

| Zorunlu başlık | İçerik | Owner | Hedef dosya/kanıt | Kapanış |
| --- | --- | --- | --- | --- |
| Backlog dağıtma mantığı | 16 Temmuz reseti, 25 puan ve seçim gerekçesi | PO + SM | Bu belge + README | 19 Temmuz |
| Daily Scrum | 6–19 Temmuz gerçek notları | Herkes/SM | `docs/evidence/sprint-2/daily/` | 19 Temmuz |
| Sprint Board Updates | Başlangıç, orta, son state | SM | `docs/evidence/sprint-2/board/` | 19 Temmuz 15:00 |
| Ürün Durumu | Before/after landing, wizard, workspace, sample, output | Selin + PO | `docs/evidence/sprint-2/product/` | 18 Temmuz |
| Sprint Review | Demo sonucu, kalite, tamamlanan/taşınan iş, katılımcı | PO + SM | `docs/evidence/sprint-2/review/summary.md` | Tamamlandı |
| Sprint Retrospective | İyi/zorlayan/öğrenim ve 3 aksiyon | SM + ekip | `docs/evidence/sprint-2/retrospective/summary.md` | Tamamlandı |

### 8.1 Evidence klasör yapısı

```text
docs/evidence/sprint-2/
  daily/
  board/
  product/
  review/
  retrospective/
```

### 8.2 Privacy ve adlandırma

- Dosya: `YYYY-MM-DD-kategori-kisa-aciklama.png`.
- Telefon, e-posta, özel konuşma, key ve kullanıcı ID redakte edilir.
- Her görselde tarih, caption ve ilgili story bulunur.
- Dış image host yerine repository-relative dosya kullanılır.
- Olmayan kanıt üretilmez; eksik açıkça `missing` kalır.

---

## 9. Teknik Kalite ve Test Planı

### 9.1 PR kalite kapısı

```bash
npm run lint
npm run typecheck
npm run build
npm run test:e2e
```

### 9.2 Sprint 2 kritik yolculukları

| Akış | Beklenen sonuç | Otomasyon |
| --- | --- | --- |
| Landing → sample | AI beklemeden gerçek blueprint örneği | Eklenecek P0 |
| Landing → wizard → project | Proje oluşur ve workspace açılır | Mevcut E2E |
| Project → generation | Job 202, polling ve tamamlanma | Mevcut E2E/mock |
| Regenerate → refresh | Yeni section persist edilir | Mevcut smoke/E2E |
| Copy/README/JSON export | Doğru çıktı üretilir | Mevcut E2E |
| Bootcamp report | Gerçek notlardan report oluşur ve saklanır | Mevcut E2E |
| Dashboard | Proje listesi ve ordering doğru | Mevcut E2E |
| Invalid/rate-limited request | Güvenli 4xx/429 ve secret-safe log | Route/provider test |

### 9.3 Canlı AI smoke politikası

- CI gerçek provider kullanmaz.
- Manuel smoke düşük frekansla ve kontrollü yapılır.
- Önce tek section, sonra gerekiyorsa full pipeline denenir.
- 429/5xx, invalid JSON ve timeout sonucu kaydedilir.
- Key, ham prompt veya özel fikir screenshot/log içine girmez.
- Demo, free router erişilebilirliğine tek başına bağımlı bırakılmaz.

### 9.4 Doküman kalite kapısı

- `git diff --check` temiz,
- tüm relative linkler çözülüyor,
- resmî tarihler master planla aynı,
- current/future teknoloji ayrımı doğru,
- README story durumları issue ve kodla çelişmiyor.

---

## 10. Risk Kaydı ve Kontenjan

| Risk | Olasılık | Etki | Tetikleyici | Önlem | Kontenjan | Owner |
| --- | --- | --- | --- | --- | --- | --- |
| Ürün anlaşılmıyor | Yüksek | Çok yüksek | 5-second test başarısız | Hero + Before/After + sample | Copy sadeleştir, gerçek output göster | PO |
| OpenRouter 429 | Orta-yüksek | Yüksek | 429/503 | Retry/backoff | Curated sample | Kemal |
| Full generation >180s | Yüksek | Yüksek | Uzun job | Event contract/progressive plan | Demo sample | Kemal |
| Sample schema drift | Orta | Yüksek | Fixture parse fail | Schema validation | Versioned fixture | Selin |
| Evidence eksik | Orta | Çok yüksek | 18 Temmuz görsel yok | Günlük evidence owner | Gerçek kaynakla açıkça backfill | SM |
| Scope creep | Yüksek | Yüksek | 18 Temmuz yeni feature | Code freeze | P1 drop | PO |
| README/issue çelişkisi | Yüksek | Orta | Open issue `done` etiketli | Board audit | Partial/code-complete | SM |
| Secret/privacy sızıntısı | Düşük | Çok yüksek | Screenshot/log | Redaction/safe logs | Key revoke/rotate | Ekip |

### 10.1 Sprint 2 drop sırası

Zaman yetmezse:

1. Command Center görsel prototipi düşer; data mapping notu korunur.
2. Event backend implementasyonu Sprint 3'e taşınır; contract korunur.
3. Extra landing animasyonları düşer.
4. Yeni refine aksiyonları düşer.

Asla düşürülmez:

- gerçek sample,
- sahte iddiaların kaldırılması,
- kalite kapısı,
- altı zorunlu kanıt,
- Review/Retro,
- Sprint 3 carryover listesi.

---

## 11. Sprint Review Planı

> **Not:** Sprint 2 kapanışında gerçekleşen toplantının gerçek dökümü **[Sprint 2 Review Kaydı](evidence/sprint-2/review/summary.md)** dosyasına işlenmiştir.

### 11.1 Demo sırası

1. Landing'de ürün vaadi ve Before/After,
2. AI beklemeden curated sample,
3. wizard ile gerçek proje oluşturma,
4. generation job ve pixie workspace,
5. Output Hub bölümleri,
6. regenerate ve persistence,
7. README/JSON export,
8. Bootcamp Mode,
9. test/CI ve bilinen sınırlamalar.

### 11.2 Review'da cevaplanacak sorular

- Sprint Goal gerçekten karşılandı mı?
- Kullanıcı BuildPixies'i 5 saniyede anlayabiliyor mu?
- Sample, gerçek product value gösteriyor mu?
- Hangi işler Done, Code Complete, Partial veya taşındı?
- 252 saniyelik üretim ve 429 riski nasıl yönetiliyor?
- Sprint 3'ün ilk teknik bağımlılığı hazır mı?
- Altı Bootcamp kanıtı erişilebilir mi?

### 11.3 Review kayıt şablonu

```md
## Sprint 2 Review — 19 Temmuz 2026

### Sprint Goal sonucu
- Kullanıcıların fikirden yola çıkarak BuildPixies proje workspace'ine ulaşması, OpenRouter üzerinden AI destekli validated blueprint üretmesi ve sonucu proje kaydında görmesi hedefine ulaşıldı.
- Yeni kullanıcıların beklemeden ürünün değerini anlayabilmesi için Sample Blueprint akışı devreye alındı.

### Demo edilen artış
- Landing sayfasında before/after UX deneyimi ile ürün vaadinin kanıtlanması.
- AI beklemeden anında görüntülenebilen Curated Sample Blueprint ürünü.
- Gerçek proje oluşturma, generation job çalıştırma ve Pixie workspace süreçleri.
- Output Hub üzerinden projelerin Markdown ve JSON formatlarında dışa aktarılması.
- Bölüm bazlı regenerate yeteneği ve partial update (kısmi güncelleme) yeteneği.
- Sadece gerçek kayıtları temel alan kaynak odaklı Bootcamp Mode.

### Tamamlanan story'ler
- BP-001R: Landing ürünü 5 saniyede doğru anlatır
- BP-002R / BP-030: Curated sample schema-safe ve versiyonlu olur
- BP-029: Sahte sosyal kanıt ve ölü CTA kaldırılır
- BP-042: Evidence klasörü ve naming standardı belirlenir
- BP-043: Sprint 2 altı zorunlu README maddesi tamamlanır
- PR #11: Output Markdown/JSON export ve Regenerate yetenekleri entegre edilir

### Taşınan / başarısız işler
- BP-008R-S2 / BP-008-S3: Pixie event sözleşmesinin implementasyonu (Event contract tasarlandı ancak UI entegrasyonu Sprint 3'e taşındı).
- BP-031-S2 / BP-031-S3: Partial persistence (Tasarım tamamlandı, uygulama Sprint 3'e taşındı).
- Command Center alan eşlemesi görsel prototipi (Zaman kısıtı nedeniyle düşürüldü).
- Üretim ortamında (Production) Vercel/Supabase tam smoke testi (Sprint 3 RC sürümüne taşındı).

### Kalite sonucu
- lint: Geçti (0 hata)
- typecheck: Geçti (0 hata)
- build: Geçti (Başarılı build)
- E2E: Geçti (Tüm kritik demolar başarılı)
- CI URL: GitHub Actions workflow üzerinde yeşil

### Kararlar
- AI jenerasyon süresinin çok uzun olması nedeniyle, ürünün bir sonraki aşamasında progresif yükleme (SSE/Polling) ve event bazlı mimarinin zorunlu bir öncelik olmasına karar verildi.
- Kanıt toplama süreçlerinin sprint sonuna sıkışması kapanış stresini artırdığından, Sprint 3 itibarıyla tüm dokümantasyon ve daily kayıtlarının gününde yapılması kararlaştırıldı.

### Katılımcılar
- Muhammed Köseoğlu (Product Owner)
- Alperen Avan (Scrum Master)
- Kemal Ersin Özkan (Developer)
- Selin Akkaş (Developer)
```

---

## 12. Sprint Retrospective Planı

> **Not:** Sprint 2 kapanışında elde edilen iyi/zorlayan tecrübeler ve aksiyon tablosu **[Sprint 2 Retrospective Kaydı](evidence/sprint-2/retrospective/summary.md)** dosyasına işlenmiştir.

### 12.1 Tartışma çerçevesi

- Ne işe yaradı?
- Kullanıcı değeri nerede görünmez kaldı?
- AI/runtime riski ne zaman fark edildi?
- Review/evidence işi ne kadar erken başladı?
- PR #11 inceleme ve hardening akışı nasıl çalıştı?
- Sprint 3'te bırakılması gereken iş nedir?

### 12.2 Aksiyon standardı

En fazla üç aksiyon seçilir. Her aksiyon:

- tek owner,
- hedef tarih,
- ölçülebilir başarı kriteri,
- bağlı story içerir.

```md
| Aksiyon | Owner | Tarih | Başarı ölçütü | Story |
| --- | --- | --- | --- | --- |
| Pixie Event altyapısının kodlanması ve arayüze entegrasyonu | Kemal | 24 Temmuz | Gerçek SSE/polling event'lerinin UI'a yansıması | BP-008-S3 |
| Partial Persistence altyapısının yazılması | Selin | 25 Temmuz | Hata anında `partial_error` statüsüyle verinin korunması | BP-031-S3 |
| Sprint kanıtları için günlük ekran görüntüsü ve belge alınması | Alperen | Sprint 3 sonu | Kanıtların son güne sıkışmaması ve eksiksiz arşivlenmesi | S3-Retro |
```

---

## 13. Sprint 2 Definition of Done

### 13.1 Ürün

- [x] Landing ürünün gerçek değerini kanıtsız iddia olmadan anlatıyor.
- [x] Sample blueprint AI key olmadan açılıyor.
- [x] Kullanıcı proje oluşturabiliyor.
- [x] Validated blueprint üretilebiliyor.
- [x] Blueprint project/job'a kaydoluyor.
- [x] Regenerate sonucu kalıcı yazılıyor.
- [x] Markdown/README/JSON export çalışıyor.
- [x] Bootcamp Mode gerçek notlarla rapor üretiyor.
- [x] Event contract Sprint 3 uygulamasına hazır.

### 13.2 Kalite

- [x] GitHub Actions kalite hattı var.
- [x] Kritik demo Playwright testi var.
- [x] Sample akışı E2E kapsamında.
- [x] Final lint/typecheck/build/E2E yeşil.
- [x] Main ve origin senkron, worktree temiz.
- [x] Açık P0 blocker yok veya açıkça Sprint 3'e taşınmış.

### 13.3 Bootcamp kanıtı

- [x] Backlog dağıtma mantığı README'de.
- [x] Tarihli Daily Scrum notları README/evidence içinde.
- [x] Board başlangıç/orta/son kanıtı.
- [x] Güncel ürün screenshotları.
- [x] Review, kararlar ve gerçek katılımcılar.
- [x] Retro, owner ve tarihlendirilmiş aksiyonlar.

Sprint 2 ancak üç alt grubun tüm P0 maddeleri kapanınca Done sayılır.

---

## 14. Sprint 3'e Handoff

### 14.1 Zorunlu teknik input

- reviewed GenerationEvent tipi,
- partial blueprint persistence tasarımı,
- sample fixture ve ortak output component'leri,
- gerçek generation latency/429 gözlemleri,
- Sprint 2 known limitations listesi.

### 14.2 Zorunlu ürün input

- 5-second test sonuçları,
- landing/sample acceptance kararı,
- Command Center alan eşlemesi,
- output gruplama önerisi,
- yeni tasarım screenshotları.

### 14.3 Zorunlu Scrum input

- Sprint 2 Review ve Retro,
- tamamlanan ve taşınan story listesi,
- Sprint 3 capacity teyidi,
- ekip roster/form teyidi,
- altı kanıtın relative bağlantıları.

### 14.4 İlgili belgeler

- [`Sprint 1 kapanış kaydı`](sprint-1.md)
- [`Sprint 3 final planı`](sprint-3.md)
- [`Bootcamp master planı`](plan.md)
- [`Bootcamp kılavuzu`](bootcamp.md)
- [`Bilgilendirme toplantısı`](<bootcamp bilgilendirme toplantısı.md>)
- [GitHub Issues](https://github.com/avanalperen/BuildPixies/issues)
- [GitHub Actions](https://github.com/avanalperen/BuildPixies/actions)

