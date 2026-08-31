import { fetchGraphQL } from "@/lib/graphql";
import { GET_ALL_ARTICLES_QUERY } from "@/lib/queries";
import { KnowledgeArticle } from "@/types/article";

interface ArticlesResponse {
  knowledgeArticles: {
    nodes: KnowledgeArticle[];
  };
}

export default async function ArticlesPage() {
  const data =
    await fetchGraphQL<ArticlesResponse>(
      GET_ALL_ARTICLES_QUERY
    );

  const articles =
    data.knowledgeArticles.nodes;

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">

      <h1 className="mb-8 text-4xl font-bold">
        Knowledge Base
      </h1>

      {articles.length === 0 ? (
        <p>No articles found.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          {articles.map((article) => (
            <article
              key={article.id}
              className="rounded-xl border p-6 shadow-sm"
            >

              <h2 className="mb-3 text-2xl font-semibold">
                {article.title}
              </h2>

              {article.excerpt && (
                <div
                  className="mb-4 text-gray-600"
                  dangerouslySetInnerHTML={{
                    __html: article.excerpt,
                  }}
                />
              )}

              <a
                href={`/articles/${article.slug}`}
                className="font-medium underline"
              >
                Read Article →
              </a>

            </article>
          ))}

        </div>
      )}

    </main>
  );
}