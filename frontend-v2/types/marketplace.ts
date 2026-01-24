export interface MarketplaceItem {
  id: string;
  title: string;
  description: string;
  category: 'service' | 'course' | 'consultation';
  priceXLM: number;
  priceUSDT: number;
  rating: number;
  reviewCount: number;
  provider: {
    name: string;
    verified: boolean;
  };
  createdAt: string;
}
