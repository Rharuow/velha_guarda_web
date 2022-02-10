import { useRouter } from "next/router";
import React from "react";
import { Button } from "react-bootstrap";
import Modal from "react-modal";
import Swal from "sweetalert2";
import { deleteCharMeet, deleteMeet, insertCharMeet } from "../../services/api";
import { translate } from "../../translate";
import { CharDatabase } from "../../types/database/Char";
import { MeetDatabase } from "../../types/database/Meet";
import Char from "../Cards/Char";
import Meet from "../Cards/Meet";

export type PropsShowMeet = {
  isOpen: boolean;
  closeModal: () => void;
  meet: MeetDatabase | null;
  char: CharDatabase;
};

const ShowMeet: React.FC<PropsShowMeet> = ({
  isOpen,
  closeModal,
  meet,
  char,
}) => {
  const router = useRouter();

  console.log(char.id);
  console.log(meet?.char_id);

  const handleDeleteCharToMeet = async () => {
    if (char.id && meet) {
      const res = await deleteCharMeet(char.id, meet.id);

      res.status === 300
        ? Swal.fire({
            title: translate()["ops!"],
            text: translate().error,
            icon: "error",
            confirmButtonText: "Confimar",
          }).then(() => {
            router.reload();
          })
        : Swal.fire({
            title: translate()["Greate!"],
            text: translate()["Your char was deleted on meet"],
            icon: "success",
            confirmButtonText: "Confimar",
          }).then(() => {
            router.reload();
          });
    }
  };

  const handleAddCharToMeet = async () => {
    if (meet && char.id) {
      const res = await insertCharMeet(char.id, meet.id);

      res.status === 300
        ? Swal.fire({
            title: translate()["ops!"],
            text: translate().error,
            icon: "error",
            confirmButtonText: "Confimar",
          }).then(() => {
            router.reload();
          })
        : Swal.fire({
            title: translate()["Greate!"],
            text: translate()["Your char was add on meet"],
            icon: "success",
            confirmButtonText: "Confimar",
          }).then(() => {
            router.reload();
          });
    }
  };

  const handleDeleteToMeet = async () => {
    if (meet && char.id) {
      const res = await deleteMeet(meet.id);

      res.status === 300
        ? Swal.fire({
            title: translate()["ops!"],
            text: translate().error,
            icon: "error",
            confirmButtonText: "Confimar",
          }).then(() => {
            router.reload();
          })
        : Swal.fire({
            title: translate()["Greate!"],
            text: translate()["Meet deleted with success"],
            icon: "success",
            confirmButtonText: "Confimar",
          }).then(() => {
            router.reload();
          });
    }
  };

  return (
    <Modal isOpen={isOpen}>
      <div className="d-flex flex-row-reverse w-100 mb-2 align-self-start">
        <Button
          variant="danger"
          size="sm"
          className="rounded-circle"
          onClick={() => closeModal()}
        >
          X
        </Button>
      </div>
      {meet && (
        <div className="d-flex flex-wrap w-100 justify-content-center">
          <span className="mb-3 fw-bold">Encontro</span>
          <Meet
            className="w-100"
            event={meet.event}
            id={meet.id}
            start_at={`${meet.start_at}`}
            location={meet.location}
          />
          {!meet?.chars.some((c) => char.name === c.name) ? (
            <>
              <span className="mb-3 fw-bold">Participar com esse char?</span>
              <Char {...char} />
              <div className="w-100 d-flex justify-content-center">
                <Button
                  className="mt-4"
                  size="sm"
                  onClick={() => handleAddCharToMeet()}
                >
                  Participar
                </Button>
              </div>
            </>
          ) : char.id !== meet.char_id ? (
            <Button
              className="mt-4"
              size="sm"
              variant="danger"
              onClick={() => handleDeleteCharToMeet()}
            >
              Abandonar encontro
            </Button>
          ) : (
            char.id === meet.char_id && (
              <Button
                className="mt-4"
                size="sm"
                variant="danger"
                onClick={() => handleDeleteToMeet()}
              >
                Remove Encontro
              </Button>
            )
          )}
        </div>
      )}
    </Modal>
  );
};

export default ShowMeet;
