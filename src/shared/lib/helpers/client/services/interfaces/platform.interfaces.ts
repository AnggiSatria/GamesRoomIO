export interface IRequestPostPlatform {
  name: string;
  type: "Download" | "Url"; // Sesuai enum PlatformType
}

export interface IRequestPutPlatform {
  id: string;
  name: string;
  type: "Download" | "Url"; // Sesuai enum PlatformType
}

export interface IResponseGetPlatformById {
  id: string;
  name: string;
  type: "Download" | "Url"; // berdasarkan enum PlatformType
}

export interface IResponseGetPlatformList {
  id: string;
  name: string;
  type: "Download" | "Url"; // berdasarkan enum PlatformType
}

export type IResponseGetPlatforms = IResponseGetPlatformList[];
