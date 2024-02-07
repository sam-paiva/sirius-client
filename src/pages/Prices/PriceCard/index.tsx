import { Button, Card, CardBody, CardFooter, CardHeader } from '@nextui-org/react';
import { ReactNode } from 'react';

interface Props {
  title: string;
  description: ReactNode;
  price: string;
  selectedId: string;
  handleSubmit: (selectedId: string) => void;
}

const PriceCard: React.FC<Props> = (props) => {
  return (
    <Card className="h-[300px] w-[500px] border transition ease-in-out delay-80 hover:border-sky-500 duration-300">
      <CardHeader className="flex flex-col items-center min-h-[100px]">
        <h1 className="text-2xl font-semibold">{props.title}</h1>
        {props.price && <span>{props.price}</span>}
      </CardHeader>
      <CardBody className="text-gray-600">{props.description}</CardBody>
      <CardFooter>
        <Button onClick={() => props.handleSubmit(props.selectedId)} className="bg-sky-500 text-white w-[100%] text-xl">
          Buy now
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PriceCard;
