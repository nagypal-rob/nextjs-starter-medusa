import LocalizedClientLink from "@modules/common/components/localized-client-link"

// Edit these tiles freely. `href` is country-code prefixed automatically.
// Point them at real categories/collections once the catalog is in, e.g.
// "/categories/malts" or "/collections/sale".
const tiles = [
  {
    title: "Sörfőző készletek",
    subtitle: "Kezdő és haladó szettek",
    href: "/store",
    gradient: "from-amber-500 to-amber-700",
  },
  {
    title: "Alapanyagok",
    subtitle: "Maláta · komló · élesztő",
    href: "/store",
    gradient: "from-yellow-600 to-orange-700",
  },
  {
    title: "Erjesztés & felszerelés",
    subtitle: "Minden a főzéshez",
    href: "/store",
    gradient: "from-stone-600 to-stone-800",
  },
]

const PromoTiles = () => {
  return (
    <section className="content-container py-12">
      <div className="grid grid-cols-1 small:grid-cols-3 gap-4">
        {tiles.map((t) => (
          <LocalizedClientLink
            key={t.title}
            href={t.href}
            className={`group relative flex h-44 flex-col justify-end overflow-hidden rounded-lg bg-gradient-to-br ${t.gradient} p-6`}
          >
            <div className="absolute inset-0 bg-black/10 transition group-hover:bg-black/25" />
            <h3 className="relative text-xl font-semibold text-white">
              {t.title}
            </h3>
            <p className="relative text-sm text-white/90">{t.subtitle}</p>
          </LocalizedClientLink>
        ))}
      </div>
    </section>
  )
}

export default PromoTiles
