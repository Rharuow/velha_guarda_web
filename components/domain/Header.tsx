import { signOut } from "next-auth/react";
import React from "react";
import { Button, Card } from "react-bootstrap";
import { useCurrentUserContext } from "../Page/Application";

const Header: React.FC = () => {
  const currentUser = useCurrentUserContext();

  return (
    <Card className="text-dark min-w-30">
      <Card.Body className="d-flex justify-content-between">
        <span>{currentUser?.name}</span>
        <Button
          variant="danger"
          size="sm"
          className="rounded-circle"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          <i className="fas fa-sign-out-alt"></i>
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Header;
