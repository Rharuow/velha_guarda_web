import { signOut } from "next-auth/react";
import React from "react";
import { Button, Card } from "react-bootstrap";
import { useCurrentUserContext } from "../Page/Application";

const Header: React.FC = () => {
  const currentUser = useCurrentUserContext();

  return (
    <Card className="text-dark text-center w-100 border-radius-bottom-left-20px border-radius-bottom-right-20px">
      <Card.Body className="d-flex justify-content-between">
        <span className="flex-grow-1">{currentUser?.name}</span>
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
