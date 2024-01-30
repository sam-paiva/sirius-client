import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const useRouteDetails = () => {
  const [previousLocation, setPreviousLocation] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    // Update the previous location whenever the route changes
    setPreviousLocation(location.pathname);
  }, [location]);

  return previousLocation;
};

export default useRouteDetails;
