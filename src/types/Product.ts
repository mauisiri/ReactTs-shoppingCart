// src/types/Product.ts

export interface Category {
  id: string;
  name: string;
}

export interface PriceDetail {
  value: number;
  formattedValue: string;
}

export interface Prices {
  salesPrice: PriceDetail;
  recommendedRetailPrice: PriceDetail;
  savings: PriceDetail;
  savingsPercentageFormatted: string;
}

export interface ImageResolution {
  url: string;
}

export interface ImageFormats {
  avif: {
    resolutions: {
      '1x': ImageResolution;
      '2x': ImageResolution;
    };
  };
  jpg: {
    resolutions: {
      '1x': ImageResolution;
      '2x': ImageResolution;
    };
  };
  webp: {
    resolutions: {
      '1x': ImageResolution;
      '2x': ImageResolution;
    };
  };
}

export interface ImageVariant {
  formats: ImageFormats;
  width: number;
  height: number;
}

export interface Image {
  id: number;
  versionNumber: number;
  meta: {
    tags: string[];
  };
  variants: Record<string, ImageVariant>;
}

export interface SaleCondition {
  [key: string]: Array<{ code: string; packagingSize: string }>;
}

export interface Product {
  code: string;
  name: string;
  supplier: string;
  dosageForm: string;
  rating: number;
  reviewCount: number;
  packagingSize: string;
  defaultSaleCondition: string;
  baseprice: string;
  url: string;
  available: boolean;
  stock: number;
  categories: Category[];
  saleConditions: SaleCondition;
  prices: Prices;
  images: Image[];
}
