import { FeatureType } from "@/types/productFeature";
import { UserStepType } from "@/types/userStep";
import { Plan } from "@/types/plans";
import { ReleaseType } from "@/types/release";
import { FAQsType } from "@/types/faqs";
import { ProductType } from "@/types/products";

export interface ProductLandingData {
  product: ProductType;
  features: FeatureType[];
  steps: UserStepType[];
  pricingPlans: Plan[];
  latestReleases: ReleaseType[];
  faQs: FAQsType[];
}