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