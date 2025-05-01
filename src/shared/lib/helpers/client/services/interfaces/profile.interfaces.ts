export interface IRequestPutProfile {
  id: string;
  image: string;
  idUser: string;
}

export interface IResponseGetProfile {
  profile: {
    id: string;
    image?: string; // Gambar profil (bisa kosong)
    idUser: string;
    user: {
      id: string;
      username: string;
      email: string;
    };
  };
}
