import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Textarea } from '@nextui-org/react';
import { ChangeEvent, FC, useRef, useState } from 'react';
import { useAppSelector } from '../../../core/hooks/storeHooks';
import { Job } from '../../../core/models/job';
import { getDecodedToken } from '../../../infra/services/auth/authService';
import { ApplyRequest } from '../../../infra/services/jobs/requests/applyRequest';

interface Props {
  show: boolean;
  onClose: () => void;
  onApply: (request: ApplyRequest) => void;
  job: Job;
}

export const ApplyModal: FC<Props> = ({ show, onClose, onApply, job }) => {
  const [message, setMessage] = useState('');
  const user = getDecodedToken();
  const [base64String, setBase64String] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isLoading = useAppSelector((c) => c.jobs.isLoading);

  const maxLength = 250;

  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const file = event.target.files![0];

    if (file) {
      setSelectedFile(file);

      // Read the content of the file
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setBase64String(content);
      };

      reader.readAsDataURL(file); // Use readAsDataURL, readAsArrayBuffer, etc., based on your requirements
    }
  };

  const handleButtonClick = () => {
    // Trigger file input click
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleChange = (event: any) => {
    const newText = event.target.value;
    setMessage(newText);
  };

  const remainingChars = maxLength - message.length;

  const handleApply = () => {
    const request: ApplyRequest = {
      jobId: job.id,
      message,
      resume: base64String
    };

    onApply(request);
  };

  return (
    <Modal placement="top-center" isOpen={show} onClose={onClose} isDismissable={false}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-sky-500 font-bold">{job.title}</ModalHeader>
            <ModalBody>
              <Input type="text" label="First Name" readOnly value={user?.unique_name} />

              <Input type="text" label="Last Name" readOnly value={user?.given_name} />
              <p className="text-sm text-gray-400">Characters left: {remainingChars}</p>
              <Textarea onChange={handleChange} placeholder="Message to the recruiter (optional)" maxLength={maxLength} />
              <input
                key={selectedFile?.name ?? ''}
                ref={fileInputRef}
                className="hidden"
                onChange={(event) => handleFileInputChange(event)}
                accept=".doc, .docx, .pdf"
                type="file"
                placeholder="Choose your Resume"
              />
              {selectedFile && <p>{selectedFile.name}</p>}
              <Button onClick={handleButtonClick}>Upload Resume</Button>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button isLoading={isLoading} disabled={!base64String} color="primary" onPress={handleApply}>
                Apply
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
