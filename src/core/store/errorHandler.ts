import axios from 'axios';
import { showToast } from '../../shared/utils/toast';
import { Problem } from '../models/problem';

export const handleError = (error: any, reject: (problems: Problem[]) => void) => {
  if (axios.isAxiosError(error) && error.response!.status === 422) {
    const problems = error.response?.data.errors as Problem[];

    return reject(problems);
  }

  showToast('An unexpected error occurred during the process, please try again later', 'error');
  return reject([]);
};
