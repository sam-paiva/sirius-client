import { Button, Card, CardBody, CardFooter, CardHeader } from '@nextui-org/react';
import { ReactNode } from 'react';
import goldenSvg from '../../../assets/golden.svg';
import premiumSvg from '../../../assets/premium.svg';
import silverSvg from '../../../assets/silver.svg';

interface Props {
  title: string;
  description: ReactNode;
  price: string;
  selectedId: string;
  handleSubmit: (selectedId: string) => void;
  svgIcon: 'Silver' | 'Gold' | 'Premium' | string;
}

const PriceCard: React.FC<Props> = (props) => {
  const getIcon = () => {
    switch (props.svgIcon) {
      case 'Silver':
        return silverSvg;
      case 'Gold':
        return goldenSvg;
      case 'Premium':
        return premiumSvg;
      default:
        break;
    }
  };

  return (
    <Card className="h-[400px] w-80 border transition ease-in-out delay-80 hover:border-cyan-500 duration-300">
      <CardHeader className="flex flex-col items-center min-h-[100px]">
        <div className="flex items-center justify-center text-[#6787AD]">
          <img className="mr-1" src={getIcon()} width={20} />
          <h1 className="text-2xl font-semibold text-center mr-6">{props.title}</h1>
        </div>
        {props.price && <span className="text-[#6787AD]">{props.price}</span>}
      </CardHeader>
      <CardBody className="text-gray-600 flex justify-center items-center">{props.description}</CardBody>
      <CardFooter>
        <Button onClick={() => props.handleSubmit(props.selectedId)} className="bg-[#6787AD] text-white w-[100%] h-[50px] text-xl">
          Buy now
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PriceCard;
