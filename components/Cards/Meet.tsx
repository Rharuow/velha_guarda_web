import React, { useEffect, useState } from "react";
import { Accordion, Card, ListGroup } from "react-bootstrap";
import { getMeetChars } from "../../services/api";
import { CharDatabase } from "../../types/database/Char";
import { EventDatabase } from "../../types/database/Event";

export type PropsMeet = {
  id: string;
  start_at: string;
  location?: string;
  available: boolean;
  event: EventDatabase;
  className?: string;
  showParticipants?: boolean;
};

const Meet: React.FC<PropsMeet> = ({
  id,
  start_at,
  location,
  event,
  available,
  showParticipants = true,
  className,
}) => {
  const [partners, setPartners] = useState<Array<CharDatabase>>();

  const date: string =
    start_at.split("T")[0].split("-")[2] +
    "/" +
    start_at.split("T")[0].split("-")[1] +
    "/" +
    start_at.split("T")[0].split("-")[0];

  const hour: string = start_at.split("T")[1].split(".")[0];

  useEffect(() => {
    const recoverPartners = async () => {
      const tempParnter = (await getMeetChars(id)).data.record.chars;
      setPartners(tempParnter);
    };
    recoverPartners();
  }, [id]);

  return (
    <Card className={`${className ? className : ""}`}>
      <Card.Header className={`${available ? "bg-success" : "bg-danger"}`}>
        <p className="text-center">{event.name}</p>
      </Card.Header>
      <Card.Body className="p-1">
        <div className="bg-secondary px-1">
          <p className="fw-bold">Data: {date}</p>
        </div>
        <div className="bg-lightgray px-1">
          <p className="fw-bold">Hora: {hour}</p>
        </div>
        {location && (
          <div className="bg-secondary px-1">
            <p className="fw-bold">Local: {location}</p>
          </div>
        )}
        <div className="bg-lightgray px-1">
          <p className="fw-bold">Jogadores: {partners?.length}</p>
        </div>
        <hr />
        {showParticipants && (
          <Accordion defaultActiveKey={id}>
            <Accordion.Item eventKey={id}>
              <Accordion.Header>Participantes</Accordion.Header>
              <Accordion.Body>
                <ListGroup>
                  {partners &&
                    partners.map((partner, index) => (
                      <div key={partner.name}>
                        <ListGroup.Item
                          variant={`${index % 2 === 0 ? "dark" : "secondary"}`}
                        >
                          <span className="text-sm fs-13px">
                            {partner.name}{" "}
                            <strong className="text-uppercase">
                              ({partner.voc})
                            </strong>
                          </span>
                        </ListGroup.Item>
                      </div>
                    ))}
                </ListGroup>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        )}
      </Card.Body>
    </Card>
  );
};

export default Meet;
