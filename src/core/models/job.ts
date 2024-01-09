import { ContractTypes } from '../enums/contractTypes';

export interface Job {
  description: string;
  title: string;
  tags: string[];
  budget: string;
  id: string;
  userId: string;
  applications: [];
  location: Location;
  createdDate: string;
  company: string;
  contractType: ContractTypes;
}
