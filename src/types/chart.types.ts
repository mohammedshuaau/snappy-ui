export interface DataPoint {
    [key: string]: string | number;
}

export interface DataSeries {
    dataKey: string;
    name?: string;
    variant?: string;
    strokeWidth?: number;
    dot?: boolean;
    stackId?: string;
}

export interface HeatmapData {
    x: string | number;
    y: string | number;
    value: number;
}