import { useEffect, useState } from 'react';
import goldenSvg from '../../assets/golden.svg';
import premiumSvg from '../../assets/premium.svg';
import silverSvg from '../../assets/silver.svg';

export const useBundleIcon = (bundleName: string) => {
  const [svgIcon, setSvgIcon] = useState<string | null>(null);

  useEffect(() => {
    switch (bundleName) {
      case 'Silver':
        setSvgIcon(silverSvg);
        break;
      case 'Gold':
        setSvgIcon(goldenSvg);
        break;
      case 'Premium':
        setSvgIcon(premiumSvg);
        break;
      default:
        break;
    }
  }, [bundleName]);

  return { svgIcon };
};
