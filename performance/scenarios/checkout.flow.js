import http from 'k6/http';
import { check, sleep } from 'k6';

export default function checkoutFlow() {
  const headers = { 'Content-Type': 'application/json' };

  // Login
  const loginRes = http.post(`${__ENV.BASE_URL}/api/auth/login`, JSON.stringify({
    email: 'testuser@example.com',
    password: 'Test1234!',
  }), { headers });

  const token = loginRes.json('token');
  const authHeaders = { ...headers, Authorization: `Bearer ${token}` };

  // Add to cart
  const cartRes = http.post(`${__ENV.BASE_URL}/api/cart`, JSON.stringify({
    productId: 'prod-1',
    quantity: 1,
  }), { headers: authHeaders });

  check(cartRes, { 'add to cart is 200': (r) => r.status === 200 });
  sleep(1);

  // Place order
  const orderRes = http.post(`${__ENV.BASE_URL}/api/orders`, JSON.stringify({
    shippingAddress: '123 Test St, Test City, TS 12345',
  }), { headers: authHeaders });

  check(orderRes, {
    'order placed successfully': (r) => r.status === 201,
    'order has id': (r) => !!r.json('orderId'),
  });

  sleep(1);
}
