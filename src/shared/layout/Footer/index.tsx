import { Link } from 'react-router-dom';

const Footer = () => {
  const handleLinkClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const linkClass = 'text-default-300 hover:text-white';

  return (
    <footer className="bg-[#415A77] h-[300px] text-gray-300 py-8 sticky top-[100vh] mt-12">
      <div className="container flex flex-col justify-center mx-auto max-w-7xl px-8 w-[100%]">
        <div className="flex justify-between">
          <div className="w-full sm:w-auto mb-4 sm:mb-0">
            <h3 className="text-lg text-white  font-semibold mb-2">Quick Links</h3>
            <ul className="text-sm">
              <li className="mb-1">
                <Link className={linkClass} onClick={handleLinkClick} to={'Home'}>
                  Home
                </Link>
              </li>

              <li className="mb-1">
                <Link className={linkClass} onClick={handleLinkClick} to={'prices'}>
                  Prices
                </Link>
              </li>
              <li className="mb-1">
                <Link className={linkClass} onClick={handleLinkClick} to={'search-jobs'}>
                  Advanced Search
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full sm:w-auto mb-4 sm:mb-0">
            <h3 className="text-lg font-semibold mb-2 text-white">Resources</h3>
            <ul className="text-sm">
              <Link
                className={linkClass}
                onClick={handleLinkClick}
                to={'https://www.termsfeed.com/live/b59718c0-6e9a-41dc-80fd-d232df8a4f12'}
              >
                Privacy and Terms
              </Link>
              {/* <li className="mb-1">
                <a href="#">FAQ</a>
              </li>
              <li className="mb-1">
                <a href="#">Support</a>
              </li> */}
            </ul>
          </div>
          {/* <div className="w-full sm:w-auto">
            <h3 className="text-lg font-semibold mb-2">Connect</h3>
            <ul className="text-sm">
              <li className="mb-1">
                <a href="#">Facebook</a>
              </li>
              <li className="mb-1">
                <a href="#">Twitter</a>
              </li>
              <li className="mb-1">
                <a href="#">LinkedIn</a>
              </li>
            </ul>
          </div> */}
        </div>
        <hr className="my-4 border-gray-300" />
        <div className="text-center text-sm">
          <p>&copy; 2024 Unjobless. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
