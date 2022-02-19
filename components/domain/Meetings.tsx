import React, { useEffect, useState } from "react";
import { Button, Card, Form, ToggleButton } from "react-bootstrap";
import Slider from "react-slick";
import ReactLoading from "react-loading";
import Swal from "sweetalert2";

import { MeetDatabase } from "../../types/database/Meet";
import Meet from "../../components/Cards/Meet";
import { getMeetings } from "../../services/api";
import { DateTime } from "luxon";
import qs from "qs";
import { translate } from "../../translate";
import { useRouter } from "next/router";

export type ModalType = {
  newEvent: { isOpen: boolean };
  showMeet: { isOpen: boolean; meet: MeetDatabase | null };
  newMeet: { isOpen: boolean; event: string };
};

export type FilterMeetingType =
  | {
      filters: {
        start_at_gteq: string;
        start_at_lteq: string;
        event: { name: string };
      };
    }
  | {};

export type ErrorMessageType =
  | "There ins't meet today!"
  | "There ins't meet with title!";

const Meetings: React.FC<{
  setModal: React.Dispatch<React.SetStateAction<ModalType>>;
  modal: ModalType;
}> = ({ setModal, modal }) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [countMeetings, setTotalMeetings] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [todayChecked, setTodayChecked] = useState<boolean>(false);
  const [meetings, setMeetings] = useState<Array<MeetDatabase>>();
  const [filters, setFilters] = useState<FilterMeetingType>({});

  const filterMeetings = async (
    filter: FilterMeetingType,
    errorMessage: ErrorMessageType = "There ins't meet today!"
  ) => {
    setLoading(true);
    let [comingMeetings, getTotalMeetings] = (
      await getMeetings(0, qs.stringify({ ...filters, ...filter }))
    ).data.record as [Array<MeetDatabase>, number];
    if (comingMeetings.length <= 0) {
      Swal.fire({
        title: translate()["ops!"],
        text: translate()[errorMessage],
        icon: "info",
      });
      setTodayChecked(false);
      setFilters(filters);
    } else {
      setMeetings(comingMeetings);
      setTotalMeetings(getTotalMeetings);
      setPage(1);
      setFilters({ ...filters, ...filter });
    }

    setLoading(false);
  };

  useEffect(() => {
    getMeetings(0).then((res) => {
      setMeetings(res.data.record[0]);
      setTotalMeetings(res.data.record[1]);
      setPage(1);
    });
    setLoading(false);
  }, []);

  const settings = {
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    infinite: false,
    variableWidth: false,
  };

  return (
    <Card className="mb-4 w-100">
      <Card.Header>
        <p className="text-center fw-bold">Encontros</p>
      </Card.Header>
      <Card.Body>
        {!loading && meetings ? (
          <Slider {...settings}>
            {meetings.length > 0 &&
              meetings.map((meet) => (
                <div
                  key={meet.event.name}
                  className="px-2"
                  onClick={() => {
                    setModal({
                      ...modal,
                      showMeet: {
                        isOpen: true,
                        meet,
                      },
                    });
                  }}
                >
                  <Meet
                    event={meet.event}
                    id={meet.id}
                    available={meet.available}
                    start_at={`${meet.start_at}`}
                    location={meet.location ? meet.location : "Nenhum"}
                    showParticipants={false}
                  />
                </div>
              ))}
            {meetings.length < countMeetings && (
              <div className="d-flex justify-content-center h-180px">
                <Button
                  variant="outline-success"
                  className="w-100 fw-bold"
                  onClick={async () => {
                    const tempMeeting = (await getMeetings(page)).data
                      .record[0];
                    setMeetings([...meetings, ...tempMeeting]);
                  }}
                >
                  + Encontros
                </Button>
              </div>
            )}
          </Slider>
        ) : (
          <div className="h-100vh d-flex justify-content-center align-items-center">
            <ReactLoading type="spinningBubbles" color="dark" />
          </div>
        )}
      </Card.Body>
      <Card.Footer>
        <strong>Filtros</strong>
        <div className="d-flex flex-wrap">
          <Form className="w-100">
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                type="text"
                placeholder="Nome do Evento"
                onChange={(e) => {
                  if (
                    e.target.value.length % 2 === 0 &&
                    e.target.value.length > 0
                  )
                    filterMeetings(
                      {
                        ...filters,
                        filters: {
                          event: { name: e.target.value },
                        },
                      },
                      "There ins't meet with title!"
                    );
                  if (e.target.value.length === 0)
                    filterMeetings({
                      ...filters,
                      filters: {
                        event: { name: "" },
                      },
                    });
                }}
              />
            </Form.Group>
          </Form>
          <ToggleButton
            id="toggle-check"
            type="checkbox"
            variant={todayChecked ? "success" : "danger"}
            checked={todayChecked}
            value="1"
            onChange={() => {
              setTodayChecked(!todayChecked);
              !todayChecked
                ? filterMeetings({
                    filters: {
                      start_at_gteq: DateTime.utc(
                        DateTime.now().year,
                        DateTime.now().month,
                        DateTime.now().day,
                        DateTime.now().hour,
                        DateTime.now().minute,
                        DateTime.now().second,
                        DateTime.now().millisecond
                      ).toISO(),
                      start_at_lteq: DateTime.utc(
                        DateTime.now().endOf("day").year,
                        DateTime.now().endOf("day").month,
                        DateTime.now().endOf("day").day,
                        DateTime.now().endOf("day").hour,
                        DateTime.now().endOf("day").minute,
                        DateTime.now().endOf("day").second,
                        DateTime.now().endOf("day").millisecond
                      ).toISO(),
                    },
                  })
                : filterMeetings({});
            }}
          >
            Hoje
          </ToggleButton>
        </div>
      </Card.Footer>
    </Card>
  );
};

export default Meetings;
