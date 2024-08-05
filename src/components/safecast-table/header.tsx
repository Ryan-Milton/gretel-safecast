export default function Header(props: {
  name: React.ReactNode;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex gap-1 w-full items-center justify-center">
      <span className="font-semibold">{props.icon}</span>
      <span className="font-semibold">{props.name}</span>
    </div>
  );
}
