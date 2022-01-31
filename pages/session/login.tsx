import Link from "next/link";
import React, { useEffect } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { getCsrfToken, signIn } from "next-auth/react";
import { CtxOrReq } from "next-auth/client/_utils";

import { LoginUser } from "../../types/database/User";

export type FormLoginUser = {
  email: string;
  password: string;
  csrfToken: string;
};

const Login: React.FC<{ csrfToken: string }> = ({ csrfToken }) => {
  const { register, handleSubmit, setValue } = useForm<FormLoginUser>();

  const onSubmit = async (data: LoginUser) => {
    console.log("data = ", data);

    signIn("login", {
      ...data,
      callbackUrl: `${process.env.NEXT_PUBLIC_SITE}/home`,
    });
  };

  useEffect(() => {
    setValue("email", "");
  });

  return (
    <div className="min-h-100vh d-flex align-items-center justify-content-center flex-wrap">
      <h1 className="d-block w-100 text-center align-self-end">
        {process.env.NEXT_PUBLIC_APP_NAME}
      </h1>
      <Card className="align-self-start">
        <Card.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="hidden"
              {...register("csrfToken")}
              defaultValue={csrfToken}
            />
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

export async function getServerSideProps(context: CtxOrReq | undefined) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}

export default Login;
