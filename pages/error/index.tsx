import { useRouter } from "next/router";
import React from "react";
import { Alert, Button } from "react-bootstrap";
import { translate } from "../../translate";

const Error: React.FC = () => {
  const router = useRouter();

  const query = router.query as {
    error: "Request failed with status code 401" | "error";
  };

  console.log("router = ", router);

  return (
    <div className="min-h-100vh d-flex justify-content-center align-items-center">
      <Alert variant="warning">
        <Alert.Heading>{translate().error}</Alert.Heading>
        <hr />
        <p className="text-center">{translate()[query.error]}</p>
        <div className="d-flex justify-content-center">
          <Button onClick={() => router.back()}>Voltar</Button>
        </div>
      </Alert>
    </div>
  );
};

export default Error;
