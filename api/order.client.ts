import { request, type APIRequestContext } from '@playwright/test';

export class OrderClient {
  private context?: APIRequestContext;

  async init(baseURL: string) {
    this.context = await request.newContext({ baseURL });
  }

  async create(params: { userId: string; items: { productId: string; quantity: number }[]; shippingAddress: string }) {
    const response = await this.context!.post('/api/orders', { data: params });
    return response.json();
  }

  async getById(orderId: string) {
    const response = await this.context!.get(`/api/orders/${orderId}`);
    return response.json();
  }

  async list(userId: string) {
    const response = await this.context!.get(`/api/orders?userId=${userId}`);
    return response.json();
  }
}
