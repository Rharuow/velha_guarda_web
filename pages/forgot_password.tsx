import Link from 'next/link';
import React from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form';

export type FormForgotPassword = { email: string }

const ForgotPassword = () => {
  const { register, handleSubmit } = useForm<FormForgotPassword>();
  const onSubmit = async (data: FormForgotPassword) => {
    console.log(data)
  };
  return (
    <div className="min-h-100vh d-flex flex-column align-items-center justify-content-center flex-wrap">
      <h1 className="d-block w-100 text-center text-white align-self-end">
        Recuperação de senha
      </h1>
      <Card>
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
            <div className="buttons d-flex justify-content-around w-100 align-self-start">
              <Button type="submit" className="w-30">
                Enviar
              </Button>

              <Link href="/">
                <a className="btn btn-danger w-30 ">Voltar</a>
              </Link>
            </div>
          </Form>
        </Card.Body>
      </Card>
      <div className="align-self-start d-flex justify-content-center w-100">
        <Link href='/session/login'>
          <a>Lembrei da senha</a>
        </Link>
      </div>
    </div>
  )
}

export default ForgotPassword