// Centralized Brand Offers and Coupon configurations (Single Source of Truth)

export const announcements = [
  { text: "🚚 FREE SHIPPING ON ALL ORDERS ABOVE ₹999", key: "shipping_999_free" },
  { text: "🔄 EASY 15-DAY RETURN & REFUND POLICY", key: "15_day_returns" },
  { text: "✨ 100% HANDLOOM PREMIUM AUTHENTICITY", key: "handloom_authenticity_100%" },
  { text: "💰 CASH ON DELIVERY AVAILABLE NATIONWIDE", key: "cod" },
  { text: "🎟️ USE CODE 'SADHI10' FOR EXTRA 10% OFF", key: "discount_code" },
  { text: "🔥 SPECIAL FESTIVE: USE 'SADHI50' FOR FLAT 50% OFF ON ORDERS ABOVE ₹1999", key: "silk_saree_special" },
];

export const coupons = [
  {
    code: "SADHI10",
    discountPercent: 10,
    description: "Get flat 10% off your entire order!",
    key: "discount_code",
    minCartValue: 0
  },
  {
    code: "SADHI50",
    discountPercent: 50,
    description: "Special Festive Promo - flat 50% off on premium orders!",
    key: "silk_saree_special",
    minCartValue: 1999
  }
];

export const shippingPolicy = {
  freeShippingThreshold: 999,
  standardShippingFee: 99,
  key: "shipping_999_free"
};
