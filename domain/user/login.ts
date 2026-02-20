import { UserClient } from '../../api/user.client';

export interface LoginParams {
  email: string;
  password: string;
}

export async function login(params: LoginParams) {
  const client = new UserClient();
  return client.login(params);
}
