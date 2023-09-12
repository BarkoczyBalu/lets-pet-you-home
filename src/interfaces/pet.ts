export interface Pet {
  id: number;
  name: string;
  img: string;
  total: number;
  breeds: Array<Breed>;
  isDeletable: boolean;
  isFavorite: boolean;
}

export interface Breed {
  name: string;
  img: string;
}
