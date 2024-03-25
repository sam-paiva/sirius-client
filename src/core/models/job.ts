import { ContractTypes } from '../enums/contractTypes';
import { PositionLevels } from '../enums/positionLevels';
import { Company } from './company';

export interface Job {
  description: string;
  title: string;
  tags: string[];
  budget: string;
  id: string;
  userId: string;
  location: Location;
  createdDate: string;
  contractType: ContractTypes;
  positionLevel: PositionLevels;
  positionUrl: string;
  company: Company;
  selectedBundle: string;
  userBundle: UserBundle;
  positionFilled: boolean;
  views: number;
}
