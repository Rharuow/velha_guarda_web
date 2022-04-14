import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import ReactLoading from "react-loading";
import Swal from "sweetalert2";
import * as yup from "yup";

import { changePassword } from "../services/api";
import { translate } from "../translate";

export type FormChangePassword = {
  email: string;
  password: string;
  password_confirmation: string;
  token: string;
};

const schema = yup.object({
  email: yup.string().required(),
  token: yup.string().required(),
  password: yup.string().required(translate()['This field is required']),
  password_confirmation: yup.string()
    .oneOf([yup.ref('password'), null], translate()["Passwords must match"])
}).required();

const ChangePassword: React.FC = () => {
  const router = useRouter();

  const { handleSubmit, register, formState: { errors } } = useForm<FormChangePassword>({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data: FormChangePassword) => {
    try {
      await changePassword(data)
      Swal.fire({
        title: translate()['Password updated with success'],
        icon: 'success',
        text: translate()["You'll redirect to login page."]
      }).then(() => router.push('/session/login'))
    } catch (error) {
      Swal.fire({
        title: translate()['Sorry, something is worng'],
        icon: 'error',
        text: translate()['Try again!']
      })
    }
  };

  console.log(errors)

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
          <Form onSubmit={handleSubmit(onSubmit)} >
            <Form.Group className="my-3">
              <Form.Control
                type="email"
                defaultValue={router.query.email}
                readOnly
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
                className={errors.password ? 'is-invalid' : 'is-valid'}
                {...register("password")}
              />
            </Form.Group>
            {errors.password && <p className="text-danger">{errors.password.message}</p>}
            <Form.Group className="my-3">
              <Form.Label className="text-dark">
                {translate()["Password Confirmation"]}
              </Form.Label>
              <Form.Control
                type="password"
                placeholder={translate()["Type your new password again"]}
                defaultValue=""
                className={errors.password_confirmation ? 'is-invalid' : 'is-valid'}
                {...register("password_confirmation")}
              />
              {errors.password_confirmation && <p className="text-danger">{errors.password_confirmation.message}</p>}
            </Form.Group>
            <Form.Group className="my-3">
              <Form.Control
                type="text"
                defaultValue={router.query.token}
                required
                readOnly
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
