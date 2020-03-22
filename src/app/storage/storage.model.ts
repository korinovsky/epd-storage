export interface Epd extends Record {
    waterSupply: number[];
    waterDisposal: number;
}

export interface Tariff {
    waterSupply: number;
    waterDisposal: number;
}

interface Record {
    id: string;
}
