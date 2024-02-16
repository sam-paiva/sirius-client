interface Props {
  content: string;
  color?: string;
}

const Badge: React.FC<Props> = ({ content, color }) => {
  return <div className={`${color ?? 'bg-sky-600'} text-center p-2 w-fit rounded-full text-tiny text-white`}>{content}</div>;
};

export default Badge;
