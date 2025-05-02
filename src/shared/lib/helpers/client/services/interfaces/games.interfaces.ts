export interface IRequestPostGame {
  title: string;
  description: string;
  gameUrl: string;
  coverImage: string;
  screenshots: string;
  genreId: string;
  platformId: string;
  createdById: string;
}

export interface IResponseGetGameById {
  id: string;
  title: string;
  description: string;
  gameUrl: string;
  coverImage: string;
  screenshots: string;
  createdAt: string; // ISO date string
  genre: {
    id: string;
    name: string;
  };
  platform: {
    id: string;
    name: string;
    type: "Download" | "Url";
  };
}

export interface IResponseGetGamesList {
  id: string;
  title: string;
  description: string;
  gameUrl: string;
  coverImage: string;
  screenshots: string;
  createdAt: string; // ISO date string
  genre: {
    id: string;
    name: string;
  };
  platform: {
    id: string;
    name: string;
    type: "Download" | "Url";
  };
}

export type IResponseGetGames = IResponseGetGamesList[];

export interface IRequestPutGame {
  id: string;
  title: string;
  description: string;
  gameUrl: string;
  coverImage: string; // URL dari Cloudinary
  screenshots: string; // JSON stringified array of URLs
  createdAt: string; // ISO date string
  genreId: string;
  platformId: string;
  createdById: string;
}
