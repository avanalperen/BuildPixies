# Final Teslim Checklist (BP-045)

> **Resmî son sınır:** 2 Ağustos 2026, 23:59 · **Takım hedefi:** 18:00
> Runbook: `docs/sprint-3.md` §6.14

## A. Kod ve kalite — ✅ tamamlandı

- [x] `npm run lint` temiz
- [x] `npm run typecheck` temiz
- [x] `npm run build` temiz
- [x] `npm run test:e2e` 11/11
- [x] `npm audit --omit=dev` 0 açık
- [x] Tüm iş `main` branch'inde
- [x] GitHub Actions kalite kapısı aktif

## B. Bootcamp zorunlu altı kanıt

| Kanıt | Sprint 1 | Sprint 2 | Sprint 3 |
| --- | --- | --- | --- |
| Backlog dağıtma mantığı | ✅ | ✅ | ✅ README |
| Daily Scrum | ✅ | ✅ | ⬜ `evidence/sprint-3/daily/` |
| Sprint Board Updates | ✅ | ✅ | ⬜ `evidence/sprint-3/board/` |
| Ürün Durumu | ✅ | ✅ | ✅ `evidence/sprint-3/product/` |
| Sprint Review | ✅ | ✅ | ⬜ README + `evidence/sprint-3/review/` |
| Sprint Retrospective | ✅ | ✅ | ⬜ README + `evidence/sprint-3/retrospective/` |

⬜ olanlar takımın gerçek verisini gerektirir; uydurulmaz.

## C. Repo hijyeni

- [x] Repo public
- [x] README ürün, takım, backlog, mimari bilgisi içeriyor
- [x] Bilinen sınırlamalar açıkça yazılı
- [x] Karar kayıtları `docs/decision-log.md` (ADR-001…ADR-014)
- [ ] Release tag atıldı (öneri: `v1.0.0-bootcamp`)
- [ ] Son commit SHA kaydedildi (rollback referansı)

## D. Video

- [ ] Kayıt yapıldı (metin: [`video-script.md`](video-script.md))
- [ ] Süre ≤ 3:00
- [ ] YouTube'a yüklendi
- [ ] Gizli sekmede oynatma doğrulandı
- [ ] Link README'ye eklendi
- [ ] Yerel yedek saklandı

## E. Güvenlik son kontrolü

- [x] `.env*` dosyaları `.gitignore`'da, repoda yalnız `.env.example` var
- [x] Client bundle'da secret yok (tarama kanıtı: `security-audit.md`)
- [x] Loglarda ham prompt / model çıktısı / anahtar yok
- [ ] Video kaydında konsol veya env görünmüyor

## F. Form gönderimi

- [ ] Takım ve ürün bilgileri
- [ ] Public repo linki
- [ ] YouTube video linki
- [ ] Canlı URL alanı: **yok** — "deploy-ready, canlıya alınmadı" notu ve
      `docs/evidence/sprint-3/product/deploy-readiness.md` referansı
- [ ] İkinci kişi review (typo / kırık link)
- [ ] Gönderim ekran görüntüsü saklandı (submission proof)

---

## Canlıya almak gerekirse (kod değişikliği gerekmez)

1. `supabase db push` — altı migration
2. Environment: `NEXT_PUBLIC_SUPABASE_URL`,
   `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_SERVICE_ROLE_KEY`,
   `OPENROUTER_API_KEY`, `BUILDPIXIES_REQUIRE_SUPABASE=1`
3. `VERCEL=1` platformda otomatik gelir; durable queue ve zorunlu Supabase
   storage kendiliğinden devreye girer.
