import { ClockLoader } from 'react-spinners';

export const Spinner = () => {
  return (
    <div className="flex justify-center items-center h-[400px]">
      <ClockLoader color="#fa9453" />
    </div>
  );
};
