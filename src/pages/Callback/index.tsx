import React, { useEffect } from 'react';
const Callback: React.FC = () => {
  useEffect(() => {
    window.opener.postMessage({}, window.location.origin);

    // Close the child window (optional)
    window.close();
  }, []);

  return <div />;
};

export default Callback;
