import React, { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import Slider from "react-slick";

import CharDetailed from "../../components/Cards/CharDetailed";
import Char from "../../components/Cards/Char";
import Header from "../../components/domain/Header";
import { useCurrentUserContext } from "../../components/Page/Application";
import { CharDatabase } from "../../types/database/Char";
import Event from "../../components/Cards/Event";
import New from "../../components/Cards/New";
import { EventDatabase } from "../../types/database/Event";
import { getEvents } from "../../services/api";
import { getSession } from "next-auth/react";
import NewEvent from "../../components/Modal/NewEvent";

const Home: React.FC = () => {
  const currentUser = useCurrentUserContext();
  const [loading, setLoading] = useState(true);
  const [chars, setChars] = useState<Array<CharDatabase>>();
  const [char, setChar] = useState<CharDatabase>();
  const [events, setEvents] = useState<Array<EventDatabase>>();
  const [modal, setModal] = useState<{ newEvent: boolean }>({
    newEvent: false,
  });

  const settings = {
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    infinite: false,
    variableWidth: false,
  };

  useEffect(() => {
    const charEvents = async (id: string) => {
      const session = await getSession();
      let eventsTemp;
      if (session) eventsTemp = await getEvents(session.token);
      setEvents(eventsTemp?.data.record);
    };
    if (currentUser && currentUser !== null && currentUser.chars) {
      setChars(currentUser.chars.filter((c) => c.name !== char?.name));
      setChar(currentUser.chars[0]);
      charEvents(currentUser.chars[0].id);
      setLoading(false);
    }
  }, [char?.name, currentUser]);

  return (
    <div className="d-flex justify-content-center flex-wrap overflow-hidden">
      {!loading && char ? (
        <>
          <NewEvent
            modalIsOpen={modal.newEvent}
            closeModal={() => {
              setModal({ ...modal, newEvent: false });
            }}
            loading={loading}
            setLoading={setLoading}
          />
          <div className="mb-4 w-100">
            <Header />
          </div>
          <div className="mb-4">
            <CharDetailed {...char} />
          </div>
          <div className="mb-4 w-100">
            <Slider {...settings}>
              {currentUser?.is_admin && (
                <div key={char.name} className="px-2 ">
                  <New
                    title="Evento"
                    onClick={() => {
                      setModal({ ...modal, newEvent: !modal.newEvent });
                    }}
                  />
                </div>
              )}
              {events &&
                events.length > 0 &&
                events.map((ev) => (
                  <div key={ev.name} className="px-2 ">
                    <Event {...ev} />
                  </div>
                ))}
            </Slider>
          </div>
          <div className="mb-4 w-100">
            <Slider {...settings} className="h-100">
              {chars?.map((char) => (
                <div key={char.name} className="px-2 ">
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

export default Home;
