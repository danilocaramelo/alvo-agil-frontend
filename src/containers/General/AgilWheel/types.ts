export type AgilWheelElement = {
    label: string;
    children?: AgilWheelElement[];
    score: number;
    uv?: number;
    count?: number;
}

export type AgilWheelData = {
    label: string;
    children: AgilWheelElement[];
}

export type Quadrant = {
    label: string;
    lanes: string[];
  };