import { Button } from '@nextui-org/react';
import { animated, useSpring } from '@react-spring/web';
import React, { useEffect, useState } from 'react';
import { BsBox } from 'react-icons/bs';
import { MdDeveloperMode, MdVerified } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import background from '../../assets/background.png';

const Home: React.FC = () => {
  const props = useSpring({
    opacity: 1,
    transform: 'translate(0px, 0px)',
    from: { opacity: 0, transform: 'translate(0px, -780px)' }
  });

  const secondProps = useSpring({
    opacity: 1,
    delay: 400,
    transform: 'translate(0px, 0px)',
    from: { opacity: 0, transform: 'translate(-500px, 0px)' }
  });
  const navigate = useNavigate();
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const speed = 100;
  const fullText = 'Search new Positions';

  useEffect(() => {
    const interval = setTimeout(() => {
      if (index < fullText.length) {
        setText((prevText) => prevText + fullText.charAt(index));
        setIndex((prevIndex) => prevIndex + 1);
      }
      setShowCursor((prevShowCursor) => !prevShowCursor);
    }, speed);

    return () => clearTimeout(interval);
  }, [index, fullText]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prevShowCursor) => !prevShowCursor);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  const box = (icon: JSX.Element, title: string, text: string) => {
    return (
      <div className="bg-[#f8f8f8] flex flex-col w-full h-60 sm:h-auto md:h-[200px] md:justify-center shadow-lg rounded-3xl p-8 hover:bg-[#415A77] hover:text-white transition">
        <div className="flex md:flex-col justify-start items-baseline gap-2">
          <div className="md:flex md:w-full md:justify-center">{icon}</div>
          <label className="mb-2 text-xl md:text-center">{title}</label>
        </div>
        <span className="text-left md:hidden sm:text-sm">{text}</span>
      </div>
    );
  };

  return (
    <div>
      <div
        style={{
          width: '100%',
          minHeight: '500px',
          background: `url(${background})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover'
        }}
        className="flex justify-center items-center flex-col sm:p-8"
      >
        <animated.div style={props} className={'mx-auto my-0 max-w-5xl px-8 w-[100%] flex flex-col justify-center items-center'}>
          <h1 className="text-white font-bold text-center">
            {text}
            <span className={showCursor ? 'opacity-100' : 'opacity-0'}>|</span>
          </h1>
          <h2 className="text-white mt-4 text-2xl text-center">
            Discover a seamless IT job-hunting experience with our user-friendly platform. Uncover a plethora of career opportunities
            tailored to your skills and aspirations.
          </h2>
          <div className="mt-5 gap-4 flex items-center sm:flex-col">
            <Button
              className="rounded-2xl bg-transparent text-white border-1 w-[250px] h-[60px] text-2xl"
              onClick={() => navigate('/search-jobs')}
            >
              View Positions
            </Button>
            <Button
              className="rounded-2xl bg-transparent text-white border-1 w-[250px] h-[60px] text-2xl"
              onClick={() => navigate('/post-job')}
            >
              Post a Job
            </Button>
          </div>
        </animated.div>
      </div>
      <animated.div
        style={secondProps}
        className="flex flex-col justify-start items-start mx-auto my-0 max-w-7xl px-12 pb-16 w-full mt-10 h-full"
      >
        <h1 className="text-default-700 text-center text-4xl">Unlock your dream job with us</h1>
        <div className="mt-10 flex sm:flex-col items-center justify-center gap-6">
          {box(
            <BsBox />,
            'Wide Range of the Job Openings',
            'Our website features a diverse selection of job openings suitable for various skill levels and backgrounds, making it easier for you to find opportunities tailored to your expertise.'
          )}
          {box(
            <MdVerified />,
            'Verified Companies Only',
            'All companies listed on our platform are carefully vetted for authenticity and reliability, ensuring you can trust the legitimacy of every job posting.'
          )}
          {box(
            <MdDeveloperMode />,
            'Empowering Efficiency',
            'The company is constantly working to make the employment process as comfortable and fast as possible for both the searcher and the employer.'
          )}
        </div>
      </animated.div>
    </div>
  );
};

export default Home;
