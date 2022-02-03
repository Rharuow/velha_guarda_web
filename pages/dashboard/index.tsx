import React from "react";
import { Button } from "react-bootstrap";
import Header from "../../components/domain/Header";
import { useCurrentUserContext } from "../../components/Page/Application";

const Home: React.FC = () => {
  const currentUser = useCurrentUserContext();

  console.log("currentUser = ", currentUser);

  return (
    <div className="d-flex justify-content-center">
      <Header />
    </div>
  );
};

export default Home;
