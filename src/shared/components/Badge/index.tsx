interface Props {
  content: string;
}

const Badge: React.FC<Props> = (props) => {
  return <div className="bg-sky-600 text-center p-2 w-fit rounded-full text-tiny text-white">{props.content}</div>;
};

export default Badge;
