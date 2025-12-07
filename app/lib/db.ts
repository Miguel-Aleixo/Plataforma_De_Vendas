import redisClient from "./redis";

export async function saveOrder(orderId: string, email: string) {
  // salva com TTL de 7 dias (opcional)
  await redisClient.set(`order:${orderId}`, email, { EX: 60 * 60 * 24 * 7 });
}

export async function getEmailFromOrderId(orderId: string) {
  const email = await redisClient.get(`order:${orderId}`);
  return email;
}
