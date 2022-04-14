import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import ReactLoading from "react-loading";
import { translate } from "../translate";

export type FormChangePassword = {
  email: string;
  password: string;
  password_confirmation: string;
  token: string;
};

const ChangePassword: React.FC = () => {
  const router = useRouter();

  const { handleSubmit, register } = useForm<FormChangePassword>();

  const onSubmit = (data: FormChangePassword) => {
    console.log(data);
  };

  if (!router.query.token && !router.query.email)
    return (
      <div className="min-h-100vh d-flex flex-column align-items-center justify-content-center flex-wrap">
        <ReactLoading type="spinningBubbles"></ReactLoading>
      </div>
    );

  return (
    <div className="min-h-100vh d-flex flex-column align-items-center justify-content-center flex-wrap">
      <Card className="mb-3">
        <Card.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="my-3">
              <Form.Label className="text-dark">Email</Form.Label>
              <Form.Control
                type="email"
                defaultValue={router.query.email}
                hidden
                required
                {...register("email")}
              />
            </Form.Group>
            <Form.Group className="my-3">
              <Form.Label className="text-dark">
                {translate()["Password"]}
              </Form.Label>
              <Form.Control
                type="password"
                placeholder={translate()["Type your new password"]}
                defaultValue=""
                required
                {...register("password")}
              />
            </Form.Group>
            <Form.Group className="my-3">
              <Form.Label className="text-dark">
                {translate()["Password Confirmation"]}
              </Form.Label>
              <Form.Control
                type="password"
                placeholder={translate()["Type your new password again"]}
                defaultValue=""
                required
                {...register("password_confirmation")}
              />
            </Form.Group>
            <Form.Group className="my-3">
              <Form.Control
                type="text"
                defaultValue={router.query.token}
                required
                hidden
                {...register("token")}
              />
            </Form.Group>
            <div className="buttons d-flex justify-content-around w-100 align-self-start">
              <Button type="submit" className="w-30">
                {translate()["Send"]}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
      <div className="align-self-start d-flex justify-content-center w-100">
        <Link href="/session/login">
          <a>{translate()["Remember my password"]}</a>
        </Link>
      </div>
    </div>
  );
};

export default ChangePassword;
