interface Props {
  content: string;
  color?: string;
  fontColor?: string;
}

const Badge: React.FC<Props> = ({ content, color, fontColor }) => {
  return (
    <div
      className={`${color ?? 'bg-sky-600'} max-h-9 min-w-24 justify-center flex items-center p-2 w-fit rounded-full text-tiny ${
        fontColor ?? 'text-white'
      }`}
    >
      {content}
    </div>
  );
};

export default Badge;
