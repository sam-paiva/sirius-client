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
  companyLogo: File | null;
  userBundleId: string;
  companyId: string | null;
}

export interface PreUpdateJob {
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
  companyLogo: File | null;
  companyId: string | null;
}
