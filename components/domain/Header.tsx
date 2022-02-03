import { signOut } from "next-auth/react";
import React from "react";
import { Button, Card } from "react-bootstrap";

const Header: React.FC = () => {
  return (
    <Card>
      <Card.Body>
        <Button variant="danger" onClick={() => signOut({ callbackUrl: "/" })}>
          Sair
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Header;
