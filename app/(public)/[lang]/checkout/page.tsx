"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { validateCouponAction, submitCheckoutAction } from "./actions/checkout";

const PLANS = [
  {
    id: "basic",
    name: "Basic Plan",
    price: 29,
    description: "Essential features for individuals",
  },
  {
    id: "pro",
    name: "Pro Plan",
    price: 79,
    description: "Best for growing businesses",
  },
  {
    id: "enterprise",
    name: "Enterprise Plan",
    price: 199,
    description: "Full access + dedicated support",
  },
];

const GATEWAYS = [
  {
    id: "instapay",
    name: "InstaPay",
    instructions: [
      "Open your bank application.",
      "Transfer the total amount to the address below.",
      "Save the confirmation receipt screenshot for Step 4.",
    ],
    details: {
      address: "trioverse@instapay",
      accountName: "TrioVerse Inc.",
    },
  },
  // ... other gateways
];

const checkoutSchema = z.object({
  planId: z.string().min(1, "Please select a plan"),
  email: z.string().email("Invalid email address"),
  couponCode: z.string().optional(),
  gateway: z.string().min(1, "Please select a payment gateway"),
  transactionNumber: z
    .string()
    .min(5, "Transaction number must be at least 5 characters")
    .max(50, "Transaction number is too long"),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const [step, setStep] = useState<number>(1);
  const [isPending, startTransition] = useTransition();

  // Coupon state
  const [couponStatus, setCouponStatus] = useState<{
    valid: boolean;
    message: string;
    discountPercent: number;
    discountAmount: number;
  } | null>(null);

  const [receiptPreview, setReceiptPreview] = useState<string | null>(null);
  const [orderResult, setOrderResult] = useState<{
    orderId: string;
    price: number;
  } | null>(null);

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      planId: "pro",
      email: "",
      couponCode: "",
      gateway: "bank_transfer",
    },
  });

  const selectedPlanId = watch("planId");
  const enteredCoupon = watch("couponCode");
  const selectedPlan = PLANS.find((p) => p.id === selectedPlanId) || PLANS[0];

  // Dynamic calculations
  const basePrice = selectedPlan.price;
  const discountAmount = couponStatus?.valid ? couponStatus.discountAmount : 0;
  const finalPrice = Math.max(0, basePrice - discountAmount);

  // Validate coupon (Client Step)
  const handleApplyCoupon = async () => {
    if (!enteredCoupon?.trim()) return;

    startTransition(async () => {
      const res = await validateCouponAction(enteredCoupon, selectedPlanId);
      if (res.success) {
        setCouponStatus({
          valid: true,
          message: res.message,
          discountPercent: res.discountPercent!,
          discountAmount: res.discountAmount!,
        });
      } else {
        setCouponStatus({
          valid: false,
          message: res.message,
          discountPercent: 0,
          discountAmount: 0,
        });
      }
    });
  };

  // Step Navigation Validation
  const nextStep = async () => {
    if (step === 1) {
      const isValid = await trigger("planId");
      if (isValid) setStep(2);
    } else if (step === 2) {
      const isValid = await trigger(["email"]);
      if (isValid) setStep(3);
    } else if (step === 3) {
      const isValid = await trigger("gateway");
      if (isValid) setStep(4);
    }
  };

  // Final Submission
  const onSubmit = (data: CheckoutFormData) => {
    startTransition(async () => {
      const formData = new FormData();
      formData.append("planId", data.planId);
      formData.append("email", data.email);
      formData.append("couponCode", data.couponCode || "");
      formData.append("gateway", data.gateway);
      formData.append("receipt", data.transactionNumber);

      const res = await submitCheckoutAction(formData);

      if (res.success && res.orderId) {
        setOrderResult({ orderId: res.orderId, price: res.finalPrice! });
      } else {
        alert(res.error || "Submission failed");
      }
    });
  };

  if (orderResult) {
    return (
      <div className="max-w-md mx-auto py-12 p-6 bg-white dark:bg-black border rounded-xl shadow-sm text-center">
        <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">
          ✓
        </div>
        <h2 className="text-2xl font-bold mb-2">Order Submitted!</h2>
        <p className="text-gray-600 mb-4">
          We are verifying your transaction receipt.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg text-left text-sm space-y-2 mb-6">
          <p>
            <span className="font-semibold">Order ID:</span>{" "}
            {orderResult.orderId}
          </p>
          <p>
            <span className="font-semibold">Amount Paid:</span> $
            {orderResult.price.toFixed(2)}
          </p>
          <p>
            <span className="font-semibold">Status:</span> Pending Review
          </p>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="w-full py-2 bg-black text-white rounded-lg text-sm font-medium"
        >
          Return to Store
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto pt-24 p-5">
      <div className="max-w-xl mx-auto p-6 border bg-white rounded-2xl shadow-sm">
        {/* Progress Bar */}
        <div className="flex items-center justify-between mb-8 border-b pb-4">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`flex items-center gap-2 text-sm font-semibold ${
                step >= s ? "text-black" : "text-gray-300"
              }`}
            >
              <span
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs ${
                  step >= s
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                {s}
              </span>
              <span className="hidden sm:inline">
                {s === 1
                  ? "Plan"
                  : s === 2
                    ? "Account"
                    : s === 3
                      ? "Gateway"
                      : "Receipt"}
              </span>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* STEP 1: Select Plan */}
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold">Select a Plan</h2>
              <div className="grid gap-3">
                {PLANS.map((plan) => (
                  <label
                    key={plan.id}
                    className={`border rounded-xl p-4 flex items-center justify-between cursor-pointer transition ${
                      selectedPlanId === plan.id
                        ? "border-black bg-gray-50 ring-1 ring-black"
                        : "hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        value={plan.id}
                        {...register("planId")}
                        className="accent-black"
                      />
                      <div>
                        <p className="font-semibold text-sm">{plan.name}</p>
                        <p className="text-xs text-gray-500">
                          {plan.description}
                        </p>
                      </div>
                    </div>
                    <span className="font-bold text-sm">${plan.price}/mo</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Email & Coupon */}
          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold">Your Email & Coupon</h2>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  {...register("email")}
                  className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Coupon Code (Optional)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. SAVE10"
                    {...register("couponCode")}
                    className="flex-1 border rounded-lg px-3 py-2 text-sm uppercase outline-none focus:ring-2 focus:ring-black"
                  />
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    disabled={isPending}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-sm font-medium rounded-lg disabled:opacity-50"
                  >
                    Apply
                  </button>
                </div>
                {couponStatus && (
                  <p
                    className={`text-xs mt-1.5 font-medium ${
                      couponStatus.valid ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {couponStatus.message}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* STEP 3: Choose Payment Gateway & View Instructions */}
          {step === 3 && (
            <div className="animate-fadeIn space-y-5">
              <div>
                <h2 className="text-xl font-bold">Choose Payment Gateway</h2>
                <p className="text-xs text-gray-500 mt-1">
                  Select a method below and follow the payment instructions.
                </p>
              </div>

              {/* Gateway Selector */}
              <div className="grid gap-3">
                {GATEWAYS.map((gw) => (
                  <label
                    key={gw.id}
                    className={`border rounded-xl p-4 flex items-center justify-between cursor-pointer transition-all ${
                      watch("gateway") === gw.id
                        ? "border-black bg-gray-50 ring-1 ring-black"
                        : "hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        value={gw.id}
                        {...register("gateway")}
                        className="accent-black"
                      />
                      <span className="text-sm font-semibold">{gw.name}</span>
                    </div>
                  </label>
                ))}
              </div>

              {/* DYNAMIC GATEWAY INSTRUCTIONS */}
              {(() => {
                const selectedGateway = GATEWAYS.find(
                  (gw) => gw.id === watch("gateway"),
                );
                if (!selectedGateway?.instructions) return null;

                return (
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-3">
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
                      Payment Instructions
                    </p>

                    {/* Render array of steps or HTML string depending on your object structure */}
                    {Array.isArray(selectedGateway.instructions) ? (
                      <ol className="list-decimal list-inside text-sm text-gray-700 space-y-1.5">
                        {selectedGateway.instructions.map(
                          (stepItem: string, idx: number) => (
                            <li key={idx} className="leading-relaxed">
                              {stepItem}
                            </li>
                          ),
                        )}
                      </ol>
                    ) : (
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {selectedGateway.instructions}
                      </p>
                    )}

                    {/* If your object includes bank/account details */}
                    {selectedGateway.details && (
                      <div className="mt-3 pt-3 border-t border-gray-200 text-xs space-y-1 text-gray-600">
                        {Object.entries(selectedGateway.details).map(
                          ([key, val]) => (
                            <p key={key}>
                              <span className="font-semibold capitalize">
                                {key}:
                              </span>{" "}
                              {val as string}
                            </p>
                          ),
                        )}
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
          )}

          {/* STEP 4: Transaction Reference Number */}
          {step === 4 && (
            <div className="animate-fadeIn space-y-4">
              <div>
                <h2 className="text-xl font-bold">Transaction Verification</h2>
                <p className="text-xs text-gray-500 mt-1">
                  Enter the transaction reference or sequence number from your
                  transfer confirmation.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Transaction / Reference Number
                </label>
                <input
                  type="text"
                  placeholder="e.g. TXN-984201385"
                  {...register("transactionNumber")}
                  className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black uppercase font-mono tracking-wider"
                />
                {errors.transactionNumber && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.transactionNumber.message as string}
                  </p>
                )}
              </div>

              <div className="bg-gray-50 border rounded-xl p-3 text-xs text-gray-600">
                <p className="font-semibold text-gray-900 mb-1">
                  Where to find this?
                </p>
                <p>
                  Check your payment app receipt or bank transfer confirmation
                  SMS/email for a Reference ID, Ref No., or Transaction ID.
                </p>
              </div>
            </div>
          )}

          {/* PRICE SUMMARY BOX (Visible on Steps 2, 3 & 4) */}
          {step > 1 && (
            <div className="bg-gray-50 border rounded-xl p-4 text-sm space-y-2 mt-6">
              <div className="flex justify-between text-gray-600">
                <span>{selectedPlan.name}</span>
                <span>${basePrice.toFixed(2)}</span>
              </div>
              {couponStatus?.valid && (
                <div className="flex justify-between text-green-600 font-medium">
                  <span>Discount ({couponStatus.discountPercent}%)</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="border-t pt-2 flex justify-between font-bold text-base text-black">
                <span>Total due</span>
                <span>${finalPrice.toFixed(2)}</span>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-3 pt-4 border-t">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep((s) => s - 1)}
                className="flex-1 py-2.5 border rounded-lg text-sm font-semibold hover:bg-gray-50"
              >
                Back
              </button>
            )}

            {step < 4 ? (
              <button
                type="button"
                onClick={nextStep}
                className="flex-1 py-2.5 bg-black text-white rounded-lg text-sm font-semibold hover:bg-gray-800"
              >
                Next Step
              </button>
            ) : (
              <button
                type="submit"
                disabled={isPending}
                className="flex-1 py-2.5 bg-black text-white rounded-lg text-sm font-semibold hover:bg-gray-800 disabled:opacity-50"
              >
                {isPending ? "Submitting Order..." : "Submit Payment Receipt"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
