export interface Collection {
    _id: string;
    title: string;
    description: string;
    price: number;
    imageUrl: string;
    hoverImageUrl: string;
    tags: string[];
}
