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
import { ModalType } from "../../pages/dashboard";
import _ from "lodash";

export type FilterMeetingType =
  | {
      start_at_gteq: string;
      start_at_lteq: string;
      event: { name: string };
      available: boolean | null;
    }
  | {};

export type ErrorMessageType =
  | "There ins't meet today!"
  | "There ins't meet with title!"
  | "There ins't meet not available!"
  | "There ins't meet available!";

const Meetings: React.FC<{
  setModal: React.Dispatch<React.SetStateAction<ModalType>>;
  modal: ModalType;
}> = ({ setModal, modal }) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [countMeetings, setTotalMeetings] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [todayChecked, setTodayChecked] = useState<boolean>(false);
  const [availableChecked, setAvailableChecked] = useState<boolean>(false);
  const [notAvailableChecked, setNotAvailableChecked] =
    useState<boolean>(false);
  const [meetings, setMeetings] = useState<Array<MeetDatabase>>();
  const [filters, setFilters] = useState<FilterMeetingType>({});
  const [noContentMessage, setNoContentMessage] = useState<ErrorMessageType>(
    "There ins't meet today!"
  );

  const filterMeetings = async (
    filter: FilterMeetingType,
    errorMessage: ErrorMessageType = "There ins't meet today!"
  ) => {
    setLoading(true);
    console.log("on submit = ", { filters: { ...filters, ...filter } });
    let [comingMeetings, getTotalMeetings] = (
      await getMeetings(0, qs.stringify({ filters: { ...filters, ...filter } }))
    ).data.record as [Array<MeetDatabase>, number];
    setNoContentMessage(errorMessage);
    setMeetings(comingMeetings);
    setTotalMeetings(getTotalMeetings);
    setPage(1);
    setFilters({ ...filters, ...filter });

    setLoading(false);
  };

  useEffect(() => {
    getMeetings(0)
      .then((res) => {
        setMeetings(res.data.record[0]);
        setTotalMeetings(res.data.record[1]);
        setPage(1);
      })
      .catch(() => {
        Swal.fire({
          title: translate()["ops!"],
          text: translate()["Meet wasn't load"],
          icon: "info",
          confirmButtonText: "Ok",
        }).then(async () => {
          router.reload();
        });
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
      <Card.Header className="d-flex align-items-center">
        <strong className="text-center fs-16px flex-grow-1">Encontros</strong>
        <Button
          className="fw-bold rounded-circle align-self-end"
          onClick={() => {
            setModal({
              ...modal,
              newMeet: { isOpen: true },
            });
          }}
        >
          +
        </Button>
      </Card.Header>
      <Card.Body>
        {meetings && !loading ? (
          <>
            {meetings.length > 0 ? (
              <Slider {...settings}>
                {meetings.map((meet) => (
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
                        const tempMeeting = (
                          await getMeetings(page, qs.stringify({ filters }))
                        ).data.record[0];
                        setMeetings([...meetings, ...tempMeeting]);
                      }}
                    >
                      + Encontros
                    </Button>
                  </div>
                )}
              </Slider>
            ) : (
              <div className="d-flex justify-content-center flex-wrap">
                <i className="far fa-frown text-danger fs-30px" />
                <div className="w-100  d-flex justify-content-center">
                  <strong className="text-danger">
                    {translate()[noContentMessage]}
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
      <Card.Footer>
        <strong>Filtros</strong>
        <div className="d-flex flex-wrap">
          <Form className="w-100">
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>
                <p>Nome do Evento</p>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="ex: Oberon"
                onChange={(e) => {
                  if (
                    e.target.value.length % 2 === 0 &&
                    e.target.value.length > 0
                  )
                    filterMeetings(
                      {
                        event: { name: e.target.value },
                      },
                      "There ins't meet with title!"
                    );
                  if (e.target.value.length === 0)
                    filterMeetings({
                      event: { name: "" },
                    });
                }}
              />
            </Form.Group>
          </Form>
          <div className="d-flex justify-content-around w-100">
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
                      start_at_gteq: DateTime.utc(
                        DateTime.now().year,
                        DateTime.now().month,
                        DateTime.now().day
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
                    })
                  : filterMeetings({
                      start_at_gteq: undefined,
                      start_at_lteq: undefined,
                    });
              }}
            >
              Hoje
            </ToggleButton>
            <ToggleButton
              id="toggle-available"
              type="checkbox"
              variant={availableChecked ? "success" : "danger"}
              checked={availableChecked}
              value="1"
              onChange={() => {
                setAvailableChecked(!availableChecked);
                setNotAvailableChecked(false);
                !availableChecked
                  ? filterMeetings(
                      {
                        available: true,
                      },
                      "There ins't meet available!"
                    )
                  : filterMeetings({});
              }}
            >
              Abertos
            </ToggleButton>
            <ToggleButton
              id="toggle-not-available"
              type="checkbox"
              variant={notAvailableChecked ? "success" : "danger"}
              checked={notAvailableChecked}
              value="1"
              onChange={() => {
                setNotAvailableChecked(!notAvailableChecked);
                setAvailableChecked(false);
                !notAvailableChecked
                  ? filterMeetings(
                      {
                        available: false,
                      },
                      "There ins't meet not available!"
                    )
                  : filterMeetings({});
              }}
            >
              Fechados
            </ToggleButton>
          </div>
        </div>
      </Card.Footer>
    </Card>
  );
};

export default Meetings;
