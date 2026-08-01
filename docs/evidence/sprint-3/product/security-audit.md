# Güvenlik ve Gözlemlenebilirlik Denetimi (BP-038)

> **Tarih:** 1 Ağustos 2026
> **Kapsam:** Üretim loglarının secret-safe olduğunun doğrulanması, client
> bundle secret taraması, bağımlılık denetimi.

## 1. Log yüzeyinin tamamı

Uygulamadaki **tüm** `console.*` çağrıları (kaynak taraması ile bulundu):

| Konum | Loglanan alanlar |
| --- | --- |
| `lib/ai/client.ts:188` | provider, model, errorName, status, errorType, retryAfter, requestId |
| `lib/ai/orchestrator.ts:98` | section, attempt, maxAttempts, errorMessage (sabit sağlayıcı mesajı) |
| `lib/ai/orchestrator.ts:153` | section, attempt, maxAttempts, issuePaths (alan yolu) |
| `lib/generation-worker.ts:176` | jobId, attemptCount, errorName, safeMessage |
| `app/error.tsx:15` | error.digest |

**Hiçbir çağrı** API anahtarı, ham prompt, kullanıcının fikir metni veya model
çıktısının içeriğini loglamaz.

Bu denetim sırasında bir sızıntı riski bulundu ve kapatıldı: `generation-worker`
ham `error.message` logluyordu; bir `ZodError` durumunda bu mesaj model
çıktısının alan adlarını taşıyabiliyordu. `getSafeErrorMessage` ile üretilen
`safeMessage`'a çevrildi, `errorName` tanılama için korundu.

İstemciye dönen hata gövdeleri de `getSafeErrorMessage` ile sabit metinlere
indirgenir; sağlayıcı ayrıntısı client'a taşınmaz.

## 2. Client bundle secret taraması

```bash
grep -rlE "OPENROUTER|SERVICE_ROLE|sk-or-|sk-[A-Za-z0-9]{20}" .next/static/
```

**Sonuç:** eşleşme yok. Server-only sırlar client bundle'a sızmıyor. Sunucu
modülleri `import "server-only"` ile korunuyor; Supabase publishable key dışında
`NEXT_PUBLIC_` değişkeni bundle'a girmiyor.

## 3. Bağımlılık denetimi

Denetim öncesi `npm audit --omit=dev` **4 high** açık gösteriyordu:

| Paket | Sorun |
| --- | --- |
| `next@16.2.10` | App Router'da **Middleware / Proxy bypass**, Server Actions DoS ve SSRF |
| `postcss@8.5.10` | sourceMappingURL üzerinden path traversal / bilgi ifşası |
| `sharp@0.34.x` | libvips kaynaklı 4 CVE |
| `brace-expansion@5.0.7` | sınırsız genişleme ile OOM (DoS) |

Proxy bypass advisory'si bu uygulama için özellikle önemliydi: oturum
bootstrap'i `proxy.ts` üzerinden çalışıyor.

**Yapılan:**

- `next` 16.2.10 → **16.2.12**, `eslint-config-next` aynı sürüme,
- ADR-005'te eklenen `postcss@8.5.10` sabitlemesi kaldırıldı; artık kendisi
  açık bir sürümü sabitliyordu. Yerine `postcss@8.5.25` override'ı,
- `sharp@^0.35.0` override'ı,
- `brace-expansion@^5.0.8` override'ı **yalnız `@vercel/queue` altında**
  daraltıldı; global override ESLint'in eski `minimatch`'ini kırıyordu.

**Denetim sonrası:**

```text
npm audit --omit=dev  →  found 0 vulnerabilities
npm audit (dev dahil) →  3 vulnerabilities (2 moderate, 1 high: fast-uri)
```

Kalan `fast-uri` açığı yalnız geliştirme/lint zincirindedir, üretim bundle'ına
girmez; kabul edilen risk olarak kaydedilmiştir.

## 4. Yükseltmenin doğrulanması

`AGENTS.md` bu Next sürümünün eğitim verisinden farklı olabileceğini
belirttiği için yükseltme tam kalite kapısından geçirildi:

```text
npm run lint       ✓
npm run typecheck  ✓
npm run build      ✓  (15 route, queue callback ayrı fonksiyon)
npm run test:e2e   ✓  9/9
```

Uygulama davranışında değişiklik gözlenmedi.
