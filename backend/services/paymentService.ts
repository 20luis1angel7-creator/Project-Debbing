type PaymentInput = {
  total: number;
  forceFail?: boolean;
};

export async function chargePayment({ total, forceFail = false }: PaymentInput) {
  await new Promise((resolve) => setTimeout(resolve, 80));
  if (forceFail) {
    throw new Error("Payment provider rejected the charge");
  }
  return { id: `pay_${Date.now()}`, status: "paid", total };
}
