export const GET_ALL_ARTICLES_QUERY = `
query GetKnowledgeArticles {
    knowledgeArticles(first: 100) {
      nodes {
        id
        title
        slug
        content
        excerpt
        knowledgeArticleDetails {
          difficulty
        }
      }
    }
  }
`;

export const GET_ARTICLE_BY_SLUG_QUERY = `
query GetKnowledgeArticleBySlug($slug: ID!) {
    knowledgeArticle(
      id: $slug
      idType: SLUG
    ) {
      id
      databaseId
      title
      slug
      content
      excerpt

      knowledgeArticleDetails {
        difficulty
        readingTime
        aiSummary
        keywords
        documentationUrl
        lastReviewed
        aiIndexed
      }
    }
}
`;


export const GET_PAGE_BY_SLUG_QUERY = `
  query GetPageBySlug($uri: ID!) {
    page(
      id: $uri
      idType: URI
    ) {
      id
      databaseId
      title
      slug
      uri
      content
    }
  }
`;