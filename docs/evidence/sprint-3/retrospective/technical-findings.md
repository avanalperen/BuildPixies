# Sprint 3 — Retrospektif (teknik girdi)

> **Kapsam:** Bu belge sprint boyunca **fiilen yaşanan** teknik olaylardan
> çıkarılan derslerdir; her madde bir commit, ADR veya test çıktısıyla
> eşleşir. Takımın süreç/iletişim retrospektifi ayrıca eklenecektir.

## İyi giden

- **Strict şema disiplini işe yaradı.** On bir bölümün her biri Zod ile
  doğrulandığı için model çıktısındaki bozulmalar UI'a hiç ulaşmadı; şema
  hatasında bölüm bir kez daha üretildi.
- **Kanıtı koda bağlamak.** "Done" demek yerine E2E senaryosu yazmak, sprint
  boyunca üç kez gerçek hata yakalattı (aşağıya bakınız).
- **Küçük, gerekçeli kapsam kararları.** Canlı deploy ve CAPTCHA düşerken
  nedenleri ADR'ye yazıldı; teslimde "yapamadık" değil "şu nedenle
  yapmadık, yerine bunu kanıtladık" denebiliyor.

## Zorluklar ve öğrenimler

### 1. Altyapı vardı, bağlanmamıştı

`OrchestratorEvent` / `onEvent` tipi sprint 2'de tasarlanmış ama hiçbir çağıran
bağlamamıştı. UI'daki pixie durumları tamamen dekoratifti ve bu, ürünün imza
özelliğiydi.

**Ders:** "Tip tanımlandı" ile "davranış çalışıyor" arasındaki farkı Definition
of Done'da ayırmak gerekiyor. Bir sözleşme, onu tüketen bir test yoksa
tamamlanmış sayılmamalı.

### 2. Tek bölüm hatası tüm koşuyu çöpe atıyordu

Gerçek bir OpenRouter koşusunda `testPlan` 90 saniyede timeout aldı ve o ana
kadar üretilmiş **8 bölüm** kayboldu; yaklaşık 3 dakikalık iş boşa gitti.

**Ders:** Uzun ve parçalı işlerde "hep ya da hiç" varsayımı pahalı. Kısmi
kayıt ve geçici hata için tekrar deneme eklendi; ama kalıcı hatada hâlâ tüm
pipeline yeniden çalışıyor — bu bilinen sınırlama olarak kaydedildi.

### 3. Dünkü güvenlik düzeltmesi bugünün açığı oldu

ADR-005'te bir postcss açığını kapatmak için eklenen `postcss@8.5.10`
sabitlemesi, aradan geçen sürede **kendisi açık bir sürümü** sabitler hale
gelmiş ve düzeltmeyi engelliyordu. Ayrıca Next.js'te oturum bootstrap'imizin
tam olarak kullandığı mekanizmaya dair bir **proxy bypass** advisory'si vardı.

**Ders:** Sabitlemeler (`overrides`) süresi dolan borçtur. Denetim, sprint
sonunda değil düzenli aralıklarla koşulmalı. README'nin "0 vulnerability"
iddiası aylardır doğrulanmamıştı.

### 4. Global override, ilgisiz bir aracı kırdı

`brace-expansion` override'ı global tanımlanınca ESLint'in eski `minimatch`
bağımlılığı `TypeError: expand is not a function` ile patladı.

**Ders:** Bağımlılık override'ları mümkün olan en dar kapsamda tanımlanmalı;
düzeltme tam kalite kapısından geçirilmeden kabul edilmemeli.

### 5. Tasarım kararı ile şema gerçeği çelişti

ADR-010, kısmi sonuçların `projects.blueprint` alanına yazılmasını öngörüyordu.
Uygulamada bu, alanın strict tam blueprint şemasıyla okunması yüzünden proje
sayfasını parse hatasıyla düşürecekti.

**Ders:** Tasarım ADR'leri, dokunacakları şemayla birlikte gözden geçirilmeli.
Karar iptal edilmedi, depolama yeri revize edilip ADR'ye not düşüldü.

### 6. Görünürlük olmadan sorun görünmüyordu

2, 3 ve 5 numaralı bulguların hiçbiri plandan gelmedi; gerçek ilerleme
görünür hale gelince ortaya çıktılar.

**Ders:** Gözlemlenebilirlik bir "nice to have" değil, hata bulma aracı.

## Takım tarafından eklenecek

- [ ] 21–27 Temmuz arası `main`'e commit düşmemesinin nedeni
- [ ] İletişim ve availability değerlendirmesi
- [ ] Altı haftalık (Sprint 1→3) genel öğrenim
- [ ] **Owner ve hedef tarih atanmış aksiyonlar** (kural gereği zorunlu)
