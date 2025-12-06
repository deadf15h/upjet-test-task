import { ReactNode } from "react";
import "./button.sass";

type Props = {
  children: ReactNode;
  onClick: () => void;
  color?: "blue" | "red";
  isActive?: boolean;
};

const Button = ({
  children,
  onClick,
  color = "blue",
  isActive = true,
}: Props) => {
  return (
    <div
      className={`button ${color} ${!isActive ? "blocked" : ""}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Button;
