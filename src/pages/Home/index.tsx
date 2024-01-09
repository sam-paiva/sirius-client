import { Input } from '@nextui-org/react';
import { animated, useSpring } from '@react-spring/web';
import React from 'react';
import { useAppSelector } from '../../hooks/storeHooks';
import JobCard from '../../shared/components/JobCard';

const Home: React.FC = () => {
  const props = useSpring({
    opacity: 1,
    transform: 'translate(0px, 0px)',
    from: { opacity: 0, transform: 'translate(0px, -180px)' }
  });
  const jobs = useAppSelector((c) => c.jobs.jobs);
  const isLoading = useAppSelector((c) => c.jobs.isLoading);
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
        <animated.div style={props}>
          <h1 className="text-white font-bold">Search for your positions</h1>
          <div className="flex items-center">
            <span className="text-orange-300 text-2xl font-medium mr-1">300+</span>
            <h2 className="text-white text-2xl font-medium">opened positions🚀</h2>
          </div>
          <Input size="lg" className="w-[100%] mt-10" type="text" label="Software Engineer, HR Manager..." />
        </animated.div>
      </div>
      <div className="flex flex-col justify-center mx-auto my-0 max-w-5xl px-8 w-[100%] mt-14">
        <h1 className="text-2xl font-bold">Posted Jobs</h1>
        <div className="mt-8">{!isLoading && jobs.map((job, key) => <JobCard job={job} key={key} />)}</div>
      </div>
    </div>
  );
};

export default Home;
