import { Divider, Modal, ModalBody, ModalContent } from '@nextui-org/react';
import moment from 'moment';
import React, { useEffect } from 'react';
import { BsEnvelopePaper } from 'react-icons/bs';
import locationSvg from '../../../assets/location.svg';
import skillSvg from '../../../assets/skill.svg';
import { ContractTypes } from '../../../core/enums/contractTypes';
import { PositionLevels } from '../../../core/enums/positionLevels';
import { PreSavedJob } from '../../../core/models/preSavedJob';
import { default as PrimaryButton, default as SubmitButton } from '../../../shared/components/PrimaryButton';
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
                <div className="bg-white p-12 rounded-md shadow-sm mb-10 w-[100%] flex-wrap">
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col gap-2">
                      <span>Job From {moment().format('LL')}</span>
                      <h1 className="text-4xl text-[#415A77] font-bold">{job!.title}</h1>
                      <span className="">{job.budget}</span>
                      <span className="">{job.companyName}</span>
                      <div className="flex items-start flex-col gap-3">
                        <div className="flex items-center gap-2">
                          <img src={locationSvg} />
                          <span>
                            {job.country} / {job.city}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <BsEnvelopePaper />
                          <span>{getEnumKey(ContractTypes, job.contractType)}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <img src={skillSvg} />
                          <span>{getEnumKey(PositionLevels, job.positionLevels)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="self-start">
                      {job.companyLogo && <img id="preview-logo" width={150} className="bg-gray-100 rounded-full" />}
                    </div>
                  </div>

                  <div className="flex items-end justify-start mt-4">
                    {job.tags!.length > 0 &&
                      job.tags?.map((tag, key) => (
                        <div key={key} className="bg-[#6787AD] text-tiny text-white border-1 rounded-xl px-2 py-1 m-1">
                          {tag}
                        </div>
                      ))}
                  </div>
                  <div className="flex flex-col w-[100%] text-justify p-2 mt-10">
                    <div className="w-[100%] overflow-ellipsis max-w-full" dangerouslySetInnerHTML={{ __html: job!.description }} />
                  </div>

                  <div className="mt-10 flex justify-end">
                    <PrimaryButton onClick={() => window.open(job.positionUrl, '_blank')}>APPLY</PrimaryButton>
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
