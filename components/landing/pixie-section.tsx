import { PIXIES } from "@/types/pixie";

export function PixieSection() {
  return (
    <section id="pixies" className="pixie-gradient border-y">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <div className="mb-10 text-center">
          <h2 className="font-heading text-3xl font-bold">Meet your pixie team</h2>
          <p className="mt-2 text-muted-foreground">
            Each pixie owns a part of the product-building process.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3">
          {PIXIES.map((pixie) => (
            <div
              key={pixie.name}
              className="flex flex-col gap-2 rounded-2xl border bg-card p-5"
              style={{ borderColor: `${pixie.accent}33` }}
            >
              <div className="flex items-center gap-3">
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-base"
                  style={{ backgroundColor: `${pixie.accent}1a` }}
                >
                  {pixie.emoji}
                </span>
                <div>
                  <p className="font-heading font-semibold leading-tight">
                    {pixie.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{pixie.title}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{pixie.produces}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
