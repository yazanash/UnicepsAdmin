import PlansPricing from "./components/PlansPricing";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlanItem } from "@/types/plans";
import { apiServerGet } from "@/lib/api-server";
const PlansPage = async ({
  params,
}: {
  params: Promise<{ productId: string }>;
}) => {
  const { productId } = await params;
  const res = await apiServerGet(`/Plan/GetAllPlans/${productId}`);
  const plans: PlanItem[] = res;
  return (
    <div className="p-6">
     
      <PlansPricing initialPlans={plans} productId={Number(productId)} />
    </div>
  );
};

export default PlansPage;
