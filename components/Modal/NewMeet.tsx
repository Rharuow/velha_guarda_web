import React, { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { getSession } from "next-auth/react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

import { createEvent, createMeet, getEvent } from "../../services/api";
import { translate } from "../../translate";
import { useRouter } from "next/router";
import {
  CreateFornmMeetDatabase,
  CreateMeetDatabase,
} from "../../types/database/Meet";
import { CharDatabase } from "../../types/database/Char";
import { EventDatabase } from "../../types/database/Event";

export type PropsNewMeet = {
  modalIsOpen: boolean;
  afterOpenModal?: () => void;
  closeModal: () => void;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  eventId: string;
  char: CharDatabase;
};

const NewMeet: React.FC<PropsNewMeet> = ({
  modalIsOpen,
  afterOpenModal,
  closeModal,
  loading,
  setLoading,
  eventId,
  char,
}) => {
  const { register, handleSubmit } = useForm<CreateMeetDatabase>();

  const [event, setEvent] = useState<EventDatabase>();

  const router = useRouter();

  const now = `${new Date().getFullYear()}-${
    new Date().getMonth() + 1 < 10
      ? `0${new Date().getMonth() + 1}`
      : new Date().getMonth() + 1
  }-${
    new Date().getDate() < 10
      ? `0${new Date().getDate()}`
      : new Date().getDate()
  }T${new Date().getHours()}:${new Date().getMinutes()}`;

  console.log(now);

  const onSubmit = async ({ start_at, location }: CreateFornmMeetDatabase) => {
    setLoading(true);

    const dataFormatted: CreateMeetDatabase = {
      char_id: char.id ? char.id : "",
      event_id: eventId,
      start_at,
      location,
    };

    const session = await getSession();

    session && (await createMeet(session.token, dataFormatted));

    Swal.fire({
      title: translate()["Greate!"],
      text: translate()["Meet was registred"],
      icon: "success",
      confirmButtonText: "Confimar",
    }).then(() => {
      router.reload();
    });
    setLoading(false);
    closeModal();
  };

  useEffect(() => {
    const recoveryEvent = async () => {
      const session = await getSession();
      let tempEvent;
      if (session)
        tempEvent = (await getEvent(session?.token, eventId)).data
          .record as EventDatabase;
      setEvent(tempEvent);
    };
    recoveryEvent();
  }, []);

  return (
    <Modal isOpen={modalIsOpen}>
      <div className="d-flex flex-wrap">
        <div className="d-flex flex-row-reverse w-100 mb-2">
          <Button
            variant="danger"
            size="sm"
            className="rounded-circle"
            onClick={() => closeModal()}
          >
            X
          </Button>
        </div>
        <Card>
          <Card.Header>
            <p className="fw-bold text-center">Novo Encontro</p>
          </Card.Header>
          <Card.Body>
            <div className="d-flex justify-content-between bg-secondary rounded px-2">
              <span className="text-white fw-bold">Evento:</span>
              <strong>{event?.name}</strong>
            </div>
            <div className="d-flex justify-content-between bg-white rounded px-2">
              <span className="fw-bold">Cooldown:</span>
              <strong className="text-dark">
                {event && event.cooldown >= 24
                  ? `${event.cooldown / 24} dias`
                  : event && `${event.cooldown} h`}
              </strong>
            </div>
            <div className="d-flex justify-content-between bg-secondary rounded px-2">
              <span className="text-white fw-bold">Char:</span>
              <strong>{char.name}</strong>
            </div>
            <div className="d-flex justify-content-between bg-white rounded px-2">
              <span className="fw-bold">Level:</span>
              <strong className="text-dark">{char.lvl}</strong>
            </div>
            <div className="d-flex justify-content-between bg-white rounded px-2">
              <span className="fw-bold">Vocação:</span>
              <strong className="text-dark text-uppercase">{char.voc}</strong>
            </div>

            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label className="text-dark fw-bold">Dia</Form.Label>
                <Form.Control
                  required
                  type="datetime-local"
                  min={now}
                  {...register("start_at")}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="text-dark fw-bold">
                  Ponto de encontro
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ex: DP de Edron"
                  {...register("location")}
                />
              </Form.Group>

              <Button type="submit">Salvar</Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </Modal>
  );
};

export default NewMeet;
