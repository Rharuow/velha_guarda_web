import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import ReactLoading from "react-loading";
import ReCAPTCHA from "react-google-recaptcha";

const Confirmation: React.FC = () => {
  const router = useRouter();

  const { email, token } = router.query as { email?: string; token?: string };

  const onSubmit = (data: { name: string }) => {
    console.log(data);
  };

  const [loading, setLoading] = useState<boolean>(true);
  const [isValid, setIsValid] = useState(
    process.env.NODE_ENV !== "development" ? false : true
  );

  const { register, handleSubmit } = useForm<{ name: string }>();

  useEffect(() => {
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
        <Card bg="secondary">
          <Card.Body className="d-flex flex-wrap">
            <Form
              onSubmit={handleSubmit(onSubmit)}
              className="w-100 d-flex flex-wrap justify-content-center"
            >
              <Form.Group className="my-3 w-100">
                <Form.Label>Nome do seu Char principal</Form.Label>
                <Form.Control
                  required
                  placeholder="ex: Lord Paulistinha"
                  {...register("name")}
                />
              </Form.Group>
              {process.env.NODE_ENV !== "development" && (
                <div className="d-flex justify-content-center">
                  <ReCAPTCHA
                    sitekey={`${process.env.NEXT_PUBLIC_RECAPTCHA_KEY}`}
                    onChange={() => setIsValid((state) => !state)}
                  />
                </div>
              )}
              <Button type="submit" disabled={!isValid}>
                Salvar
              </Button>
            </Form>
          </Card.Body>
          <Card.Footer>
            <Alert variant="info" className="text-center">
              Centifique-se que adicionou o código na descrição do char!
            </Alert>
          </Card.Footer>
        </Card>
      )}
    </div>
  );
};

export default Confirmation;
