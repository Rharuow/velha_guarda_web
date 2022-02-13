import Link from "next/link";
import React, { useEffect } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";

import { LoginUser } from "../../types/database/User";

export type FormLoginUser = {
  email: string;
  password: string;
  csrfToken: string;
};

const Login: React.FC = () => {
  const { register, handleSubmit, setValue } = useForm<FormLoginUser>();

  const onSubmit = async (data: LoginUser) => {
    console.log(`${process.env.NEXT_PUBLIC_SITE}/dashboard`);
    signIn("login", {
      ...data,
      // callbackUrl: `${process.env.NEXT_PUBLIC_SITE}/dashboard`,
    });
  };

  useEffect(() => {
    setValue("email", "");
  });

  return (
    <div className="min-h-100vh d-flex align-items-center justify-content-center flex-wrap">
      <h1 className="d-block w-100 text-center text-white align-self-end">
        {process.env.NEXT_PUBLIC_APP_NAME}
      </h1>
      <Card className="align-self-start">
        <Card.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="my-3">
              <Form.Label className="text-dark">Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Digite seu email"
                defaultValue=""
                required
                {...register("email")}
              />
            </Form.Group>
            <Form.Group className="my-3">
              <Form.Label className="text-dark">Senha</Form.Label>
              <Form.Control
                type="password"
                placeholder="Digite sua senha"
                required
                {...register("password")}
              />
            </Form.Group>
            <div className="buttons d-flex justify-content-around w-100 align-self-start">
              <Button type="submit" className="w-30">
                Enviar
              </Button>

              <Link href="/">
                <a className="btn btn-danger w-30">Voltar</a>
              </Link>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Login;
