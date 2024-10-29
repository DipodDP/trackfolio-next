import { Portfolio } from "@/app/(root)/portfolio/data/schema";
import {
  IPlanPortfolioPosition,
  IPortfolioPosition,
} from "@/lib/models/portfolio.api.model";

type AssetInfoCardProps = {
  assetInfo: IPortfolioPosition;
  assetPlanInfo: IPlanPortfolioPosition;
};
export const AssetInfoCard = ({
  assetInfo,
  assetPlanInfo,
}: AssetInfoCardProps) => {
  return <div>AssetInfoCard</div>;
};
