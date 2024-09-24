export interface ProductCollection {
    _id: string;
    title: string;
    description?: string;
    imageUrl: string;
    hoverImageUrl?: string;
    price: number;
    onSale?: boolean;
    new?: boolean;
    material?: string;
    color?: string;
    size?: string[];
    inStock: boolean;
  }
  