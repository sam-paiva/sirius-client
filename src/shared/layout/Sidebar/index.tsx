import React from 'react';

const Sidebar: React.FC = () => {
  return (
    <div className="flex flex-col justify-center mx-auto my-0 max-w-5xl px-8 w-[100%] mt-14">
      <nav
        aria-label="Sidebar"
        className="flex-shrink-0 bg-gray-800 overflow-y-auto"
      >
        <div className="relative w-20 flex space-y-16 flex-col p-3">
          <a href="#" className="text-gray-400 hover:text-red-700">
            <div className="flex-shrink-0 inline-flex items-center justify-center w-14">
              <i className="fa fa-house"></i>
            </div>
            <div className="text-center text-xs font-normal ">Home</div>
          </a>

          <a href="#" className="text-gray-400 hover:text-red-700">
            <div className="flex-shrink-0 inline-flex items-center justify-center w-14">
              <i className="fa fa-cog"></i>
            </div>
            <div className="text-center text-xs font-normal ">Settings</div>
          </a>

          <a href="#" className="text-gray-400 hover:text-red-700">
            <div className="flex-shrink-0 inline-flex items-center justify-center w-14">
              <i className="fa fa-envelope"></i>
            </div>
            <div className="text-center text-xs font-normal ">Messages</div>
          </a>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
