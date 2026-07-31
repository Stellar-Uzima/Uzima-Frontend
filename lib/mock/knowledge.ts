export interface KnowledgeArticle {
  id: string;
  title: string;
  category: string;
  summary: string;
  tags: string[];
}

export const mockKnowledge: KnowledgeArticle[] = [
  {
    id: "traditional-herbal-remedies",
    title: "Traditional herbal remedies for everyday wellness",
    category: "Herbal Medicine",
    summary:
      "A practical guide to common herbs used in traditional healing practices and how communities preserve them.",
    tags: ["herbs", "wellness", "traditional medicine"],
  },
  {
    id: "community-medicine-knowledge",
    title: "Preserving community health knowledge",
    category: "Community Care",
    summary:
      "Learn how elders and healers share practical knowledge about nutrition, prevention, and care within communities.",
    tags: ["community", "health", "culture"],
  },
  {
    id: "nutrition-and-ancestral-practices",
    title: "Nutrition and ancestral practices",
    category: "Nutrition",
    summary:
      "Explore how ancestral food wisdom supports modern healthy living and strengthens local food systems.",
    tags: ["nutrition", "food", "ancestral wisdom"],
  },
];

export default mockKnowledge;
