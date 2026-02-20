import { UserClient } from '../../api/user.client';

export interface CreateUserParams {
  email: string;
  password: string;
  name: string;
}

export async function createUser(params: CreateUserParams) {
  const client = new UserClient();
  return client.create(params);
}
