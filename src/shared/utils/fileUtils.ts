export const readFileAsBase64 = (file: File, onCallback: (fileString: string) => void) => {
  const reader = new FileReader();

  reader.onloadend = () => {
    if (typeof reader.result === 'string') {
      const base64String = reader.result;
      onCallback(base64String);
    }
  };

  reader.readAsDataURL(file);
};
