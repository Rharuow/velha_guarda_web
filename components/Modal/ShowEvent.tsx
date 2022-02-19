import React, { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import ReactLoading from "react-loading";

import { EventDatabase } from "../../types/database/Event";
import { createEvent, editEvent, getEvent } from "../../services/api";
import { translate } from "../../translate";
import { useRouter } from "next/router";

export type PropsShowEvent = {
  modalIsOpen: boolean;
  closeModal: () => void;
  event: EventDatabase | null;
};

const ShowEvent: React.FC<PropsShowEvent> = ({
  modalIsOpen,
  closeModal,
  event,
}) => {
  const { register, handleSubmit, setValue } = useForm<EventDatabase>();

  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const onSubmit = async ({
    cooldown,
    lvl_max,
    name,
    lvl_min,
    max_chars,
    min_chars,
  }: EventDatabase) => {
    setLoading(true);
    const dataFormatted: EventDatabase = {
      cooldown,
      name,
      lvl_max: lvl_max ? lvl_max : 10000,
      lvl_min: lvl_min ? lvl_min : 1,
      max_chars: max_chars ? max_chars : 10000,
      min_chars: min_chars ? min_chars : 1,
    };

    const res = await editEvent({ ...dataFormatted, id: event?.id });

    Swal.fire({
      title: res.status !== 300 ? translate()["Greate!"] : translate()["ops!"],
      text:
        res.status !== 300
          ? translate()["Event was changed"]
          : translate()["error"],
      icon: res.status !== 300 ? "success" : "info",
      confirmButtonText: "Confimar",
    }).then(() => {
      router.reload();
    });
    setLoading(false);
    closeModal();
  };

  useEffect(() => {
    if (event !== null) {
      setValue("cooldown", event.cooldown);
      setValue("lvl_max", event.lvl_max);
      setValue("lvl_min", event.lvl_min);
      setValue("max_chars", event.max_chars);
      setValue("min_chars", event.min_chars);
      setValue("name", event.name);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event]);

  return (
    <Modal isOpen={modalIsOpen}>
      {loading ? (
        <div className="h-100vh d-flex justify-content-center align-items-center">
          <ReactLoading type="spinningBubbles" color="dark" />
        </div>
      ) : (
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
              <p className="fw-bold text-center">Editar Evento</p>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label className="text-dark fw-bold">
                    Nome do evento
                  </Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Ex: Oberon"
                    {...register("name")}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="text-dark fw-bold">
                    Cooldown em horas
                  </Form.Label>
                  <Form.Control
                    required
                    type="number"
                    min="1"
                    placeholder="Ex: 1"
                    {...register("cooldown")}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="text-dark fw-bold">
                    Máximo de Chars
                  </Form.Label>
                  <Form.Control
                    type="number"
                    min="1"
                    max="1000"
                    placeholder="Ex: 5"
                    {...register("max_chars")}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="text-dark fw-bold">
                    Mínimo de Chars
                  </Form.Label>
                  <Form.Control
                    type="number"
                    min="1"
                    placeholder="Ex: 1"
                    {...register("min_chars")}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="text-dark fw-bold">
                    Level máximo
                  </Form.Label>
                  <Form.Control
                    type="number"
                    min="1"
                    max="10000"
                    placeholder="Ex: 1000"
                    {...register("lvl_max")}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="text-dark fw-bold">
                    Level mínimo
                  </Form.Label>
                  <Form.Control
                    type="number"
                    min="1"
                    max="10000"
                    placeholder="Ex: 1"
                    {...register("lvl_min")}
                  />
                </Form.Group>

                <Button type="submit">Salvar</Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      )}
    </Modal>
  );
};

export default ShowEvent;
