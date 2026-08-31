const WORDPRESS_GRAPHQL_URL = process.env.WORDPRESS_GRAPHQL_URL || 'http://localhost:8080/graphql';
if(!WORDPRESS_GRAPHQL_URL) {
    throw new Error('WORDPRESS_GRAPHQL_URL environment variable is not defined');
}

export async function fetchGraphQL<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
const response =  await fetch(WORDPRESS_GRAPHQL_URL,{
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(
            {
                query, variables
            }
        ),
        next: {
            revalidate: 60,
        },
    
    });

    if(!response.ok) {
        throw new Error(`GraphQL request failed with status ${response.status}`);   
    }
    const result = await response.json();
    if (result.errors) {
        throw new Error(`GraphQL errors: ${JSON.stringify(result.errors)}`);
    }
    return result.data;
}