type ReceiptItem = {
    shortDescription: string;
    price: string
}

type Receipt = {
    id?: string | undefined;
    retailer: string;
    purchaseDate: string,
    purchaseTime: string,
    items: ReceiptItem[],
    total: string,
    points?: number | undefined
}

interface PointRule  {
    active: () => boolean;
    processRule: (receipt: Receipt) => number
}