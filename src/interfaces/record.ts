export interface Record {
  userId?: string;
  date?: string;
  time?: string;
  datetime?: string;
  breeds: {[breedId: string]: number};
}

