import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import ReactLoading from "react-loading";
import { confirmationUser } from "../services/api";

const Confirmation: React.FC = () => {
  const router = useRouter();

  const { email, token } = router.query as { email?: string; token?: string };

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const handleConfirmation = async (token: string, email: string) => {
      const res = await confirmationUser(token, email);
      setLoading(false);
    };
    if (email && token) handleConfirmation(token, email);
    setLoading(false);
  }, [email, token]);

  return (
    <div className="min-h-100vh d-flex justify-content-center align-items-center">
      {loading ? (
        <ReactLoading type="spin" width={105} />
      ) : email && !token ? (
        <Alert variant="info" className="text-center">
          Falta pouco! <br /> Entre no email <strong>({email})</strong> e valide
          sua conta
        </Alert>
      ) : (
        <Alert variant="success">
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
