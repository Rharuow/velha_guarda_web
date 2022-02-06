import React from "react";
import { Card } from "react-bootstrap";

export type PropsNew = {
  variant?: "success" | "primary" | "danger" | "warning";
  title?: string;
  onClick?: () => void;
};

const New: React.FC<PropsNew> = ({ variant = "success", title, onClick }) => {
  return (
    <Card className="p-2" onClick={() => (onClick ? onClick() : {})}>
      <Card.Body
        className={`d-flex justify-content-center border-${variant} border-dashed`}
      >
        <strong
          className={`text-${variant} fs-5 text-center border border-2 border-${variant} p-3 rounded-circle`}
        >
          + <br /> {title}
        </strong>
      </Card.Body>
    </Card>
  );
};

export default New;
