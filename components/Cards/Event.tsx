import React from "react";
import { Card } from "react-bootstrap";

export type PropsEvent = {
  name: string;
  cooldown: number;
  lvl_min?: number;
  lvl_max?: number;
  min_chars?: number;
  max_chars?: number;
};

const Event: React.FC<PropsEvent> = ({
  cooldown,
  lvl_max,
  lvl_min,
  max_chars,
  min_chars,
  name,
}) => {
  const cooldownText =
    cooldown >= 24 ? `${cooldown / 24} dias` : `${cooldown} h`;
  return (
    <Card>
      <Card.Header>
        <p className="text-center">{name}</p>
      </Card.Header>
      <Card.Body className="p-1">
        <div className="bg-secondary px-1">
          <p className="fw-bold">cooldown: {cooldownText}</p>
        </div>
        <div className="bg-lightgray px-1">
          <p className="fw-bold">
            level Máx: {lvl_max === 10000 ? lvl_max : "Não possui"}
          </p>
        </div>
        <div className="bg-secondary px-1">
          <p className="fw-bold">level Min: {lvl_min}</p>
        </div>
        <div className="bg-lightgray px-1">
          <p className="fw-bold">Máx de chars: {max_chars}</p>
        </div>
        <div className="bg-secondary px-1">
          <p className="fw-bold">Min de chars: {min_chars}</p>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Event;
