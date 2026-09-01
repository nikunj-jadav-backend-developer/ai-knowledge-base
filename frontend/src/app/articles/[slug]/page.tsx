import { notFound } from "next/navigation";
import { fetchGraphQL } from "@/lib/graphql";
import { GET_ARTICLE_BY_SLUG_QUERY } from "@/lib/queries";

export interface KnowledgeArticleDetails {
  difficulty: string[] | null;
  readingTime: number | null;
  aiSummary: string | null;
  keywords: string | null;
  documentationUrl: string | null;
  lastReviewed: string | null;
  aiIndexed: boolean | null;
}

interface Article {
  id: string;
  databaseId: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  knowledgeArticleDetails: KnowledgeArticleDetails | null;
}

interface ArticleResponse {
  knowledgeArticle: Article | null;
}

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ArticleDetailPage({
  params,
}: PageProps) {
  const { slug } = await params;

  const data = await fetchGraphQL<ArticleResponse>(
    GET_ARTICLE_BY_SLUG_QUERY,
    {
      slug,
    }
  );

  const article = data.knowledgeArticle;

  if (!article) {
    notFound();
  }

  /*
   * =========================================
   * ARTICLE DETAILS
   * =========================================
   */

  const details = article.knowledgeArticleDetails;

  /*
   * =========================================
   * DIFFICULTY
   *
   * GraphQL returns:
   *
   * difficulty: ["beginner"]
   * =========================================
   */

  const difficulty =
    details?.difficulty?.[0]?.trim() ?? "";

  const difficultyLower =
    difficulty.toLowerCase();

  /*
   * =========================================
   * DIFFICULTY COLOR
   * =========================================
   */

  let difficultyColor = "bg-gray-400";

  if (difficultyLower === "beginner") {
    difficultyColor = "bg-green-500";
  } else if (difficultyLower === "intermediate") {
    difficultyColor = "bg-yellow-500";
  } else if (difficultyLower === "advanced") {
    difficultyColor = "bg-red-500";
  }

  /*
   * =========================================
   * DIFFICULTY LABEL
   *
   * beginner -> Beginner
   * intermediate -> Intermediate
   * advanced -> Advanced
   * =========================================
   */

  const difficultyLabel =
    difficulty.length > 0
      ? difficulty.charAt(0).toUpperCase() +
        difficulty.slice(1).toLowerCase()
      : "";

  return (
    <main className="min-h-screen w-full px-6 py-10 md:px-10 lg:px-16">
      <article className="w-full max-w-none">

        {/* =========================================
            ARTICLE HEADER
        ========================================= */}

        <h1 className="mb-4 text-4xl font-bold">
          {article.title}
        </h1>

        {/* =========================================
            EXCERPT
        ========================================= */}

        {article.excerpt && (
          <div
            className="mb-8 text-lg text-gray-600"
            dangerouslySetInnerHTML={{
              __html: article.excerpt,
            }}
          />
        )}

        {/* =========================================
            ARTICLE DETAILS
        ========================================= */}

        {details && (
          <div className="mb-8 rounded-xl border bg-gray-50 p-6">

            <h2 className="mb-5 text-2xl font-semibold">
              Article Details
            </h2>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

              {/* =====================================
                  DIFFICULTY
              ===================================== */}

              {difficulty && (
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Difficulty
                  </p>

                  <div className="mt-1 flex items-center gap-2">

                    <span
                      className={`h-2.5 w-2.5 rounded-full ${difficultyColor}`}
                    />

                    <p className="text-base font-semibold">
                      {difficultyLabel}
                    </p>

                  </div>
                </div>
              )}

              {/* =====================================
                  READING TIME
              ===================================== */}

              {details.readingTime !== null && (
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Reading Time
                  </p>

                  <p className="mt-1 text-base font-semibold">
                    {details.readingTime} min
                  </p>
                </div>
              )}

              {/* =====================================
                  KEYWORDS
              ===================================== */}

              {details.keywords && (
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Keywords
                  </p>

                  <p className="mt-1 text-base font-semibold">
                    {details.keywords}
                  </p>
                </div>
              )}

              {/* =====================================
                  LAST REVIEWED
              ===================================== */}

              {details.lastReviewed && (
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Last Reviewed
                  </p>

                  <p className="mt-1 text-base font-semibold">
                    {details.lastReviewed}
                  </p>
                </div>
              )}

            </div>
          </div>
        )}

        {/* =========================================
            AI SUMMARY
        ========================================= */}

        {details?.aiSummary && (
          <section className="mb-8 rounded-xl border p-6">

            <h2 className="mb-3 text-2xl font-semibold">
              AI Summary
            </h2>

            <p className="text-base leading-7 text-gray-700">
              {details.aiSummary}
            </p>

          </section>
        )}

        {/* =========================================
            ARTICLE CONTENT
        ========================================= */}

        <div
          className="w-full text-base leading-7 text-gray-800"
          dangerouslySetInnerHTML={{
            __html: article.content,
          }}
        />

        {/* =========================================
            DOCUMENTATION
        ========================================= */}

        {details?.documentationUrl && (
          <div className="mt-10">

            <a
              href={details.documentationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-lg border px-5 py-3 font-medium transition hover:bg-gray-100"
            >
              Official Documentation →
            </a>

          </div>
        )}

      </article>
    </main>
  );
}