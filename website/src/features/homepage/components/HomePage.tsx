import Image from "next/image";
import Link from "next/link";
import { productPaths } from "@/features/products";
import { DiscoverySections } from "@/features/homepage/components/DiscoverySections";
import { FeaturedProducts } from "@/features/homepage/components/FeaturedProducts";

export function HomePage() {
  return (
    <div className="w-full overflow-x-hidden bg-[#faf8f5] text-[#1a1a1a]">
      <section
        aria-labelledby="home-hero-title"
        className="relative flex h-[540px] w-full items-end px-5 pb-10 sm:h-[600px] sm:px-8 sm:pb-14 lg:h-[680px] lg:px-20 lg:pb-20"
      >
        <div aria-hidden="true" className="absolute inset-0">
          <Image
            src="/images/home/hero.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <span className="absolute inset-0 bg-[rgba(26,26,26,0.3)]" />
        </div>
        <div className="relative flex w-full max-w-[580px] flex-col items-start gap-6">
          <h1
            id="home-hero-title"
            className="font-[family-name:var(--font-instrument-serif)] text-[54px] leading-[0.98] text-white sm:text-[68px] lg:text-[80px]"
          >
            Narrative In A Glass
          </h1>
          <p className="text-[14px] leading-[1.6] font-normal text-white sm:text-[16px]">
            Ethereal extractions designed to evoke memory, stillness, and
            elegant presence. Crafted with deliberate restraint in our Parisian
            studio.
          </p>
          <Link
            href={productPaths.list}
            className="rounded-[4px] bg-[#c5a880] px-8 py-4 text-[11px] font-bold text-white uppercase transition-colors hover:bg-[#b7976e] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:px-10 sm:py-[18px] sm:text-[12px]"
          >
            Explore The Collections
          </Link>
        </div>
      </section>

      <section
        aria-labelledby="signatures-title"
        className="flex w-full flex-col items-start gap-12 px-5 py-16 sm:px-6 lg:gap-12 lg:px-20 lg:py-[100px]"
      >
        <div className="flex w-full flex-col items-center gap-3 text-center">
          <h2
            id="signatures-title"
            className="w-full font-[family-name:var(--font-instrument-serif)] text-[38px] leading-[1.1] sm:text-[48px]"
          >
            Olfactory Signatures
          </h2>
          <p className="w-full text-[12px] font-normal uppercase text-[#605a54] sm:text-[14px]">
            The currently highly coveted extractions
          </p>
        </div>
        <FeaturedProducts />
      </section>

      <DiscoverySections />

      <section className="flex w-full flex-col bg-[#f4f0eb] lg:h-[450px] lg:flex-row">
        <div className="relative h-[300px] w-full shrink-0 sm:h-[360px] lg:h-full lg:w-1/2">
          <Image
            src="/images/home/solstice-promo.png"
            alt="Perfume bottles and botanicals for the Solstice collection"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="flex w-full flex-col items-start justify-center gap-6 px-5 py-12 sm:px-8 lg:h-full lg:w-1/2 lg:p-16">
          <p className="text-[11px] font-bold text-[#c5a880] uppercase">
            The Summer Solstice
          </p>
          <h2 className="font-[family-name:var(--font-instrument-serif)] text-[42px] leading-[1.1] text-[#1a1a1a] sm:text-[54px]">
            Le Jardin d&apos;Or Solstice Collection
          </h2>
          <p className="text-[14px] leading-[1.6] text-[#605a54]">
            Our highly anticipated limited reserve capturing the fleeting scent
            of summer dusk. Formulated with night-blooming cereus and sun-warmed
            clay.
          </p>
          <Link
            href={productPaths.list}
            className="rounded-[4px] bg-[#1a1a1a] px-8 py-4 text-[11px] font-bold text-white uppercase transition-colors hover:bg-[#38332d] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c5a880] sm:px-8 sm:text-[12px]"
          >
            Secure the Bottle
          </Link>
        </div>
      </section>

      <section
        id="atelier-chronicles"
        aria-labelledby="atelier-chronicles-title"
        className="flex w-full flex-col items-center gap-8 px-5 py-16 text-center sm:px-6 lg:px-20 lg:py-[100px]"
      >
        <div className="flex w-full max-w-[600px] flex-col items-center gap-3">
          <h2
            id="atelier-chronicles-title"
            className="w-full font-[family-name:var(--font-instrument-serif)] text-[36px] leading-[1.1] sm:text-[40px]"
          >
            Atelier Chronicles
          </h2>
          <p className="text-[13px] leading-[1.6] text-[#605a54] sm:text-[14px]">
            Subscribe to receive exclusive access to Private Reserves, launch
            invitations, and seasonal olfactory compositions.
          </p>
        </div>
        <div className="flex w-full max-w-[500px] flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <label className="sr-only" htmlFor="newsletter-email">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            placeholder="Enter your email address"
            className="min-w-0 flex-1 rounded-[4px] border border-[#ebe6de] bg-white px-5 py-4 text-left text-[13px] text-[#1a1a1a] placeholder:text-[#605a54]"
          />
          <button
            type="button"
            className="rounded-[4px] bg-[#1a1a1a] px-8 py-4 text-[12px] font-bold text-white uppercase transition-colors hover:bg-[#38332d] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c5a880]"
          >
            Join
          </button>
        </div>
      </section>
    </div>
  );
}
