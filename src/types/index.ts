export interface DataRow {
  [key: string]: string | number;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[] | { x: number; y: number }[];
    backgroundColor?: string | string[];
    borderColor?: string | string[];
    borderWidth?: number;
    type?: 'line';
    borderDash?: number[];
    pointRadius?: number;
    pointHoverRadius?: number;
    fill?: boolean;
  }[];
}

export type ChartType =
  | 'line'
  | 'bar'
  | 'doughnut'
  | 'radar'
  | 'treemap'
  | 'gantt';

export interface ChartConfig {
  type: ChartType;
  title: string;
  xAxis?: string;
  yAxis?: string;
  color?: string;
  options?: any;
} 