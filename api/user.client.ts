import { request, type APIRequestContext } from '@playwright/test';

export class UserClient {
  private context?: APIRequestContext;

  async init(baseURL: string) {
    this.context = await request.newContext({ baseURL });
  }

  async create(params: { email: string; password: string; name: string }) {
    const response = await this.context!.post('/api/users', { data: params });
    return response.json();
  }

  async login(params: { email: string; password: string }) {
    const response = await this.context!.post('/api/auth/login', { data: params });
    return response.json();
  }

  async getById(userId: string) {
    const response = await this.context!.get(`/api/users/${userId}`);
    return response.json();
  }
}
