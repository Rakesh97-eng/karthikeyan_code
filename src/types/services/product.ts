export enum ProductFields {
  'id' = 'id',
  'shopifyId' = 'shopify_id',
  'title' = 'title',
  'handle' = 'handle',
  'bodyHtml' = 'body_html',
  'productType' = 'product_type',
  'shopifyStatus' = 'shopify_status',
  'publishedScope' = 'published_scope',
  'publishedAt' = 'published_at',
  'vendor' = 'vendor',
  'brand' = 'brand',
  'boulevardActive' = 'boulevard_active',
  'pregnancySafe' = 'pregnancy_safe',
  'potentialAllergies' = 'potential_allergies',
  'potentialAllergiesNew' = 'potential_allergies_new',
  'ingredients' = 'ingredients',
  'ingredientsNew' = 'ingredients_new',
  'url' = 'url',
  'linkedName' = 'linked_name',
  'backOrFrontBar' = 'back_or_front_bar',
  'isArchived' = 'is_archived',
  'knackId' = 'knack_id',
}
export interface Product {
  id: string;
  shopifyId: string | null;
  title: string | null;
  handle: string | null;
  bodyHtml: string | null;
  productType: string | null;
  shopifyStatus: string | null;
  publishedScope: string | null;
  publishedAt: string | null;
  vendor: string | null;
  brand: string | null;
  boulevardActive: string | null;
  pregnancySafe: string | null;
  potentialAllergies: string | null;
  potentialAllergiesNew: string[] | null;
  ingredients: string | null;
  ingredientsNew: string[] | null;
  url: string | null;
  linkedName: string | null;
  backOrFrontBar: string | null;
  isArchived: string | null;
  knackId: string | null;
  productImage: ProductImage[];
  recommendedProduct: boolean;
  productVariant: ProductVariant[];
  productVariantId?: string | null;
  type?: string;
  orderId?: string;
  quantity?: number;
  productPrice?: string;
  dateOfBought?: string;
}
export type ProductVariant = {
  id: string;
  price: string;
  weight: DoubleRange;
  weightUnit: string;
};
export type ProductImage = {
  src: string;
  position: number;
};
export enum ProductRelation {
  'productImage' = 'product_image',
  'productVariant' = 'product_variant',
}
