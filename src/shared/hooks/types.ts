export type Hint = {
  cityName: string;
};

export type WeatherState = {
  cityId: number;
  cityName: string;
  hints: Hint[];
  setCityName: (cityName: string) => void;
  setCityId: (cityId: number) => void;
  setHints: (hints: Hint[]) => void;
};

export type WeatherStateCreator = (set: Function) => WeatherState;
