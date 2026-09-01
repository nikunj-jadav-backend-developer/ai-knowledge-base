import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({
  children,
  className = "",
}: CardProps) {
  return (
    <div
      className={`rounded-xl border bg-white p-6 transition hover:-translate-y-1 hover:shadow-md ${className}`}
    >
      {children}
    </div>
  );
}