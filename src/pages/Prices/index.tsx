import React, { useEffect } from 'react';
import { BsCheck } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../core/hooks/storeHooks';
import { getBundlesAction } from '../../core/store/bundles/bundlesActions';
import { selectBundleAction } from '../../core/store/checkout/checkoutSlice';
import ContainerWrapper from '../../shared/components/ContainerWrapper';
import PriceSkeleton from '../../shared/components/Skeletons/PriceSkeleton';
import { formatter } from '../../shared/utils/currencyFormatter';
import PriceCard from './PriceCard';

const Prices: React.FC = () => {
  const dispatch = useAppDispatch();
  const bundles = useAppSelector((c) => c.bundles.bundles);
  const isLoading = useAppSelector((c) => c.bundles.isLoading);
  const navigate = useNavigate();

  const goToCheckout = (selectedId: string) => {
    dispatch(selectBundleAction(bundles.find((c) => c.id === selectedId)));
    navigate(`/checkout/${selectedId}`, { state: { bundle: bundles.find((c) => c.id === selectedId) } });
  };

  useEffect(() => {
    dispatch(getBundlesAction());
  }, []);

  const displayBundles = () => {
    return bundles.map((c) => (
      <PriceCard
        key={c.id}
        handleSubmit={goToCheckout}
        selectedId={c.id}
        title={c.name}
        svgIcon={c.name}
        description={getBundleDescription(c.name)}
        price={formatter.format(c.price)}
      />
    ));
  };

  const getBundleDescription = (name: string) => {
    switch (name) {
      case 'Silver':
        return silverPlanDescription();
      case 'Gold':
        return goldPlanDescription();
      case 'Premium':
        return premiumPlanDescription();
      default:
        break;
    }
  };

  const silverPlanDescription = () => {
    return (
      <>
        <ul className="flex flex-col gap-3">
          <div className="flex items-baseline">
            <BsCheck className="bg-green" />
            <li className="text-[#415A77]">Post up to 1 job positions</li>
          </div>
          <div className="flex items-baseline">
            <BsCheck className="bg-green" />
            <li className="text-[#415A77]">Logo Included</li>
          </div>
        </ul>
      </>
    );
  };

  const goldPlanDescription = () => {
    return (
      <>
        <ul className="flex flex-col gap-3">
          <div className="flex items-baseline">
            <BsCheck className="bg-green" />
            <li className="text-[#415A77]">Post up to 3 job positions</li>
          </div>
          <div className="flex items-baseline">
            <BsCheck className="bg-green" />
            <li className="text-[#415A77]">Logo Included</li>
          </div>
        </ul>
      </>
    );
  };

  const premiumPlanDescription = () => {
    return (
      <>
        <ul className="flex flex-col gap-3">
          <div className="flex items-baseline">
            <BsCheck className="bg-green" />
            <li className="text-[#415A77]">Post up to 5 job positions</li>
          </div>
          <div className="flex items-baseline">
            <BsCheck className="bg-green" />
            <li className="text-[#415A77]">Logo Included</li>
          </div>

          <div className="flex items-baseline">
            <BsCheck className="bg-green" />
            <li className="text-center text-[#415A77]">Sponsored tag</li>
          </div>
        </ul>
      </>
    );
  };

  return (
    <ContainerWrapper>
      <div className="flex flex-col items-center w-full justify-center">
        <h1 className="font-medium text-[#415A77] text-center">Pricing Tickets</h1>
        <span className="mt-6 text-lg text-gray-500 text-center">
          After choosing one of our tickets, you can start to post job positions.
        </span>
        <span className="text-lg text-gray-500 text-center">Please find which most fits your demand.</span>
      </div>

      <div className="flex items-center sm:flex-col justify-around gap-6 mt-12">
        {!isLoading ? (
          displayBundles()
        ) : (
          <>
            <PriceSkeleton />
            <PriceSkeleton />
            <PriceSkeleton />
          </>
        )}
      </div>
    </ContainerWrapper>
  );
};

export default Prices;
