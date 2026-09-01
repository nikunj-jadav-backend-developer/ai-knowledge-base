import Link from "next/link";
import { fetchGraphQL } from "@/lib/graphql";
import { GET_ALL_ARTICLES_QUERY } from "@/lib/queries";

interface ArticleDetails {
  difficulty: string[] | null;
}

interface KnowledgeArticle {
  id: string;
  databaseId: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  knowledgeArticleDetails: ArticleDetails | null;
}

interface ArticlesResponse {
  knowledgeArticles: {
    nodes: KnowledgeArticle[];
  };
}

interface ArticlesPageProps {
  searchParams: Promise<{
    difficulty?: string;
  }>;
}

export default async function ArticlesPage({
  searchParams,
}: ArticlesPageProps) {
  const params = await searchParams;

  // URL value:
  // /articles?difficulty=beginner

  const selectedDifficulty =
    params.difficulty?.trim().toLowerCase() || "all";

  const data =
    await fetchGraphQL<ArticlesResponse>(
      GET_ALL_ARTICLES_QUERY
    );

  const articles =
    data.knowledgeArticles.nodes;

  /*
   * ==========================================
   * FILTER ARTICLES
   * ==========================================
   */

  const filteredArticles =
    selectedDifficulty === "all"
      ? articles
      : articles.filter((article) => {
          const difficulties =
            article.knowledgeArticleDetails
              ?.difficulty ?? [];

          return difficulties.some(
            (difficulty) =>
              difficulty.trim().toLowerCase() ===
              selectedDifficulty
          );
        });

  /*
   * ==========================================
   * DIFFICULTY COLOR
   * ==========================================
   */

  const getDifficultyColor = (
    difficulty: string
  ) => {
    switch (difficulty.toLowerCase()) {
      case "beginner":
        return "bg-green-500";

      case "intermediate":
        return "bg-yellow-500";

      case "advanced":
        return "bg-red-500";

      default:
        return "bg-gray-400";
    }
  };

  /*
   * ==========================================
   * DIFFICULTY LABEL
   * ==========================================
   */

  const getDifficultyLabel = (
    difficulty: string
  ) => {
    if (!difficulty) {
      return "";
    }

    return (
      difficulty.charAt(0).toUpperCase() +
      difficulty.slice(1).toLowerCase()
    );
  };

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">

      {/* ======================================
          HEADER
      ====================================== */}

      <div className="mb-8">

        <h1 className="text-4xl font-bold">
          Knowledge Base
        </h1>

        <p className="mt-2 text-gray-600">
          Explore technical articles and
          documentation.
        </p>

      </div>

      {/* ======================================
          FILTER
      ====================================== */}

      <div className="mb-8">

        <p className="mb-3 text-sm font-medium text-gray-500">
          Filter by Difficulty
        </p>

        <div className="flex flex-wrap gap-3">

          {/* ALL */}

          <Link
            href="/articles"
            className={`rounded-lg border px-4 py-2 text-sm font-medium transition ${
              selectedDifficulty === "all"
                ? "bg-black text-white"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            All
          </Link>

          {/* BEGINNER */}

          <Link
            href="/articles?difficulty=beginner"
            className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition ${
              selectedDifficulty === "beginner"
                ? "bg-black text-white"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            <span className="h-2.5 w-2.5 rounded-full bg-green-500" />

            Beginner
          </Link>

          {/* INTERMEDIATE */}

          <Link
            href="/articles?difficulty=intermediate"
            className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition ${
              selectedDifficulty === "intermediate"
                ? "bg-black text-white"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500" />

            Intermediate
          </Link>

          {/* ADVANCED */}

          <Link
            href="/articles?difficulty=advanced"
            className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition ${
              selectedDifficulty === "advanced"
                ? "bg-black text-white"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            <span className="h-2.5 w-2.5 rounded-full bg-red-500" />

            Advanced
          </Link>

        </div>
      </div>

      {/* ======================================
          RESULT COUNT
      ====================================== */}

      <div className="mb-6">

        <p className="text-sm text-gray-500">
          Showing{" "}
          <span className="font-semibold text-gray-900">
            {filteredArticles.length}
          </span>{" "}
          {filteredArticles.length === 1
            ? "article"
            : "articles"}
        </p>

      </div>

      {/* ======================================
          ARTICLES
      ====================================== */}

      {filteredArticles.length === 0 ? (

        <div className="rounded-xl border p-10 text-center">

          <h2 className="text-xl font-semibold">
            No articles found
          </h2>

          <p className="mt-2 text-gray-500">
            No articles are available for{" "}
            <span className="font-medium">
              {getDifficultyLabel(
                selectedDifficulty
              )}
            </span>{" "}
            difficulty.
          </p>

          <Link
            href="/articles"
            className="mt-5 inline-block font-medium underline"
          >
            View all articles
          </Link>

        </div>

      ) : (

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          {filteredArticles.map(
            (article) => {

              const difficulty =
                article
                  .knowledgeArticleDetails
                  ?.difficulty?.[0] ?? "";

              const difficultyLower =
                difficulty
                  .trim()
                  .toLowerCase();

              return (

                <article
                  key={article.id}
                  className="rounded-xl border p-6 shadow-sm transition hover:shadow-md"
                >

                  {/* Difficulty */}

                  {difficulty && (
                    <div className="mb-4 flex items-center gap-2">

                      <span
                        className={`h-2.5 w-2.5 rounded-full ${getDifficultyColor(
                          difficulty
                        )}`}
                      />

                      <span className="text-sm font-medium">
                        {getDifficultyLabel(
                          difficulty
                        )}
                      </span>

                    </div>
                  )}

                  {/* Title */}

                  <h2 className="mb-3 text-2xl font-semibold">
                    {article.title}
                  </h2>

                  {/* Excerpt */}

                  {article.excerpt && (
                    <div
                      className="mb-5 text-gray-600"
                      dangerouslySetInnerHTML={{
                        __html:
                          article.excerpt,
                      }}
                    />
                  )}

                  {/* Read Article */}

                  <Link
                    href={`/articles/${article.slug}`}
                    className="font-medium underline"
                  >
                    Read Article →
                  </Link>

                </article>

              );
            }
          )}

        </div>

      )}

    </main>
  );
}