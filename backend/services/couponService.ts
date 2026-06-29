export function applyCoupon(subtotal: number, couponCode?: string) {
  if (!couponCode) return { discount: 0, total: subtotal };
  if (couponCode !== "DEBUG10") return { discount: 0, total: subtotal };

  if (subtotal < 100) return { discount: 0, total: subtotal }

  const discount = Math.min(subtotal * 0.1, 50);

  const total = subtotal - discount;

  return { discount, total };
}
