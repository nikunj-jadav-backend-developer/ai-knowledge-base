export const GET_ALL_ARTICLES_QUERY = `
query GetKnowledgeArticles {
    knowledgeArticles(first: 100) {
      nodes {
        id
        title
        slug
        content
        excerpt
        knowledgeCategories {
          nodes {
            name
            slug
          }
        }
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
      knowledgeCategories {
        nodes {
          name
          slug
        }
      }
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
  query GetPageBySlug($slug: ID!) {
    page(
      id: $slug
      idType: URI
    ) {
      id
      databaseId
      title
      slug
      content

      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
    }
  }
`;


