export interface CountryData {
  name: string | null;
  cca2: string | null;
  currencySymbol: string | null;
  subregion: string | null;
  language: string | null;
  population: number | null;
  flagUrl: string | null;
  gdpPerCapita: number | null;
  inflation: number | null;
}

export interface Currency {
  symbol?: string;
  name?: string;
}