import React, { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import Slider from "react-slick";
import { Card } from "react-bootstrap";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

import CharDetailed from "../../components/Cards/CharDetailed";
import Char from "../../components/Cards/Char";
import Header from "../../components/domain/Header";
import { useCurrentUserContext } from "../../components/Page/Application";
import { CharDatabase } from "../../types/database/Char";
import Event from "../../components/Cards/Event";
import New from "../../components/Cards/New";
import { EventDatabase } from "../../types/database/Event";
import { getEvents, getMeetings } from "../../services/api";
import { getChar as getCharCipApi } from "../../services/charApi";
import NewEvent from "../../components/Modal/NewEvent";
import NewMeet from "../../components/Modal/NewMeet";
import { MeetDatabase } from "../../types/database/Meet";
import ShowMeet from "../../components/Modal/ShowMeet";
import { serializeChar } from "../../util/serializerChar";
import { handleUpdateChar } from "../../util/updateChar";
import { translate } from "../../translate";
import qs from "qs";
import Meetings from "../../components/domain/Meetings";

export type LoadingType = { app: boolean; meetings: boolean };

export type ModalType = {
  newEvent: { isOpen: boolean };
  showMeet: { isOpen: boolean; meet: MeetDatabase | null };
  newMeet: { isOpen: boolean; event: string };
};

const Dashboard: React.FC = () => {
  const currentUser = useCurrentUserContext();
  const router = useRouter();
  const [loading, setLoading] = useState<LoadingType>({
    app: true,
    meetings: false,
  });
  const [chars, setChars] = useState<Array<CharDatabase>>();
  const [char, setChar] = useState<CharDatabase>();

  const [events, setEvents] = useState<Array<EventDatabase>>();

  const [modal, setModal] = useState<ModalType>({
    newEvent: { isOpen: false },
    newMeet: { isOpen: false, event: "" },
    showMeet: { isOpen: false, meet: null },
  });

  const updateCharInfo = async (tempChar: CharDatabase) => {
    const charCipApi = await getCharCipApi(tempChar.name);
    const charSerialized = serializeChar(charCipApi);
    try {
      const wasUpdated = await handleUpdateChar(tempChar, charSerialized);
      const tempChars = currentUser?.chars?.filter(
        (char) => char.id !== tempChar?.id
      );
      setChar(wasUpdated ? charSerialized : tempChar);
      setChars(tempChars);
      setLoading({ ...loading, app: false });
    } catch (error) {
      Swal.fire({
        title: translate()["error"],
        icon: "info",
        confirmButtonText: "Ok",
      }).then(() => router.reload());
    }
  };

  const handleCharProfile = async (id: string) => {
    setLoading({ ...loading, app: true });
    const tempChar = currentUser?.chars?.find((char) => char.id === id);
    if (tempChar) {
      await updateCharInfo(tempChar);
    }
  };

  const settings = {
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    infinite: false,
    variableWidth: false,
  };

  useEffect(() => {
    const charEvents = async () => {
      const eventsTemp = await getEvents();
      setEvents(eventsTemp?.data.record);
    };

    const setUpdatedChar = async (char: CharDatabase) => {
      try {
        await updateCharInfo(char);
      } catch (error) {
        Swal.fire({
          title: translate()["ops!"],
          text: translate()[
            "There is someting something worng with CIP API. Please try again"
          ],
          icon: "info",
          confirmButtonText: "Ok",
        }).then(async () => {
          router.reload();
        });
      }
    };

    if (currentUser && currentUser !== null && currentUser.chars) {
      setUpdatedChar(currentUser.chars[0]);
      setChars(
        currentUser.chars.filter((c, index, self) => c.name !== self[0].name)
      );
      charEvents();
      setLoading({ app: false, meetings: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  return (
    <div className="d-flex justify-content-center flex-wrap overflow-hidden">
      {!loading.app && char ? (
        <>
          <NewEvent
            modalIsOpen={modal.newEvent.isOpen}
            closeModal={() =>
              setModal({ ...modal, newEvent: { isOpen: false } })
            }
            loading={loading}
            setLoading={setLoading}
          />
          <NewMeet
            modalIsOpen={modal.newMeet.isOpen}
            closeModal={() =>
              setModal({ ...modal, newMeet: { isOpen: false, event: "" } })
            }
            loading={loading}
            setLoading={setLoading}
            eventId={modal.newMeet.event}
            char={char}
          />
          <ShowMeet
            isOpen={modal.showMeet.isOpen}
            meet={modal.showMeet.meet}
            char={char}
            closeModal={() =>
              setModal({
                ...modal,
                showMeet: { ...modal.showMeet, isOpen: false },
              })
            }
          />
          <div className="mb-4 w-100">
            <Header />
          </div>
          <div className="mb-4">
            <CharDetailed {...char} />
          </div>
          {/* Eventos */}
          <Card className="mb-4 w-100">
            <Card.Header>
              <p className="text-center fw-bold">Eventos</p>
            </Card.Header>
            <Card.Body>
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
            </Card.Body>
          </Card>

          {/* Encontros */}
          <Meetings setModal={setModal} modal={modal} />

          <div className="mb-4 w-100">
            <Slider {...settings} className="h-100">
              {chars?.map((char) => (
                <div
                  key={char.name}
                  className="px-2"
                  onClick={() => char && char.id && handleCharProfile(char.id)}
                >
                  <Char {...char} />
                </div>
              ))}
            </Slider>
          </div>
        </>
      ) : (
        <div className="min-h-100vh d-flex justify-content-center align-items-center">
          <ReactLoading type="spinningBubbles" />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
