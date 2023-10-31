export interface SearchTypes {
  brand: string;
  productName: string;
  price: string;
  chip: string;
  dateOfBought: string;
  productImage: string;
  cardPayment: boolean;
  isSelected: boolean;
}
export interface PastPurchaseTypes {
  brand: string;
  productName: string;
  price: string;
  storeFront: boolean;
  dateOfBought: string;
  productImage: string;
  chip: string;
  recChip: boolean;
  quantity: number;
}

export interface AvoidProductTypes {
  brand: string;
  productName: string;
  productImage: string;
  chip: string[];
}
