export type MoneyType = 'coin' | 'bill';

export interface Money {
    id: string;
    value: number;
    type: MoneyType;
    label: string;
    width: number;
    height: number;
    diameter?: number;
    modelUrl?: string;
    imageUrl?: string;
}