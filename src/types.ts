export type ReceiptItem = {
   shortDescription: string;
   price: string;
};

export type Receipt = {
   id?: string | undefined;
   retailer: string;
   purchaseDate: string;
   purchaseTime: string;
   items: ReceiptItem[];
   total: string;
   points?: number | undefined;
};

export interface PointRule {
   active: () => boolean;
   processRule: (receipt: Receipt) => number;
}
