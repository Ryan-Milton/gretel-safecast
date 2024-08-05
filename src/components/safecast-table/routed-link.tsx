import { Link } from "@tanstack/react-router";

export default function RoutedLink(props: {
  measurementId: number;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      to="/routed-table/$measurementId"
      params={{ measurementId: `${props.measurementId}` }}
      className="flex w-full items-center justify-center cursor-pointer py-4"
    >
      {props.children}
    </Link>
  );
}
