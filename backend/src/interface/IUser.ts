export interface IUser {
  id: number;
  username: string;
  email: string;
  phone: string;
  password: string;  // Optional for security reasons
  country_code: string;
  createdAt: Date;
  updatedAt: Date;
  [key: string]: any;  // Allows additional properties if needed
}



export interface ICreateUser {

  username: string;
  email: string;
  phone: string;
  password: string;  // Optional for security reasons
  country_code: string;
 
}

export interface IUserPayload {
  id: number;
  email: string;
}


