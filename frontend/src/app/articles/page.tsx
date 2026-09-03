import Link from "next/link";
import { fetchGraphQL } from "@/lib/graphql";
import { GET_ALL_ARTICLES_QUERY } from "@/lib/queries";
import { Category } from "@/types/article";

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

  knowledgeCategories: {
    nodes: Category[];
  };

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
    category?: string;
  }>;
}

export default async function ArticlesPage({
  searchParams,
}: ArticlesPageProps) {
  const params = await searchParams;

  /*
   * ==========================================
   * URL FILTER VALUES
   * ==========================================
   *
   * Examples:
   *
   * /articles
   * /articles?difficulty=beginner
   * /articles?category=python
   * /articles?category=python&difficulty=beginner
   */

  const selectedDifficulty =
    params.difficulty?.trim().toLowerCase() || "all";

  const selectedCategory =
    params.category?.trim().toLowerCase() || "all";

  /*
   * ==========================================
   * FETCH ARTICLES
   * ==========================================
   */

  const data =
    await fetchGraphQL<ArticlesResponse>(
      GET_ALL_ARTICLES_QUERY
    );

  const articles =
    data.knowledgeArticles.nodes;

  /*
   * ==========================================
   * GET UNIQUE CATEGORIES
   * ==========================================
   *
   * Categories come from WordPress.
   *
   * Example:
   *
   * Python
   * FastAPI
   * Next.js
   * WordPress
   * DevOps
   */

  const categories = Array.from(
    new Map(
      articles
        .flatMap(
          (article) =>
            article.knowledgeCategories?.nodes ?? []
        )
        .map((category) => [
          category.slug,
          category,
        ])
    ).values()
  );

  /*
   * ==========================================
   * FILTER ARTICLES
   * ==========================================
   *
   * Both filters work together.
   *
   * Example:
   *
   * category = python
   * difficulty = beginner
   *
   * Result:
   * Python + Beginner articles only
   */

  const filteredArticles =
    articles.filter((article) => {
      /*
       * ----------------------------------------
       * DIFFICULTY MATCH
       * ----------------------------------------
       */

      const difficulties =
        article.knowledgeArticleDetails
          ?.difficulty ?? [];

      const difficultyMatch =
        selectedDifficulty === "all" ||
        difficulties.some(
          (difficulty) =>
            difficulty.trim().toLowerCase() ===
            selectedDifficulty
        );

      /*
       * ----------------------------------------
       * CATEGORY MATCH
       * ----------------------------------------
       */

      const articleCategories =
        article.knowledgeCategories?.nodes ?? [];

      const categoryMatch =
        selectedCategory === "all" ||
        articleCategories.some(
          (category) =>
            category.slug
              .trim()
              .toLowerCase() ===
            selectedCategory
        );

      /*
       * ----------------------------------------
       * BOTH FILTERS MUST MATCH
       * ----------------------------------------
       */

      return (
        difficultyMatch &&
        categoryMatch
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

  /*
   * ==========================================
   * URL HELPER
   * ==========================================
   *
   * This keeps the other filter when changing
   * the current filter.
   */

  const createFilterUrl = ({
    category,
    difficulty,
  }: {
    category?: string;
    difficulty?: string;
  }) => {
    const queryParams = new URLSearchParams();

    if (category && category !== "all") {
      queryParams.set(
        "category",
        category
      );
    }

    if (difficulty && difficulty !== "all") {
      queryParams.set(
        "difficulty",
        difficulty
      );
    }

    const queryString =
      queryParams.toString();

    return queryString
      ? `/articles?${queryString}`
      : "/articles";
  };

  /*
   * ==========================================
   * CURRENT FILTER LABELS
   * ==========================================
   */

  const selectedCategoryObject =
    categories.find(
      (category) =>
        category.slug
          .trim()
          .toLowerCase() ===
        selectedCategory
    );

  const selectedCategoryLabel =
    selectedCategoryObject?.name ||
    selectedCategory;

  /*
   * ==========================================
   * PAGE
   * ==========================================
   */

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
          CATEGORY FILTER
      ====================================== */}

      <div className="mb-6">

        <p className="mb-3 text-sm font-medium text-gray-500">
          Filter by Category
        </p>

        <div className="flex flex-wrap gap-3">

          {/* ALL CATEGORIES */}

          <Link
            href={createFilterUrl({
              category: "all",
              difficulty:
                selectedDifficulty,
            })}
            className={`rounded-lg border px-4 py-2 text-sm font-medium transition ${
              selectedCategory === "all"
                ? "bg-black text-white"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            All
          </Link>

          {/* CATEGORIES */}

          {categories.map(
            (category) => (
              <Link
                key={category.slug}
                href={createFilterUrl({
                  category:
                    category.slug,
                  difficulty:
                    selectedDifficulty,
                })}
                className={`rounded-lg border px-4 py-2 text-sm font-medium transition ${
                  selectedCategory ===
                  category.slug
                    .trim()
                    .toLowerCase()
                    ? "bg-black text-white"
                    : "bg-white hover:bg-gray-100"
                }`}
              >
                {category.name}
              </Link>
            )
          )}

        </div>
      </div>

      {/* ======================================
          DIFFICULTY FILTER
      ====================================== */}

      <div className="mb-8">

        <p className="mb-3 text-sm font-medium text-gray-500">
          Filter by Difficulty
        </p>

        <div className="flex flex-wrap gap-3">

          {/* ALL */}

          <Link
            href={createFilterUrl({
              category:
                selectedCategory,
              difficulty: "all",
            })}
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
            href={createFilterUrl({
              category:
                selectedCategory,
              difficulty:
                "beginner",
            })}
            className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition ${
              selectedDifficulty ===
              "beginner"
                ? "bg-black text-white"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            <span className="h-2.5 w-2.5 rounded-full bg-green-500" />

            Beginner
          </Link>

          {/* INTERMEDIATE */}

          <Link
            href={createFilterUrl({
              category:
                selectedCategory,
              difficulty:
                "intermediate",
            })}
            className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition ${
              selectedDifficulty ===
              "intermediate"
                ? "bg-black text-white"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500" />

            Intermediate
          </Link>

          {/* ADVANCED */}

          <Link
            href={createFilterUrl({
              category:
                selectedCategory,
              difficulty:
                "advanced",
            })}
            className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition ${
              selectedDifficulty ===
              "advanced"
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

            {selectedCategory !== "all" && (
              <>
                category{" "}
                <span className="font-medium text-gray-900">
                  {selectedCategoryLabel}
                </span>
              </>
            )}

            {selectedCategory !== "all" &&
              selectedDifficulty !== "all" &&
              " and "}

            {selectedDifficulty !== "all" && (
              <>
                <span className="font-medium text-gray-900">
                  {getDifficultyLabel(
                    selectedDifficulty
                  )}
                </span>{" "}
                difficulty
              </>
            )}

            {selectedCategory === "all" &&
              selectedDifficulty ===
                "all" &&
              "with the selected filters"}.

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

              /*
               * -------------------------------
               * DIFFICULTY
               * -------------------------------
               */

              const difficulty =
                article
                  .knowledgeArticleDetails
                  ?.difficulty?.[0] ?? "";

              /*
               * -------------------------------
               * CATEGORIES
               * -------------------------------
               */

              const articleCategories =
                article.knowledgeCategories
                  ?.nodes ?? [];

              return (

                <article
                  key={article.id}
                  className="rounded-xl border p-6 shadow-sm transition hover:shadow-md"
                >

                  {/* ==========================
                      DIFFICULTY
                  ========================== */}

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

                  {/* ==========================
                      TITLE
                  ========================== */}

                  <h2 className="mb-3 text-2xl font-semibold">
                    {article.title}
                  </h2>

                  {/* ==========================
                      EXCERPT
                  ========================== */}

                  {article.excerpt && (
                    <div
                      className="mb-5 text-gray-600"
                      dangerouslySetInnerHTML={{
                        __html:
                          article.excerpt,
                      }}
                    />
                  )}

                  {/* ==========================
                      CATEGORIES
                  ========================== */}

                  {articleCategories.length >
                    0 && (
                    <div className="mb-5 flex flex-wrap gap-2">

                      {articleCategories.map(
                        (category) => (
                          <Link
                            key={
                              category.slug
                            }
                            href={createFilterUrl(
                              {
                                category:
                                  category.slug,
                                difficulty:
                                  selectedDifficulty,
                              }
                            )}
                            className="rounded-full border px-3 py-1 text-xs font-medium text-gray-600 transition hover:bg-gray-100"
                          >
                            {category.name}
                          </Link>
                        )
                      )}

                    </div>
                  )}

                  {/* ==========================
                      READ ARTICLE
                  ========================== */}

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