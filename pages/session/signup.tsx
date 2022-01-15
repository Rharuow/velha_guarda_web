import React from "react";
import { Card, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";

const Signup: React.FC = () => {
  const {} = useForm();
  return (
    <div className="min-h-100vh d-flex justify-content-center align-items-center">
      <Card bg="secondary">
        <Card.Header>Cadastro</Card.Header>
        <Card.Body>
          <Form></Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Signup;
