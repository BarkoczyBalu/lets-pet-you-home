import { Breed } from "./breed";

export interface Pet {
  id: string;
  name: string;
  icon?: string;
  img: string;
  total: number;
  breeds: Array<Breed>;
  ownedBreeds?: Array<Breed>;
  isDeletable: boolean;
  isFavorite: boolean;
}