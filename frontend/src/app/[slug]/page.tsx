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
    {
      uri: `/${slug}/`,
    }
  );

  const page = data.page;

  if (!page) {
    notFound();
  }

  return (
    <main className="w-full min-h-screen px-6 py-10 md:px-10 lg:px-16">
      <article className="mx-auto w-full max-w-5xl">

        <h1 className="mb-8 text-4xl font-bold">
          {page.title}
        </h1>

        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{
            __html: page.content,
          }}
        />

      </article>
    </main>
  );
}