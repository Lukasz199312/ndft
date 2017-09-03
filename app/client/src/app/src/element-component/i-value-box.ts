export interface I_ValueBox {
    value: string;
    optional?: string;
    callback?: (res: boolean) => void;
}