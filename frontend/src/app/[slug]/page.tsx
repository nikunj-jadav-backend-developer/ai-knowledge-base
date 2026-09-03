import Image from "next/image";
import { notFound } from "next/navigation";

import { fetchGraphQL } from "@/lib/graphql";
import { GET_PAGE_BY_SLUG_QUERY } from "@/lib/queries";
import { NormalPage } from "@/types/page";

interface PageResponse {
  page: NormalPage | null;
}

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function WordPressPage({
  params,
}: PageProps) {
  const { slug } = await params;

  const data = await fetchGraphQL<PageResponse>(
    GET_PAGE_BY_SLUG_QUERY,
    { slug }
  );

  const page = data.page;

  if (!page) {
    notFound();
  }

  const featuredImage =
    page.featuredImage?.node;

  return (
    <main className="w-full min-h-screen">
      {/* Banner */}
      {featuredImage?.sourceUrl ? (
        <section className="relative w-full overflow-hidden">
          <div className="relative mx-auto h-[320px] w-full md:h-[420px] lg:h-[500px]">

            <Image
              src={featuredImage.sourceUrl}
              alt={featuredImage.altText || page.title}
              fill
              priority
              unoptimized
              className="object-cover object-center"
              sizes="100vw"
            />
          </div>
        </section>
      ) : (
        <section className="bg-slate-900 py-20">
          <div className="mx-auto max-w-6xl px-6 text-center">
            <h1 className="text-4xl font-bold text-white md:text-5xl">
              {page.title}
            </h1>
          </div>
        </section>
      )}

      {/* Content */}
      <article className="mx-auto w-full max-w-5xl px-6 py-10 md:px-10">
        {!featuredImage?.sourceUrl && (
          <h1 className="mb-8 text-4xl font-bold">
            {page.title}
          </h1>
        )}

        <div
          className="wordpress-content max-w-none"
          dangerouslySetInnerHTML={{
            __html: page.content,
          }}
        />
      </article>
    </main>
  );
}