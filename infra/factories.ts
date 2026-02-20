let counter = 0;

function uniqueId() {
  return `${Date.now()}-${++counter}`;
}

export function buildUser(overrides: Partial<{ email: string; password: string; name: string }> = {}) {
  const id = uniqueId();
  return {
    email: `user-${id}@test.com`,
    password: 'Test1234!',
    name: `Test User ${id}`,
    ...overrides,
  };
}

export function buildOrder(overrides: Partial<{ userId: string; items: { productId: string; quantity: number }[]; shippingAddress: string }> = {}) {
  return {
    userId: uniqueId(),
    items: [{ productId: 'prod-1', quantity: 1 }],
    shippingAddress: '123 Test St, Test City, TS 12345',
    ...overrides,
  };
}
