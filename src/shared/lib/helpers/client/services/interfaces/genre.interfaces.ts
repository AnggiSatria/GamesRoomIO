export interface IRequestPostGenre {
  name: string;
}

export interface IRequestPutGenre {
  id: string;
  name: string;
}

export interface IResponseGetGenreById {
  id: string;
  name: string;
}

export interface IRequestPutGenreList {
  id: string;
  name: string;
}

export type IResponseGetGenres = IRequestPutGenreList[];
