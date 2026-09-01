export const GET_ALL_ARTICLES_QUERY = `
query GetKnowledgeArticles {
    knowledgeArticles {
      nodes {
        id
        title
        slug
        content
        excerpt
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