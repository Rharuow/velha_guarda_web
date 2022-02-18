import React from "react";
import { Button, Card, Form } from "react-bootstrap";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

import { EventDatabase } from "../../types/database/Event";
import { createEvent } from "../../services/api";
import { translate } from "../../translate";
import { useRouter } from "next/router";
import { LoadingType } from "../../pages/dashboard";

export type PropsNewEvent = {
  modalIsOpen: boolean;
  closeModal: () => void;
  loading: LoadingType;
  setLoading: React.Dispatch<React.SetStateAction<LoadingType>>;
};

const NewEvent: React.FC<PropsNewEvent> = ({
  modalIsOpen,
  closeModal,
  loading,
  setLoading,
}) => {
  const { register, handleSubmit } = useForm<EventDatabase>();

  const router = useRouter();

  const onSubmit = async ({
    cooldown,
    lvl_max,
    name,
    lvl_min,
    max_chars,
    min_chars,
  }: EventDatabase) => {
    setLoading({ ...loading, app: true });
    const dataFormatted: EventDatabase = {
      cooldown,
      name,
      lvl_max: lvl_max ? lvl_max : 10000,
      lvl_min: lvl_min ? lvl_min : 1,
      max_chars: max_chars ? max_chars : 10000,
      min_chars: min_chars ? min_chars : 1,
    };

    const res = await createEvent(dataFormatted);

    Swal.fire({
      title: res.status !== 300 ? translate()["Greate!"] : translate()["ops!"],
      text:
        res.status !== 300
          ? translate()["Event was registred"]
          : translate()["error"],
      icon: res.status !== 300 ? "success" : "info",
      confirmButtonText: "Confimar",
    }).then(() => {
      router.reload();
    });
    setLoading({ ...loading, app: false });
    closeModal();
  };

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
            <p className="fw-bold text-center">Novo Evento</p>
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
    </Modal>
  );
};

export default NewEvent;
