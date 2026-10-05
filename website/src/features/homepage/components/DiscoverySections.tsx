"use client";

import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { env } from "@/config/env";
import { productPaths } from "@/features/products";
import { client } from "@/sanity/client";
import { HOME_TAXONOMIES_QUERY } from "@/sanity/queries";

type Taxonomy = {
  _type: "scentFamily" | "occasion";
  slug: string;
  title?: string | null;
};

type DiscoveryTile = {
  slug: string;
  title: string;
  detail: string;
  image: string;
};

const SCENT_FAMILIES: DiscoveryTile[] = [
  {
    slug: "floral",
    title: "Floral",
    detail: "Rose, Jasmine, Neroli",
    image: "/images/home/archetype-floral.png",
  },
  {
    slug: "woody",
    title: "Woody",
    detail: "Cedarwood, Oud, Santal",
    image: "/images/home/archetype-woody.png",
  },
  {
    slug: "oriental",
    title: "Oriental",
    detail: "Amber, Spices, Vanilla",
    image: "/images/home/archetype-oriental.png",
  },
  {
    slug: "fresh",
    title: "Fresh",
    detail: "Citrus, Marine, Herbs",
    image: "/images/home/archetype-fresh.png",
  },
];

const OCCASIONS: DiscoveryTile[] = [
  {
    slug: "personal-use",
    title: "Personal Use",
    detail: "Everyday luxury as second skin",
    image: "/images/home/occasion-personal-use.png",
  },
  {
    slug: "wedding",
    title: "Wedding",
    detail: "Immortalize the vows with notes of white jasmine",
    image: "/images/home/occasion-wedding.png",
  },
  {
    slug: "gift-sets",
    title: "Gift Sets",
    detail: "A bespoke gesture of ultimate prestige",
    image: "/images/home/occasion-gift-sets.png",
  },
  {
    slug: "birthday",
    title: "Birthday",
    detail: "Vibrant, celebrating a personal revolution",
    image: "/images/home/occasion-birthday.png",
  },
];

function taxonomyHref(
  type: Taxonomy["_type"],
  slug: string,
  taxonomies: Taxonomy[],
) {
  const cmsSlug = taxonomies.find(
    (taxonomy) => taxonomy._type === type && taxonomy.slug === slug,
  )?.slug;
  const parameter = type === "scentFamily" ? "scentFamily" : "occasion";
  return `${productPaths.list}?${parameter}=${encodeURIComponent(cmsSlug ?? slug)}`;
}

function SectionHeading({
  id,
  title,
  subtitle,
}: {
  id: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex w-full flex-col items-center gap-3 text-center">
      <h2
        id={id}
        className="w-full font-[family-name:var(--font-instrument-serif)] text-[38px] leading-[1.1] text-[#1a1a1a] sm:text-[48px]"
      >
        {title}
      </h2>
      <p className="w-full text-[12px] font-normal uppercase text-[#605a54] sm:text-[14px]">
        {subtitle}
      </p>
    </div>
  );
}

function DiscoveryTileLink({
  tile,
  href,
  overlay = false,
}: {
  tile: DiscoveryTile;
  href: string;
  overlay?: boolean;
}) {
  return (
    <Link
      href={href}
      className={
        overlay
          ? "group relative flex h-[190px] min-w-0 flex-col justify-end overflow-hidden rounded-lg p-5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c5a880] sm:h-[230px] sm:p-6 xl:h-[280px]"
          : "group flex min-w-0 flex-col gap-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c5a880]"
      }
    >
      <div
        className={
          overlay
            ? "absolute inset-0"
            : "relative h-[190px] overflow-hidden rounded-md sm:h-[220px] xl:h-[240px]"
        }
      >
        <Image
          src={tile.image}
          alt={overlay ? "" : tile.title}
          fill
          sizes="(min-width: 1280px) 22vw, (min-width: 640px) 45vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.025]"
        />
        {overlay ? (
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-[rgba(26,26,26,0.4)]"
          />
        ) : null}
      </div>
      <span
        className={
          overlay
            ? "relative flex w-full flex-col gap-1"
            : "flex w-full flex-col gap-1"
        }
      >
        <span
          className={
            overlay
              ? "font-[family-name:var(--font-instrument-serif)] text-[28px] leading-[normal] text-white"
              : "font-[family-name:var(--font-instrument-serif)] text-[24px] leading-[normal] text-[#1a1a1a]"
          }
        >
          {tile.title}
        </span>
        <span
          className={
            overlay
              ? "text-[11px] font-normal uppercase text-[#c5a880]"
              : "text-[13px] font-normal text-[#605a54]"
          }
        >
          {tile.detail}
        </span>
      </span>
    </Link>
  );
}

export function DiscoverySections() {
  const taxonomyQuery = useQuery({
    queryKey: ["homepage", "taxonomies"],
    queryFn: async () => {
      if (env.useMockApi) return [];
      return client.fetch<Taxonomy[]>(HOME_TAXONOMIES_QUERY);
    },
    staleTime: 30_000,
  });
  const taxonomies = taxonomyQuery.data ?? [];

  return (
    <>
      <section
        id="scent-archetypes"
        aria-labelledby="scent-archetypes-title"
        className="flex w-full flex-col items-start gap-12 bg-[#f4f0eb] px-5 py-16 sm:px-6 lg:px-20 lg:py-20"
      >
        <div className="w-full">
          <SectionHeading
            id="scent-archetypes-title"
            title="Scent Archetypes"
            subtitle="Curate your presence by scent profile"
          />
        </div>
        <div className="grid w-full grid-cols-2 gap-4 sm:gap-5 xl:grid-cols-4">
          {SCENT_FAMILIES.map((tile) => {
            const taxonomy = taxonomies.find(
              (item) => item._type === "scentFamily" && item.slug === tile.slug,
            );

            return (
              <DiscoveryTileLink
                key={tile.slug}
                tile={{ ...tile, title: taxonomy?.title || tile.title }}
                href={taxonomyHref("scentFamily", tile.slug, taxonomies)}
                overlay
              />
            );
          })}
        </div>
      </section>
      <section
        aria-labelledby="occasions-title"
        className="flex w-full flex-col items-start gap-12 px-5 py-16 sm:px-6 lg:px-20 lg:py-[100px]"
      >
        <div className="w-full">
          <SectionHeading
            id="occasions-title"
            title="Occasional Scent Curation"
            subtitle="Intentionally formulated for significant moments"
          />
        </div>
        <div className="grid w-full grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 xl:grid-cols-4">
          {OCCASIONS.map((tile) => {
            const taxonomy = taxonomies.find(
              (item) => item._type === "occasion" && item.slug === tile.slug,
            );

            return (
              <DiscoveryTileLink
                key={tile.slug}
                tile={{ ...tile, title: taxonomy?.title || tile.title }}
                href={taxonomyHref("occasion", tile.slug, taxonomies)}
              />
            );
          })}
        </div>
      </section>
    </>
  );
}
