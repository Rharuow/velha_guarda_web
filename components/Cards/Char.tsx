import React from "react";
import { Card } from "react-bootstrap";

export type PropsChar = {
  name: string;
  sex: "m" | "f";
  voc: "ms" | "ek" | "ed" | "rp";
};

const Char: React.FC<PropsChar> = ({ name, sex, voc }) => {
  return (
    <Card>
      <Card.Header className="d-flex align-items-center justify-content-between">
        <img src={`./${voc}${sex}.png`} alt="char icon" />
        <p className="text-center flex-grow-1">{name}</p>
      </Card.Header>
    </Card>
  );
};

export default Char;
