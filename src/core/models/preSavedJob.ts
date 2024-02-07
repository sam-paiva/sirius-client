import { ContractTypes } from '../enums/contractTypes';
import { PositionLevels } from '../enums/positionLevels';

export interface PreSavedJob {
  title: string;
  description: string;
  tags?: string[];
  budget?: string;
  country: string;
  city: string;
  contractType: ContractTypes;
  positionLevels: PositionLevels;
  companyName?: string;
  positionUrl: string;
  companyWebsite: string | null;
  companyLogo: string | null;
  userBundleId: string;
}
