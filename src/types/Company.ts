export interface ICompany {
  id: number,
  name: string,
  service: string,
  capital: number,
  logotype?: string,
  latitude?: string;
  longitude?: string;
  idUser: number;
  price: number;
}

export interface ICompanyFormErrors {
  name: string,
  service: string,
  capital: string,
  price: string
}

export interface ICompanyResponse {
  id: number;
  name: string;
  service: string;
  logotype: string;
  capital: number;
  latitude: string;
  longitude: string;
  idUser: number;
  createdAt: string;
}


export enum ETargetObject {
  User="user",
  Company="company"
}