/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Card } from "react-bootstrap";

export type PropsCharDetailed = {
  name: string;
  sex: "m" | "f";
  voc: "ms" | "ek" | "ed" | "rp";
  lvl: number;
  online: boolean;
  premium: boolean;
  residence: string;
  max_shared_lvl: number;
  min_shared_lvl: number;
};

const CharDetailed: React.FC<PropsCharDetailed> = ({
  name,
  sex,
  voc,
  lvl,
  max_shared_lvl,
  min_shared_lvl,
  online,
  premium,
  residence,
}) => {
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
        <div className="d-flex justify-content-between flex-wrap rounded px-2">
          <p className="d-block w-100 fw-bold">Range de Shared EXP</p>
          <div className="d-flex bg-lightgray justify-content-between w-100 px-2">
            <p className="text-success fw-bolder">Máximo :</p>
            <p className="text-success fw-bolder">{max_shared_lvl}</p>|
            <p className="text-danger fw-bolder">Mínimo :</p>
            <p className="text-danger fw-bolder">{min_shared_lvl}</p>
          </div>
        </div>
        <div className="d-flex justify-content-between bg-secondary rounded px-2">
          <span className="text-white fw-bold">Online:</span>
          <p className={`text-${online ? "success" : "danger"} fw-bold`}>
            {online ? "Sim" : "Não"}
          </p>
        </div>
        <div className="d-flex justify-content-between flex-wrap rounded px-2">
          <span className="fw-bold">Premiun:</span>
          <span className={`text-${premium ? "success" : "danger"} fw-bold`}>
            {premium ? "Sim" : "Não"}
          </span>
        </div>
        <div className="d-flex justify-content-between bg-secondary rounded px-2">
          <span className="text-white fw-bold">Residencia:</span>
          <p className="text-white fw-bold">{residence}</p>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CharDetailed;
