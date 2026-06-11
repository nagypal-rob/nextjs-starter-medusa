// ─────────────────────────────────────────────────────────────────────────
// Banner / hero slider content.
//
// This is the ONE place to edit the homepage slider. Add/remove/reorder slides
// freely. To use a real image, drop the file into `public/banners/` and set
// `image: "/banners/your-file.jpg"`. Without an image, the `gradient` is shown.
// `href` is automatically prefixed with the country code (e.g. "/store" -> "/hu/store").
// ─────────────────────────────────────────────────────────────────────────

export type BannerSlide = {
  eyebrow?: string
  title: string
  subtitle?: string
  ctaLabel?: string
  href: string
  /** Optional background image, e.g. "/banners/sale.jpg" (file in public/banners/). */
  image?: string
  /** Tailwind gradient classes, used as the background when `image` is not set. */
  gradient: string
}

export const bannerSlides: BannerSlide[] = [
  {
    eyebrow: "Brewgear",
    title: "Főzd otthon a tökéletes sört",
    subtitle:
      "Prémium sörfőző készletek, alapanyagok és felszerelés kezdőknek és profiknak.",
    ctaLabel: "Irány a bolt",
    href: "/store",
    gradient: "from-amber-500 via-amber-600 to-amber-800",
  },
  {
    eyebrow: "Alapanyagok",
    title: "Maláta, komló, élesztő",
    subtitle: "Friss, válogatott alapanyagok a legjobb európai beszállítóktól.",
    ctaLabel: "Alapanyagok böngészése",
    href: "/store",
    gradient: "from-yellow-600 via-orange-600 to-orange-800",
  },
  {
    eyebrow: "Felszerelés",
    title: "Erjesztők, főzőrendszerek, kiegészítők",
    subtitle: "Minden, amire a főzés minden lépéséhez szükséged lehet.",
    ctaLabel: "Felszerelés megtekintése",
    href: "/store",
    gradient: "from-stone-600 via-stone-700 to-stone-900",
  },
]
