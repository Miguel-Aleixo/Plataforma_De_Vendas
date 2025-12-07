const orders: Record<string, { email: string }> = {};

export function saveOrder(orderId: string, email: string) {
  orders[orderId] = { email };
}

export function getEmailFromOrderId(orderId: string) {
  return orders[orderId]?.email ?? null;
}
