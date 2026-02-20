import http from 'k6/http';
import { check, sleep } from 'k6';

const BASE_URL = __ENV.BASE_URL || 'https://shop-pulse-9.preview.emergentagent.com';

export default function browseFlow() {
  const productsRes = http.get(`${BASE_URL}/api/products`);
  check(productsRes, {
    'products status is 200': (r) => r.status === 200,
    'products list is not empty': (r) => r.json().length > 0,
  });

  sleep(Math.random() * 3 + 1);

  const productId = productsRes.json()[0].id;
  const detailRes = http.get(`${BASE_URL}/api/products/${productId}`);
  check(detailRes, {
    'product detail status is 200': (r) => r.status === 200,
  });

  sleep(1);
}
