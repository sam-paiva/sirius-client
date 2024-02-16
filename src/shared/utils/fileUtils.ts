import axios from 'axios';

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

export const urlToFile = (url: string, onCallback: (file: File) => void, mimeType: string = 'image/png') => {
  const filename = url.split('/').pop()!;
  axios
    .get(url, {
      decompress: false,
      responseType: 'arraybuffer'
    })
    .then((response) => {
      return new Blob([response.data]);
    })
    .then((blob) => {
      const file = new File([blob], filename, { type: mimeType });
      onCallback(file);
    });
};

export const handleDropFile = (e: any, onCallback: (file: File) => void) => {
  e.preventDefault();

  if (e.dataTransfer.items) {
    // Use DataTransferItemList interface to access the file(s)
    for (let i = 0; i < e.dataTransfer.items.length; i++) {
      const file = e.dataTransfer.items[i].getAsFile();
      onCallback(file);
    }
  } else {
    // Use DataTransfer interface to access the file(s)
    for (let i = 0; i < e.dataTransfer.files.length; i++) {
      const file = e.dataTransfer.files[i];
      onCallback(file);
    }
  }
};
