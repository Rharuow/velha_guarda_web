import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Alert } from "react-bootstrap";

const Confirmation: React.FC = () => {
  const router = useRouter();

  const { email } = router.query as { email?: string };

  return (
    <div className="min-h-100vh d-flex justify-content-center align-items-center">
      {email ? (
        <Alert variant="info" className="text-center">
          Falta pouco! <br /> Entre no email <strong>({email})</strong> e valide
          sua conta
        </Alert>
      ) : (
        <Alert variant="Success">
          <Alert.Heading>Parabéns, sua conta foi confirmada</Alert.Heading>
          <hr />
          <p>
            Agora você poderá realizar{" "}
            <Link href="/session/login">
              <a>Login</a>
            </Link>
          </p>
        </Alert>
      )}
    </div>
  );
};

export default Confirmation;
