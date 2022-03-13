import React, { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import ReactLoading from "react-loading";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import ReCAPTCHA from "react-google-recaptcha";
import _ from "lodash";
import Link from "next/link";

import { createUser } from "../services/api";
import { translate } from "../translate";
import { CreateUser } from "../types/database/User";
import { useRouter } from "next/router";

export type FormSignupUser = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

const Signup: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [isValid, setIsValid] = useState(
    process.env.NODE_ENV !== "development" ? false : true
  );
  const { register, handleSubmit } = useForm<FormSignupUser>();

  const router = useRouter();

  const onSubmit = async (data: FormSignupUser) => {
    setLoading(true);

    if (data.password === data.password_confirmation) {
      const dataFormatted: CreateUser = {
        email: data.email,
        is_active: false,
        name: data.name,
        password: data.password,
        is_admin: false,
        secret: `${process.env.NEXT_PUBLIC_SECRET}`,
      };

      const res = await createUser(dataFormatted);

      if (res.status !== 300) {
        router.push(`/confirmation?email=${data.email}`);

        Swal.fire({
          title: translate()["Greate!"],
          text: translate()["Registrations was successfully"],
          icon: "success",
          confirmButtonText: "Confimar",
        });
      } else {
        Swal.fire({
          title: translate()["ops!"],
          text: translate()["U did make something wrong"],
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    } else {
      Swal.fire({
        title: translate()["ops!"],
        text: translate()["Passwords don't match!"],
        icon: "info",
        confirmButtonText: "Ok",
      });
    }

    setLoading(false);
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div className="min-h-100vh d-flex justify-content-center align-items-center">
      {loading ? (
        <ReactLoading type="spin" width={105} />
      ) : (
        <Card bg="secondary" className="min-w-350px">
          <Card.Header>Cadastro</Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className="my-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  placeholder="Digite seu email"
                  required
                  {...register("email")}
                />
              </Form.Group>
              <Form.Group className="my-3">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  placeholder="Digite seu nome"
                  required
                  {...register("name")}
                />
              </Form.Group>
              <Form.Group className="my-3">
                <Form.Label>Senha</Form.Label>
                <Form.Control
                  required
                  placeholder="Senha"
                  type="password"
                  {...register("password")}
                />
              </Form.Group>
              <Form.Group className="my-3">
                <Form.Label>Confirmação da senha</Form.Label>
                <Form.Control
                  required
                  placeholder="Confirmação da Senha"
                  type="password"
                  {...register("password_confirmation")}
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
              <div className="d-flex justify-content-around mt-3">
                <Button type="submit" disabled={!isValid}>
                  Salvar
                </Button>
                <Link href="/">
                  <a className="btn btn-danger">Voltar</a>
                </Link>
              </div>
            </Form>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default Signup;
