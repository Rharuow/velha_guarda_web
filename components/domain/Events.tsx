import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
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
      <Card.Header>
        <p className="text-center fw-bold">Eventos</p>
      </Card.Header>
      <Card.Body>
        {!loading && events ? (
          <Slider {...settings}>
            {currentUser?.is_admin && (
              <div key={char.name} className="px-2 ">
                <New
                  title="Evento"
                  onClick={() => {
                    setModal({
                      ...modal,
                      newEvent: { isOpen: !modal.newEvent.isOpen },
                    });
                  }}
                />
              </div>
            )}
            {events &&
              events.length > 0 &&
              events.map((ev) => (
                <div
                  key={ev.name}
                  className="px-2 "
                  onClick={() => {
                    setModal({
                      ...modal,
                      newMeet: { isOpen: true, event: ev.id ? ev.id : "" },
                    });
                  }}
                >
                  <Event {...ev} />
                </div>
              ))}
          </Slider>
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
