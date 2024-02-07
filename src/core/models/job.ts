import { ContractTypes } from '../enums/contractTypes';
import { PositionLevels } from '../enums/positionLevels';

export interface Job {
  description: string;
  title: string;
  tags: string[];
  budget: string;
  id: string;
  userId: string;
  location: Location;
  createdDate: string;
  companyName: string;
  contractType: ContractTypes;
  positionLevel: PositionLevels;
  positionUrl: string;
  companyWebsite: string;
  companyLogo: string;
  selectedBundle: string;
}
