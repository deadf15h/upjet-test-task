import { ReactNode } from "react";
import "./button.sass";

type Props = {
  children: ReactNode;
  onClick: () => void;
  color?: "blue" | "red";
};

const Button = ({ children, onClick, color = "blue" }: Props) => {
  return (
    <div className={`button ${color}`} onClick={onClick}>
      {children}
    </div>
  );
};

export default Button;
