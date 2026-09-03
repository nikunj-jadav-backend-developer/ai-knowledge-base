export interface NormalPage {
  id: string;
  databaseId: number;
  title: string;
  slug: string;
  uri: string;
  content: string;
  featuredImage: {
    node: {
      sourceUrl: string;
      altText: string | null;
    } | null;
  } | null;
}