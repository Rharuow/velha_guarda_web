import React, { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { getSession } from "next-auth/react";
import Modal from "react-modal";
import { useForm, Controller } from "react-hook-form";
import Swal from "sweetalert2";
import Select from "react-select";

import {
  createEvent,
  createMeet,
  deleteEvent,
  getEvent,
  getEvents,
} from "../../services/api";
import { translate } from "../../translate";
import { useRouter } from "next/router";
import {
  CreateFormMeetDatabase,
  CreateMeetDatabase,
} from "../../types/database/Meet";
import { CharDatabase } from "../../types/database/Char";
import { EventDatabase } from "../../types/database/Event";
import { useCurrentUserContext } from "../Page/Application";

export type PropsNewMeet = {
  modalIsOpen: boolean;
  closeModal: () => void;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  char: CharDatabase;
};

const NewMeet: React.FC<PropsNewMeet> = ({
  modalIsOpen,
  closeModal,
  loading,
  setLoading,
  char,
}) => {
  const { register, handleSubmit, control, setValue } =
    useForm<CreateFormMeetDatabase>();

  const [options, setOptions] =
    useState<Array<{ value: string; label: string }>>();
  const currentUser = useCurrentUserContext();

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

  const onSubmit = async ({
    start_at,
    location,
    event_id,
  }: CreateFormMeetDatabase) => {
    setLoading(true);

    const dataFormatted: CreateMeetDatabase = {
      char_id: char.id ? char.id : "",
      event_id,
      start_at,
      location,
    };

    await createMeet(dataFormatted);

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
    getEvents().then((res) => {
      console.log("res = ", res.data.record);
      const tempOpts: Array<{ value: string; label: string }> = [];
      res.data.record.forEach((ev: EventDatabase) => {
        tempOpts.push({ value: `${ev.id}`, label: ev.name });
      });
      setOptions(tempOpts);
    });
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
              <Form.Group className="my-3">
                <Form.Label className="text-dark fw-bold">Evento</Form.Label>
                <Controller
                  name="event_id"
                  render={() => (
                    <Select
                      options={options}
                      placeholder="Escolha uma opção"
                      styles={{
                        menu: () => ({
                          color: "black",
                        }),
                      }}
                      onChange={(e) => {
                        e && setValue("event_id", e?.value);
                      }}
                    />
                  )}
                  control={control}
                />
              </Form.Group>
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
