import { Divider, Modal, ModalBody, ModalContent } from '@nextui-org/react';
import moment from 'moment';
import React, { useEffect } from 'react';
import { BsBuilding } from 'react-icons/bs';
import { GiAncientSword, GiMoneyStack } from 'react-icons/gi';
import { IoLocationOutline } from 'react-icons/io5';
import { LiaFileContractSolid } from 'react-icons/lia';
import { ContractTypes } from '../../../core/enums/contractTypes';
import { PositionLevels } from '../../../core/enums/positionLevels';
import { PreSavedJob } from '../../../core/models/preSavedJob';
import Badge from '../../../shared/components/Badge';
import SubmitButton from '../../../shared/components/PrimaryButton';
import { getEnumKey } from '../../../shared/utils/enumUtils';

interface Props {
  show: boolean;
  job: PreSavedJob;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
}

const PreviewModal: React.FC<Props> = ({ show, job, onClose, onConfirm, isLoading }) => {
  const onPopulateLogo = () => {
    if (job.companyLogo) {
      const imageURL = URL.createObjectURL(job.companyLogo);
      const img = document.getElementById('preview-logo') as HTMLImageElement;
      img.src = imageURL;
    }
  };

  useEffect(() => {
    if (job) onPopulateLogo();
  }, [job]);

  return (
    <Modal size={'full'} isOpen={show} onClose={onClose}>
      <ModalContent>
        {() => (
          <>
            <ModalBody className="overflow-auto">
              {job && (
                <div className="flex flex-col justify-center mx-auto my-0 max-w-5xl px-8 w-[100%] mt-14">
                  <div className="flex flex-col gap-2">
                    <h1 className="text-4xl text-sky-500 font-bold">{job!.title}</h1>
                    <div className="flex gap-1">
                      <Badge content={moment().fromNow()} />
                      {job.userBundle.sponsored && <Badge color="bg-orange-400" content={'Sponsored'} />}
                    </div>
                  </div>
                  <div className="flex mt-2">
                    {job.tags!.map((tag, key) => (
                      <div key={key} className="bg-blue-500 max-w-[100px] text-white rounded px-2 py-1 m-1 cursor-pointer">
                        {tag}
                      </div>
                    ))}
                  </div>

                  <div className="flex items-start w-[100%] gap-3 mt-6">
                    <div className="flex items-center gap-1">
                      {job.companyLogo ? <img id="preview-logo" className="w-[13px] h-[17px]" /> : <BsBuilding />}
                      <span className="text-gray-500">{job.companyName}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <GiMoneyStack />
                      <span className="text-gray-500">{job!.budget}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <IoLocationOutline />
                      <span className="text-gray-500">
                        {job!.country}/{job!.city}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <LiaFileContractSolid />
                      <span className="text-gray-500">{getEnumKey(ContractTypes, job!.contractType)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <GiAncientSword />
                      <span className="text-gray-500">{getEnumKey(PositionLevels, job.positionLevels)}</span>
                    </div>
                  </div>
                  <div className="flex flex-col w-[100%] text-justify p-2 mt-10">
                    <div className="w-[100%] overflow-ellipsis max-w-full" dangerouslySetInnerHTML={{ __html: job!.description }} />
                  </div>

                  <div className="mt-10">
                    <SubmitButton onClick={() => window.open(job.positionUrl, '_blank')}>APPLY</SubmitButton>
                  </div>

                  <Divider className="mt-20" />
                  <div>
                    <span className="font-semibold">
                      Please review it carefully, after submit you are not able to update the position details
                    </span>
                    <div className="mt-10 w-[100%] flex justify-end">
                      <SubmitButton isLoading={isLoading} onClick={onConfirm}>
                        SUBMIT
                      </SubmitButton>
                    </div>
                  </div>
                </div>
              )}
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default PreviewModal;
