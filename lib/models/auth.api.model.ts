export interface ILogin {
  username: string
  password: string
  grant_type?: 'password'
  scope?: string
  client_id?: string
  client_secret?: string
}

export interface ILoginResponse {
  access_token: string
  token_type: string
}

export interface IRegister {
  username: string
  password: string
  email: string,
  token?: string,
  is_active?: boolean,
  is_superuser?: boolean,
  is_verified?: boolean,
}

export interface IRegisterResponse {
  id: string,
  username: string
  email: string,
  is_active: boolean,
  is_superuser: boolean,
  is_verified: boolean,
}
