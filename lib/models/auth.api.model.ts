export interface ILogin {
  username: string
  password: string
  grant_type?: 'password'
  scope?: string
  client_id?: string
  client_secret?: string
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
