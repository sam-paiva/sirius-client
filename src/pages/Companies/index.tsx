import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../core/hooks/storeHooks';
import { CreateCompanyRequest } from '../../infra/services/users/requests/createCompanyRequest';
import ContainerWrapper from '../../shared/components/ContainerWrapper';
import PrimaryButton from '../../shared/components/PrimaryButton';
import { createCompanyAction } from '../../store/users/usersActions';
import CreateCompanyModal from './CreateCompanyModal';

export interface CompanyFormValues {
  name: string;
  website: string;
  logo: File;
}

const Companies: React.FC = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const isLoading = useAppSelector((c) => c.users.isLoading);
  const dispatch = useAppDispatch();

  const handleSubmit = (data: CompanyFormValues) => {
    const request: CreateCompanyRequest = {
      name: data.name,
      website: data.website,
      logo: data.logo
    };

    dispatch(createCompanyAction({ request, callback: () => setShowCreateModal(false) }));
  };

  return (
    <ContainerWrapper>
      <h1>Companies</h1>
      <div className="mt-5">
        <PrimaryButton onClick={() => setShowCreateModal(true)}>Add New</PrimaryButton>
      </div>
      <CreateCompanyModal
        show={showCreateModal}
        isLoading={isLoading}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleSubmit}
        preLoadedCompanies={[]}
      />
    </ContainerWrapper>
  );
};

export default Companies;
