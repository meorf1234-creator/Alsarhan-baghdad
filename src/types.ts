export type CategoryId = 'heritage' | 'modern' | 'sweets' | 'signature';

export interface MenuItem {
  id: string;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  price: string; // e.g. "4,500 د.ع"
  priceNum: number; // For calculations if needed
  category: CategoryId;
  popular?: boolean;
  notesAr?: string;
  notesEn?: string;
}

export interface RecommendationRequest {
  mood: string;
  preference: string;
  timeOfDay?: string;
}

export interface RecommendationResponse {
  recommendationAr: string;
  recommendedItemId: string;
  hospitalityPhrase: string; // e.g. "نورتنا يا عيوني..."
}
