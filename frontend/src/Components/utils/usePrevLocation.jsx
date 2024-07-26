// src/hooks/usePreviousLocation.js
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const usePreviousLocation = () => {
  const location = useLocation();
  const [previousLocation, setPreviousLocation] = useState(null);

  useEffect(() => {
    setPreviousLocation(location.pathname);
  }, [location]);

  return previousLocation;
};

export default usePreviousLocation;
