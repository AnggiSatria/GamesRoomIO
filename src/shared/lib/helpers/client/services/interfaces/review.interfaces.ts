export interface IRequestPostReview {
  rating: number;
  comment: string;
  gameId: string;
  createdById: string;
}

export interface IRequestPutReview {
  id: string;
  rating: number;
  comment: string;
  gameId: string;
  createdById: string;
}

export interface IResponseGetReviewList {
  id: string;
  rating: number;
  comment: string;
  createdAt: string; // ISO string
  game: {
    id: string;
    title: string;
  };
  createdBy: {
    id: string;
    username: string;
  };
}

export type IResponseGetReviews = IResponseGetReviewList[];

export interface IResponseGetReviewById {
  id: string;
  rating: number;
  comment: string;
  createdAt: string; // ISO string
  game: {
    id: string;
    title: string;
  };
  createdBy: {
    id: string;
    username: string;
  };
}
