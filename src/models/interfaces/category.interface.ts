export interface ICategory {
  id: string;
  name: string;
}

export interface ICategoriesApiResponse {
  trivia_categories: ReadonlyArray<ICategory>;
}
