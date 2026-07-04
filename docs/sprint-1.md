# Sprint 1 — BuildPixies

**Dönem:** 19 Haziran – 5 Temmuz 2026
**Sprint hedefi:** BuildPixies web pivot kararını belgelemek; repo, plan,
README, backlog ve proje iskeletini (Next.js + mimari) oturtmak.

## Definition of Done

- Repo public (GitHub'a push bekliyor)
- README'de ürün fikri, backlog, roller var
- Web pivot karar kaydı (`docs/decision-log.md`) var
- Next.js 16 + TypeScript + Tailwind v4 + shadcn/ui kurulu
- Landing page, dashboard, new project, workspace, output hub iskeletleri var
- AI orchestrator (role-based pipeline) ve API route'ları hazır
- Sprint 1 notları README'de

## Yapılacaklar / Durum

- [x] Ürün adı seçildi: BuildPixies
- [x] Public GitHub repo aç ve push (avanalperen/yza-t04-devinabox)
- [x] README template (BootcampScrumTemplate formatında)
- [x] Ürün açıklaması, özellikleri, hedef kitle
- [x] Product backlog (README + plan)
- [x] Web pivot kararı (`docs/decision-log.md`)
- [x] Proje planı (`docs/plan.md`)
- [x] Next.js + Tailwind v4 + shadcn/ui kurulumu
- [x] Tema (lavender/violet cute SaaS)
- [x] Tip tanımları (types/project, output, pixie)
- [x] lib/ai (orchestrator, client, prompts, schemas, sample, pixies/)
- [x] lib/supabase (client, server) + lib/projects.ts (in-memory fallback)
- [x] lib/export/markdown.ts
- [x] API route'ları (projects, generate-blueprint, regenerate-output, export-readme)
- [x] Landing component'leri (navbar, hero, how-it-works, pixie-section, output-preview, footer)
- [x] Pixie component'leri (pixie-card, pixie-team)
- [x] Project component'leri (project-card, new-project-form, workspace)
- [x] Output component'leri (output-hub)
- [x] Sayfalar (landing, dashboard, projects/new, projects/[id])
- [x] GitHub Projects board oluşturuldu
- [x] Ekran görüntüleri alındı ve README'ye eklendi
- [ ] Takıma ve asistana durum mesajı gönder
- [x] Sprint 1 review ve retro (README'de)

## Bootcamp Gereksinimleri (README'de zorunlu 6 madde)

1. **Backlog dağıtma mantığı** — P0 story'ler seçildi; repo, README, fikir ve
   Next.js iskeleti önceliklendirildi. Sprint başında tek geliştiriciydi;
   sprint sonuna doğru takım (3 kişi) oluştu. Puan hedefi gerçekçi tutuldu.
2. **Daily Scrum notları** — Sprint başında solo yürüdü; takım oluşunca
   Slack/WhatsApp üzerinden günlük short sync'lere geçildi. Günlük özet
   README'de Sprint 1 bölümünde.
3. **Sprint board updates** — GitHub Issues üzerinden board oluşturuldu.
   Tüm P0 story'ler issue olarak açıldı ve "done" olarak işaretlendi.
   [Board](https://github.com/avanalperen/yza-t04-devinabox/issues)
4. **Ürün durumu** — Ekran görüntüleri alındı (4 Temmuz 2026). Landing,
   dashboard, new project, workspace screenshot'ları README'de.
5. **Sprint Review** — Mobil→web pivot yapıldı; fikir/repo/README/backlog/plan
   hazır; Next.js + AI orchestrator iskeleti kuruldu. Takım sprint sonuna
   doğru 3 kişiye tamamlandı.
6. **Sprint Retrospective** — Takım iletişim kanalları oturtuldu; Sprint 2'de
   üç kişi tam kapasite kodlamaya geçilecek; gerçek AI generation akışını
   ve pixie animasyonlarını güçlendirmek gerekiyor.

## Sprint Review

Alınan kararlar:
- Mobil uygulama yerine web uygulamasına pivot (demo/deploy/output avantajı).
- Ürün adı BuildPixies olarak belirlendi.
- Takım 3 kişiye tamamlandı: PO, SM, Developer (plan bölüm 22).
- Next.js App Router + Route Handlers + Supabase + OpenAI stack'i seçildi.
- Tailwind v4 + shadcn/ui (base-nova) benimsendi.

Çıkan ürünün çalışmasında sorun yok; geliştirme ortamı ayağa kalktı.
Katılımcılar: Muhammed Köseoğlu, Alperen Avan, Kemal Ersin Özkan.

## Sprint Retrospective

- İyi gitti: Plana sadık kalarak Sprint 1'de hem dokümantasyon hem iskelet
  tamamlandı.
- İyileştirilecek: Takım iletişimi yeniden denenecek; durum asistana
  bildirilecek.
- Aksiyon: Sprint 2 ilk gününde gerçek AI generation akışını çalıştırıp ekran
  görüntülerini almak.
