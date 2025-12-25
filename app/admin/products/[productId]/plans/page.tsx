import PlansPricing from "./components/PlansPricing";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plan } from "@/types/plans";
import { apiServerGet } from "@/lib/api-server";
const PlansPage = async ({
  params,
}: {
  params: Promise<{ productId: string }>;
}) => {
  const { productId } = await params;
  const res = await apiServerGet(`/Plan/GetAllPlans/${productId}`,);
  const plans: Plan[] = res;
  return (
    <div className="p-6">
      <div className="flex items-center justify-between my-3">
        <h1 className="text-2xl font-bold">Plans & Pricing</h1>

        <Link href={`/admin/products/${productId}/plans/new`}>
          <Button>Add New Plan</Button>
        </Link>
      </div>

      <PlansPricing plans={plans} />
    </div>
  );
};

export default PlansPage;
