import { animated, useSpring } from '@react-spring/web';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../core/hooks/storeHooks';
import JobCard from '../../shared/components/JobCard';
import PrimaryButton from '../../shared/components/PrimaryButton';

const Home: React.FC = () => {
  const props = useSpring({
    opacity: 1,
    transform: 'translate(0px, 0px)',
    from: { opacity: 0, transform: 'translate(0px, -180px)' }
  });
  const jobs = useAppSelector((c) => c.jobs.jobs);
  const isLoading = useAppSelector((c) => c.jobs.isLoading);
  const navigate = useNavigate();

  const displayPositionsCount = () => {
    if (jobs!.total! >= 300) return '+300';

    return jobs!.total;
  };

  return (
    <div className="grid">
      <div
        style={{
          width: '100%',
          height: '500px',
          background: 'linear-gradient(90deg, rgba(27,69,124,1) 0%, rgba(222,38,7,1) 100%)',
          paddingInline: '8px'
        }}
        className="flex justify-center items-center flex-col"
      >
        <animated.div style={props} className={'mx-auto my-0 max-w-5xl px-8 w-[100%]'}>
          <h1 className="text-white font-bold">Search for your positions</h1>
          <div className="flex items-center">
            {jobs && <span className="text-orange-300 text-2xl font-medium mr-1">{displayPositionsCount()}</span>}
            <h2 className="text-white text-2xl font-medium">opened positions🚀</h2>
          </div>
          <h2 className="text-white mt-4 text-2xl">
            Discover a seamless IT job-hunting experience with our user-friendly platform. Uncover a plethora of career opportunities
            tailored to your skills and aspirations.
          </h2>
          <div className="mt-5">
            <PrimaryButton onClick={() => navigate('/search-jobs')}>View All Positions</PrimaryButton>
          </div>
        </animated.div>
      </div>
      <div className="flex flex-col justify-center mx-auto my-0 max-w-5xl px-8 w-[100%] mt-14">
        <h1 className="text-2xl font-bold">Recent Positions</h1>
        <div className="mt-10">{!isLoading && jobs && jobs?.items?.map((job, key) => <JobCard job={job} key={key} />)}</div>
      </div>
    </div>
  );
};

export default Home;
