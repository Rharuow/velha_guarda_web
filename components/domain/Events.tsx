import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import ReactLoading from "react-loading";
import Slider from "react-slick";

import Event from "../Cards/Event";
import { ModalType } from "../../pages/dashboard";
import { CharDatabase } from "../../types/database/Char";
import { EventDatabase } from "../../types/database/Event";
import New from "../Cards/New";
import { useCurrentUserContext } from "../Page/Application";
import { getEvents } from "../../services/api";
import Swal from "sweetalert2";
import { translate } from "../../translate";
import { useRouter } from "next/router";

export type EventPropType = {
  setModal: React.Dispatch<React.SetStateAction<ModalType>>;
  modal: ModalType;
  char: CharDatabase;
};

const Events: React.FC<EventPropType> = ({ modal, setModal, char }) => {
  const currentUser = useCurrentUserContext();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);

  const [events, setEvents] = useState<Array<EventDatabase>>();

  const settings = {
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    infinite: false,
    variableWidth: false,
  };

  useEffect(() => {
    getEvents()
      .then((res) => {
        setEvents(res.data.record);
        setLoading(false);
      })
      .catch(() => {
        Swal.fire({
          title: translate()["ops!"],
          text: translate()["Event wasn't load"],
          icon: "info",
          confirmButtonText: "Ok",
        }).then(async () => {
          router.reload();
        });
      });
  }, [router]);

  return (
    <Card className="mb-4 w-100">
      <Card.Header className="d-flex align-items-center">
        <strong className="text-center fs-16px flex-grow-1">Eventos</strong>
        {currentUser?.is_admin && (
          <Button
            className="fw-bold rounded-circle align-self-end"
            onClick={() => {
              setModal({
                ...modal,
                newEvent: { isOpen: !modal.newEvent.isOpen },
              });
            }}
          >
            +
          </Button>
        )}
      </Card.Header>
      <Card.Body>
        {!loading && events ? (
          <>
            {events && events.length > 0 ? (
              <Slider {...settings}>
                {events.map((ev) => (
                  <div
                    key={ev.name}
                    className="px-2 "
                    onClick={() => {
                      console.log("EDIT EVENT");
                    }}
                  >
                    <Event {...ev} />
                  </div>
                ))}
              </Slider>
            ) : (
              <div className="d-flex justify-content-center flex-wrap">
                <i className="far fa-frown text-danger fs-30px" />
                <div className="w-100 d-flex justify-content-center">
                  <strong className="text-danger">
                    Sem eventos no momento
                  </strong>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="h-100vh d-flex justify-content-center align-items-center">
            <ReactLoading type="spinningBubbles" color="dark" />
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default Events;
