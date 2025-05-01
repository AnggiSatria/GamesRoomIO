export interface IRequestPostRegisterUser {
  username: string;
  email: string;
  password: string;
}

export interface IRequestPostLoginUser {
  email: string;
  password: string;
}

export interface IResponsePostLogin {
  message: string;
  token: string;
  user: {
    id: string;
    username: string;
    email: string;
    profile?: {
      id: string;
      image?: string;
      idUser: string;
    } | null;
  };
}

export interface IResponsePostRegister {
  message: string;
  data: {
    id: string;
    username: string;
    email: string;
    profile: {
      id: string;
      image?: string | null;
      idUser: string;
    } | null;
  };
}

export interface IResponseGetUser {
  id: string;
  username: string;
  email: string;
  profile: {
    id: string;
    image: string;
    idUser: string;
  };
}

export interface IResponseGetUsers {
  users: IResponseGetUser[];
}
