import { Receipt } from '../../types';

export type PostReceiptRequestBody = Omit<Receipt, 'id'>;
export type PostReceiptResponse = {
   id: string;
};

export type GetReceiptByIdResponse = Receipt;

export type GetReceiptPointsByIdResponse = {
   points: number;
};

export type ValidationError = {
   description: string;
   path: string;
};

export type BadRequestResponse = {
   description: string;
   errors?: ValidationError[];
};
