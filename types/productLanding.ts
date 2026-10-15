import { FeatureType } from "@/types/productFeature";
import { UserStepType } from "@/types/userStep";
import { PlanItem } from "@/types/plans";
import { ReleaseType } from "@/types/release";
import { FAQsType } from "@/types/faqs";
import { ProductType } from "@/types/products";

export interface ProductLandingData {
  product: ProductType;
  features: FeatureType[];
  steps: UserStepType[];
  pricingPlans: PlanItem[];
  latestReleases: ReleaseType[];
  faQs: FAQsType[];
}
