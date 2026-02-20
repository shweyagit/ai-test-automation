import { OrderClient } from '../../api/order.client';

export interface PlaceOrderParams {
  userId: string;
  items: { productId: string; quantity: number }[];
  shippingAddress: string;
}

export async function placeOrder(params: PlaceOrderParams) {
  const client = new OrderClient();
  return client.create(params);
}
