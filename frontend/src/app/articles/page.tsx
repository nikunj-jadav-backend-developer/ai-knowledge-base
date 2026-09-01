import Link from "next/link";
import { fetchGraphQL } from "@/lib/graphql";
import { GET_ALL_ARTICLES_QUERY } from "@/lib/queries";
import { KnowledgeArticle } from "@/types/article";
import Card from "@/components/layout/Card";

interface ArticlesResponse {
  knowledgeArticles: {
    nodes: KnowledgeArticle[];
  };
}

export default async function ArticlesPage() {
  const data = await fetchGraphQL<ArticlesResponse>(
    GET_ALL_ARTICLES_QUERY
  );

  const articles = data.knowledgeArticles.nodes;

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">

      {/* Page Header */}
      <h1 className="mb-8 text-4xl font-bold">
        Knowledge Base
      </h1>

      {/* Empty State */}
      {articles.length === 0 ? (
        <p className="text-gray-600">
          No articles found.
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          {articles.map((article) => (
            <Card key={article.id}>

              {/* Article Title */}
              <h2 className="mb-3 text-2xl font-semibold">
                {article.title}
              </h2>

              {/* Article Excerpt */}
              {article.excerpt && (
                <div
                  className="mb-4 line-clamp-3 text-gray-600"
                  dangerouslySetInnerHTML={{
                    __html: article.excerpt,
                  }}
                />
              )}

              {/* Article Link */}
              <Link
                href={`/articles/${article.slug}`}
                className="font-medium underline underline-offset-4 hover:text-gray-600"
              >
                Read Article →
              </Link>

            </Card>
          ))}

        </div>
      )}

    </main>
  );
}