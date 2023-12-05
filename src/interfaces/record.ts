export interface Record {
  userId?: string;
  location?: {
    lat: number;
    long: number;
  };
  date?: string;
  time?: string;
  datetime?: string;
  breeds: {[breedId: string]: number};
}

