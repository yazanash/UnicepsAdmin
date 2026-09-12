"use server";

import { z } from "zod";

// Mock DB data for demonstration
const PLANS: Record<string, { name: string; price: number }> = {
  basic: { name: "Basic Plan", price: 29 },
  pro: { name: "Pro Plan", price: 79 },
  enterprise: { name: "Enterprise Plan", price: 199 },
};

const MOCK_COUPONS: Record<string, { discountPercent: number }> = {
  SAVE10: { discountPercent: 10 },
  HALF: { discountPercent: 50 },
};

// 1. Coupon Validation Action (First Validation)
export async function validateCouponAction(code: string, planId: string) {
  await new Promise((resolve) => setTimeout(resolve, 300)); // Simulate DB delay

  const cleanCode = code.trim().toUpperCase();
  const coupon = MOCK_COUPONS[cleanCode];

  if (!coupon) {
    return { success: false, message: "Invalid or expired coupon code" };
  }

  const plan = PLANS[planId];
  if (!plan) {
    return { success: false, message: "Invalid plan selected" };
  }

  const discountAmount = (plan.price * coupon.discountPercent) / 100;

  return {
    success: true,
    code: cleanCode,
    discountPercent: coupon.discountPercent,
    discountAmount,
    message: `Coupon applied: ${coupon.discountPercent}% OFF`,
  };
}

// 2. Final Submit Action (Second Validation)
export async function submitCheckoutAction(formData: FormData) {
  try {
    const planId = formData.get("planId") as string;
    const email = formData.get("email") as string;
    const couponCode = formData.get("couponCode") as string;
    const gateway = formData.get("gateway") as string;
    const receiptFile = formData.get("receipt") as File;

    if (!receiptFile || receiptFile.size === 0) {
      return { success: false, error: "Receipt file is required" };
    }

    const plan = PLANS[planId];
    if (!plan) return { success: false, error: "Invalid plan selected" };

    // --- SECOND VALIDATION OF COUPON ---
    let finalPrice = plan.price;
    let discountApplied = 0;

    if (couponCode) {
      const cleanCode = couponCode.trim().toUpperCase();
      const validCoupon = MOCK_COUPONS[cleanCode];

      if (validCoupon) {
        discountApplied = (plan.price * validCoupon.discountPercent) / 100;
        finalPrice = plan.price - discountApplied;
      } else {
        return { success: false, error: "Coupon is no longer valid" };
      }
    }

    // Process file upload (e.g., S3 / Vercel Blob)
    // const receiptUrl = await uploadToStorage(receiptFile);

    // Save order in Database
    // const order = await db.order.create({...})

    console.log("Order processed successfully:", {
      email,
      planId,
      basePrice: plan.price,
      finalPrice,
      gateway,
      fileName: receiptFile.name,
    });

    return {
      success: true,
      orderId: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
      finalPrice,
    };
  } catch (err: any) {
    return { success: false, error: "Failed to process order" };
  }
}
