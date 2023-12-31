import axios from 'axios';
import { Problem } from '../core/models/problem';
import { showToast } from '../shared/utils/toast';

export const handleError = (error: any, reject: (problems: Problem[]) => void) => {
  if (axios.isAxiosError(error) && error.response!.status === 422) {
    const problems = error.response?.data.errors as Problem[];

    return reject(problems);
  }

  showToast('An unexpected error occurred during the process, please try it later', 'error');
  return reject([]);
};
