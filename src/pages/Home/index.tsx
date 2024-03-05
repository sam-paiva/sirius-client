import { animated, useSpring } from '@react-spring/web';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../core/hooks/storeHooks';
import GoogleIcon from '../../shared/Icons/GoogleIcon';
import LinkedinIcon from '../../shared/Icons/LinkedinIcon';
import MicrosoftIcon from '../../shared/Icons/MicrosoftIcon';
import Empty from '../../shared/components/Empty';
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
          background:
            'linear-gradient(90deg, hsla(235, 46%, 16%, 1) 13%, hsla(228, 45%, 38%, 1) 40%, hsla(218, 52%, 54%, 1) 61%, hsla(213, 79%, 72%, 1) 77%, hsla(208, 82%, 82%, 1) 88%, hsla(204, 31%, 94%, 1) 100%)',
          paddingInline: '8px'
        }}
        className="flex justify-center items-center flex-col"
      >
        <animated.div style={props} className={'mx-auto my-0 max-w-5xl px-8 w-[100%]'}>
          <h1 className="text-white font-bold">Search for your positions</h1>
          <div className="flex items-center">
            {jobs && jobs.total! > 0 && <span className="text-orange-300 text-2xl font-medium mr-1">{displayPositionsCount()}</span>}
            {jobs?.total! > 0 && <h2 className="text-white text-2xl font-medium">opened position(s)🚀</h2>}
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
        <span className="text-default-500 text-center text-xl">Companies that trust on us</span>
        <div className="flex w-full mt-8 justify-center gap-8 mb-20">
          <GoogleIcon />
          <MicrosoftIcon />
          <LinkedinIcon />
        </div>
        <h1 className="text-2xl font-semibold">Last opened positions</h1>
        <div className="mt-10">{!isLoading && jobs && jobs?.items?.map((job, key) => <JobCard job={job} key={key} />)}</div>
        {jobs?.items.length === 0 && <Empty />}
      </div>
    </div>
  );
};

export default Home;
