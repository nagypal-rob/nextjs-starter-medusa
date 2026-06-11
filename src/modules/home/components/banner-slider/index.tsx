"use client"

import { useCallback, useEffect, useState } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { bannerSlides } from "./slides"

const AUTOPLAY_MS = 5000

const BannerSlider = () => {
  const count = bannerSlides.length
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  const go = useCallback(
    (i: number) => setIndex(((i % count) + count) % count),
    [count]
  )

  useEffect(() => {
    if (paused || count <= 1) return
    const t = setInterval(() => setIndex((p) => (p + 1) % count), AUTOPLAY_MS)
    return () => clearInterval(t)
  }, [paused, count])

  if (count === 0) return null

  return (
    <div
      className="relative w-full overflow-hidden border-b border-ui-border-base"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="flex h-[55vh] small:h-[70vh] transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {bannerSlides.map((s, i) => (
          <div
            key={i}
            className={`relative min-w-full h-full bg-gradient-to-br ${s.gradient}`}
          >
            {s.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={s.image}
                alt={s.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-black/20" />
            <div className="relative z-10 h-full max-w-3xl flex flex-col justify-center gap-4 px-6 small:px-24">
              {s.eyebrow && (
                <span className="text-white/90 uppercase tracking-widest text-xs small:text-sm">
                  {s.eyebrow}
                </span>
              )}
              <h2 className="text-white text-3xl small:text-5xl font-semibold leading-tight">
                {s.title}
              </h2>
              {s.subtitle && (
                <p className="text-white/90 text-base small:text-xl max-w-xl">
                  {s.subtitle}
                </p>
              )}
              {s.ctaLabel && (
                <LocalizedClientLink
                  href={s.href}
                  className="mt-2 inline-flex w-fit rounded-md bg-white px-6 py-3 text-base font-medium text-ui-fg-base transition hover:bg-white/90"
                >
                  {s.ctaLabel}
                </LocalizedClientLink>
              )}
            </div>
          </div>
        ))}
      </div>

      {count > 1 && (
        <>
          <button
            type="button"
            aria-label="Előző"
            onClick={() => go(index - 1)}
            className="absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/30 text-2xl text-white backdrop-blur transition hover:bg-white/50"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Következő"
            onClick={() => go(index + 1)}
            className="absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/30 text-2xl text-white backdrop-blur transition hover:bg-white/50"
          >
            ›
          </button>

          <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-2">
            {bannerSlides.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`${i + 1}. dia`}
                onClick={() => go(i)}
                className={`h-2.5 rounded-full transition-all ${
                  i === index ? "w-7 bg-white" : "w-2.5 bg-white/50"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default BannerSlider
