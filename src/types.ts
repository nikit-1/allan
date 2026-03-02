export enum DataType {
    Phase = 'phase',
    Freq = 'freq',
}

export interface AllanResult {
    tau: number[];
    dev: number[];
}
