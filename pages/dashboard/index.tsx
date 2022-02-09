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
import { getChar, getChars, getEvents, getMeetings } from "../../services/api";
import NewEvent from "../../components/Modal/NewEvent";
import NewMeet from "../../components/Modal/NewMeet";
import { MeetDatabase } from "../../types/database/Meet";
import Meet from "../../components/Cards/Meet";

const Home: React.FC = () => {
  const currentUser = useCurrentUserContext();
  const [loading, setLoading] = useState(true);
  const [chars, setChars] = useState<Array<CharDatabase>>();
  const [char, setChar] = useState<CharDatabase>();
  const [events, setEvents] = useState<Array<EventDatabase>>();
  const [meetings, setMeetings] = useState<Array<MeetDatabase>>();
  const [modal, setModal] = useState<{
    newEvent: { isOpen: boolean };
    newMeet: { isOpen: boolean; event: string };
  }>({
    newEvent: { isOpen: false },
    newMeet: { isOpen: false, event: "" },
  });

  const handleCharProfile = async (id: string) => {
    try {
      const tempChar = (await getChar(id)).data.record;
      setChar(tempChar);

      const tempChars = (await getChars()).data.record.filter(
        (char: CharDatabase) => char.name !== tempChar.name
      );

      setChars(tempChars);
    } catch (error) {
      console.log(`handleCharProfile Error = ${error}`);
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

    const charMeetings = async () => {
      const tempMeeting = await getMeetings();
      console.log(tempMeeting);
      setMeetings(tempMeeting?.data.record);
    };

    if (currentUser && currentUser !== null && currentUser.chars) {
      setChar(currentUser.chars[0]);
      setChars(
        currentUser.chars.filter((c, index, self) => c.name !== self[0].name)
      );
      charEvents();
      charMeetings();
      setLoading(false);
    }
  }, [currentUser]);

  return (
    <div className="d-flex justify-content-center flex-wrap overflow-hidden">
      {!loading && char ? (
        <>
          <NewEvent
            modalIsOpen={modal.newEvent.isOpen}
            closeModal={() => {
              setModal({ ...modal, newEvent: { isOpen: false } });
            }}
            loading={loading}
            setLoading={setLoading}
          />
          <NewMeet
            modalIsOpen={modal.newMeet.isOpen}
            closeModal={() => {
              setModal({ ...modal, newMeet: { isOpen: false, event: "" } });
            }}
            loading={loading}
            setLoading={setLoading}
            eventId={modal.newMeet.event}
            char={char}
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
          </div>
          <div className="mb-4 w-100">
            <Slider {...settings}>
              {meetings &&
                meetings.length > 0 &&
                meetings.map((meet) => (
                  <div
                    key={meet.event.name}
                    className="px-2 "
                    // onClick={() => {
                    //   setModal({
                    //     ...modal,
                    //     newMeet: {
                    //       isOpen: true,
                    //       meetent: meet.id ? meet.id : "",
                    //     },
                    //   });
                    // }}
                  >
                    <Meet
                      event={meet.event}
                      id={meet.id}
                      start_at={`${meet.start_at}`}
                      location={
                        meet.location ? meet.location : "Sem local marcado"
                      }
                    />
                  </div>
                ))}
            </Slider>
          </div>

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

export default Home;
