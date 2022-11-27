export type AgilWheelElement = {
  label: string;
  children?: AgilWheelElement[];
  score?: number;
  peso?: number;
  uv?: number;
  count?: number;
};

export type AgilWheelData = {
  label: string;
  data: string;
  children: AgilWheelElement[];
};
