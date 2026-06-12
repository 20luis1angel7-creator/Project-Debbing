export function applyCoupon(subtotal: number, couponCode?: string) {
  if (!couponCode) return { discount: 0, total: subtotal };
  if (couponCode !== "DEBUG10") return { discount: 0, total: subtotal };

  const discount = subtotal * 0.1;
  const total = subtotal - discount;

  return { discount, total };
}
