import { Button, Select, SelectItem } from '@nextui-org/react';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import { ContractTypes } from '../../core/enums/contractTypes';
import { PositionLevels } from '../../core/enums/positionLevels';
import { useAppDispatch, useAppSelector } from '../../core/hooks/storeHooks';
import { PreSavedJob } from '../../core/models/preSavedJob';
import { addJobAction } from '../../core/store/jobs/jobsActions';
import { getUserBundlesAction } from '../../core/store/users/usersActions';
import { AddJobRequest } from '../../infra/services/jobs/requests/addJobRequest';
import MessageBanner from '../../shared/components/MessageBanner';
import { Spinner } from '../../shared/components/Spinner';
import { salaryRanges } from '../../shared/utils/enums';
import { isValidUUID } from '../../shared/utils/stringUtils';
import { showToast } from '../../shared/utils/toast';
import Form, { FormValues } from './Form';
import PreviewModal from './PreviewModal';

const PostJob: React.FC = () => {
  const isLoading = useAppSelector((c) => c.jobs.isLoading);
  const quillRef = useRef<ReactQuill>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [tagValue, setTagValue] = useState('');
  const [description, setDescription] = useState('');
  const problems = useAppSelector((c) => c.jobs.createJobsProblems);
  const userBundles = useAppSelector((c) => c.users.userBundles);
  const [selectedBundle, setSelectedBundle] = useState<string | null>(null);
  const [companyLogo, setCompanyLogo] = useState<File | null>(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [preSavedJob, setPreSaveJob] = useState<PreSavedJob | null>(null);
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null);

  useEffect(() => {
    const filter = `$orderby=CreatedDate desc,RemainingPositions desc&$filter=RemainingPositions gt 0&$count=true`;
    dispatch(getUserBundlesAction(filter));
  }, []);

  const handleDrop = (e: any) => {
    e.preventDefault();

    if (e.dataTransfer.items) {
      for (let i = 0; i < e.dataTransfer.items.length; i++) {
        const file = e.dataTransfer.items[i].getAsFile();
        processFile(file);
      }
    } else {
      for (let i = 0; i < e.dataTransfer.files.length; i++) {
        const file = e.dataTransfer.files[i];
        processFile(file);
      }
    }
  };

  const handleFile = (file: any) => {
    setCompanyLogo(file);
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
  };

  const processFile = (file: File) => {
    if (file.type.startsWith('image/')) {
      handleFile(file);
    } else {
      showToast('File Format Invalid! Acceptable formats: .jpg, png, .ico, .jpeg', 'warning');
    }
  };
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter' && tagValue.trim() !== '') {
      if (tags.some((c) => c === tagValue)) {
        showToast('Tag already included', 'warning');
        return;
      }
      setTags([...tags, tagValue.trim()]);
      setTagValue('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handlePreSaveJob = (data: FormValues) => {
    if (!description) showToast("Job description can't be blank", 'warning');
    if (!selectedBundle) showToast('Please select a bundle to complete the operation', 'warning');

    const job: PreSavedJob = {
      title: data.title,
      description: getHtml()!,
      budget: salaryRanges[Number(data.budget)].label,
      companyName: data.companyName,
      contractType: Number(data.contractType) as ContractTypes,
      positionLevels: Number(data.positionLevel) as PositionLevels,
      tags: tags,
      city: data.city,
      country: data.country,
      positionUrl: data.positionUrl,
      companyLogo: companyLogo,
      companyWebsite: data.companyWebsite,
      userBundle: userBundles?.items.find((c) => c.id === selectedBundle)!,
      companyId: selectedCompanyId
    };

    setPreSaveJob(job);
    setShowPreviewModal(true);
  };

  const handleSubmit = () => {
    if (!preSavedJob) showToast('Failed when trying to save, please, close popup and try again', 'error');

    const request: AddJobRequest = {
      jobTitle: preSavedJob!.title!,
      jobDescription: getHtml()!,
      budget: preSavedJob?.budget,
      companyName: preSavedJob?.companyName!,
      contractType: Number(preSavedJob?.contractType) as ContractTypes,
      positionLevels: Number(preSavedJob?.positionLevels) as PositionLevels,
      tags: tags,
      city: preSavedJob!.city,
      country: preSavedJob!.country,
      positionUrl: preSavedJob!.positionUrl,
      companyLogo: companyLogo,
      companyWebsite: preSavedJob!.companyWebsite,
      userBundleId: preSavedJob?.userBundle.id!,
      companyId: selectedCompanyId
    };

    dispatch(addJobAction({ request, navigate }));
    setTags([]);
  };

  const getHtml = () => {
    if (quillRef.current) {
      const quill = quillRef.current.getEditor();
      const htmlContent = quill.root.innerHTML;
      return htmlContent;
    }
  };

  const getSelectBundleDescription = (bundle: UserBundle) => {
    return `${bundle.name} - Remaining Creations ${bundle.remainingPositions} - Purchased ${moment(bundle.createdDate).fromNow()}`;
  };

  const buyBundlesBanner = () => {
    return (
      <>
        {userBundles?.items.every((c) => c.remainingPositions === 0) && !isLoading && (
          <div className="flex flex-col justify-start bg-orange-200 w-[100%] h-auto p-4 rounded mb-1">
            <div className="flex items-center justify-between gap-1">
              <p className="text-orange-600 font-bold">You have no valid bundles</p>
              <Button onClick={() => navigate('/prices')} className="bg-orange-300">
                Buy
              </Button>
            </div>
          </div>
        )}
      </>
    );
  };

  return (
    <div className="flex flex-col justify-center mx-auto my-0 max-w-7xl px-8 sm:px-1 w-[100%] mt-14">
      <div className="flex flex-col justify-between w-fit">
        <h1 className="text-[#415A77] font-semibold">New Job Position</h1>
        <span className="text-[#6787AD] self-end">Submit your job description</span>
      </div>
      <div className="bg-white p-8 font-semibold text-sky-600 rounded-xl shadow-sm mt-8">
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <div className="flex mb-2">
              {tags.map((tag, index) => (
                <div
                  key={index}
                  className="bg-[#6787AD] w-auto text-2xl h-auto text-white border-1 rounded-3xl px-2 py-1 m-1"
                  onClick={() => removeTag(tag)}
                >
                  {tag}
                </div>
              ))}
            </div>
            {problems.length > 0 && <MessageBanner problems={problems} />}
            {userBundles?.items!.some((c) => c.remainingPositions > 1) ? (
              <Select
                placeholder="Select a ticket"
                className="xl:w-[60%] lg:w-[60%] md:w-[60%] sm:w-full mt-8"
                onChange={(e) => setSelectedBundle(e.target.value)}
              >
                {userBundles.items
                  .filter((c) => c.remainingPositions > 0)
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((bundle: UserBundle) => (
                    <SelectItem key={bundle.id} value={bundle.id}>
                      {getSelectBundleDescription(bundle)}
                    </SelectItem>
                  ))}
              </Select>
            ) : (
              buyBundlesBanner()
            )}
            {isValidUUID(selectedBundle) && (
              <Form
                companyLogo={companyLogo}
                handleDrop={handleDrop}
                handleKeyDown={handleKeyDown}
                isBundleSelected={isValidUUID(selectedBundle)}
                onDragOver={handleDragOver}
                onSubmit={handlePreSaveJob}
                quillRef={quillRef}
                setDescription={setDescription}
                setTagValue={setTagValue}
                tagValue={tagValue}
                setLogo={(e) => handleFile(e)}
                onSelectCompanyId={setSelectedCompanyId}
              />
            )}
          </>
        )}
      </div>
      <PreviewModal
        show={showPreviewModal && preSavedJob !== null}
        job={preSavedJob!}
        onClose={() => setShowPreviewModal(false)}
        onConfirm={handleSubmit}
        isLoading={isLoading}
      />
    </div>
  );
};

export default PostJob;
