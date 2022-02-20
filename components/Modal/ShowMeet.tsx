import copy from "copy-to-clipboard";
import _ from "lodash";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Alert, Button } from "react-bootstrap";
import Modal from "react-modal";
import Swal from "sweetalert2";
import { deleteCharMeet, deleteMeet, insertCharMeet } from "../../services/api";
import { translate } from "../../translate";
import { CharDatabase } from "../../types/database/Char";
import { MeetDatabase } from "../../types/database/Meet";
import { meetInvitation } from "../../util/invitationMessage";
import Char from "../Cards/Char";
import Meet from "../Cards/Meet";
import { useCurrentUserContext } from "../Page/Application";

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

  const [userAlreadyAtMeet, setUserAlreadyAtMeet] = useState<boolean>();

  const currentUser = useCurrentUserContext();

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

  useEffect(() => {
    if (meet?.chars) {
      setUserAlreadyAtMeet(
        meet.chars.some(
          (meetChar) =>
            meetChar.user_id === currentUser?.id && char.id !== meetChar.id
        )
      );
    }
  }, [char.id, currentUser?.chars, currentUser?.id, meet?.chars]);

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
            available={meet.available}
            id={meet.id}
            start_at={`${meet.start_at}`}
            location={meet.location}
          />
          <hr />
          <Button
            className="my-2"
            onClick={() => copy(meetInvitation(meet.event, meet))}
          >
            Copiar um convite
          </Button>
          <hr />
          {!meet?.chars.some((c) => char.name === c.name) &&
          !userAlreadyAtMeet &&
          meet.available ? (
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
          ) : char.id !== meet.char_id &&
            !userAlreadyAtMeet &&
            meet.available ? (
            <Button
              className="mt-4"
              size="sm"
              variant="danger"
              onClick={() => handleDeleteCharToMeet()}
            >
              Abandonar encontro
            </Button>
          ) : char.id === meet.char_id && meet.available ? (
            <Button
              className="mt-4"
              size="sm"
              variant="danger"
              onClick={() => handleDeleteToMeet()}
            >
              Remove Encontro
            </Button>
          ) : meet.event.max_chars &&
            meet.available &&
            meet.chars.length < meet.event.max_chars ? (
            <Alert variant="info" className="mt-3">
              Você ja possui um Char nesse encontro
            </Alert>
          ) : meet.event.max_chars &&
            meet.event.max_chars === meet.chars.length ? (
            <Alert variant="info" className="mt-3">
              Esse encontro já encheu
            </Alert>
          ) : (
            <Alert variant="info" className="mt-3">
              Esse encontro já passou
            </Alert>
          )}
        </div>
      )}
    </Modal>
  );
};

export default ShowMeet;
