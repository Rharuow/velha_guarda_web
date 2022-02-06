import React from "react";
import { Card } from "react-bootstrap";

export type PropsChar = {
  name: string;
  sex: "m" | "f";
  voc: "ms" | "ek" | "ed" | "rp";
  lvl: number;
};

const Char: React.FC<PropsChar> = ({ name, sex, voc, lvl }) => {
  return (
    <Card>
      <Card.Header className="d-flex align-items-center justify-content-between">
        <img src={`./${voc}${sex}.png`} alt="char icon" />
        <p className="text-center flex-grow-1">{name}</p>
      </Card.Header>
      <Card.Body>
        <div className="d-flex justify-content-between bg-secondary rounded px-2">
          <span className="text-white fw-bold">Level:</span>
          <strong>{lvl}</strong>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Char;
