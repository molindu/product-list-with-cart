export type Dessert = {
    id: string;
    image: {
        thumbnail: string;
        mobile: string;
        tablet: string;
        desktop: string;
    };
    name: string;
    category: string;
    price: number;
};

export type CartButton = {
    id: string;
    toggled: boolean;
    count: number;
    name: string;
    price: number;
    image_url: string;
};
export type CartDetailsType = {
    count: number;
    unitPrice: number;
    name: string;
    toggle?: boolean;
    image_url?: string;
}
