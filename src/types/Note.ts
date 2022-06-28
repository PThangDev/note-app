export interface Theme {
  id: number | string;
  title: string;
}
export interface Note {
  id: number | string;
  title: string;
  content: string;
  background: string;
  themes: string[];
}
