import { Link } from 'react-router-dom';

const Footer = () => {
  const handleLinkClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#212d3c] h-[300px] text-gray-300 py-8 sticky top-[100vh] mt-12">
      <div className="container flex flex-col justify-center mx-auto max-w-5xl px-8 w-[100%]">
        <div className="flex justify-between">
          <div className="w-full sm:w-auto mb-4 sm:mb-0">
            <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
            <ul className="text-sm">
              <li className="mb-1">
                <Link onClick={handleLinkClick} to={'Home'}>
                  Home
                </Link>
              </li>

              <li className="mb-1">
                <Link onClick={handleLinkClick} to={'prices'}>
                  Prices
                </Link>
              </li>
              <li className="mb-1">
                <Link onClick={handleLinkClick} to={'search-jobs'}>
                  Advanced Search
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full sm:w-auto mb-4 sm:mb-0">
            <h3 className="text-lg font-semibold mb-2">Resources</h3>
            <ul className="text-sm">
              <Link onClick={handleLinkClick} to={'privacy-and-terms'}>
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
        <hr className="my-4 border-gray-700" />
        <div className="text-center text-sm">
          <p>&copy; 2024 Unjobless. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
