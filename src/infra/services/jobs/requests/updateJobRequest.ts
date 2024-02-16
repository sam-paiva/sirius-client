import { ContractTypes } from '../../../../core/enums/contractTypes';
import { PositionLevels } from '../../../../core/enums/positionLevels';

export interface UpdateJobRequest {
  jobTitle: string;
  jobDescription: string;
  tags?: string[];
  budget?: string;
  country: string;
  city: string;
  contractType: ContractTypes;
  positionLevels: PositionLevels;
  companyName: string;
  positionUrl: string;
  companyWebsite: string | null;
  companyLogo: File | null;
  companyId: string | null;
  jobId: string;
}
