import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import ReactLoading from "react-loading";
import Login from "../../pages/session/login";

const Application: React.FC = ({ children }) => {
  const session = useSession();
  const router = useRouter();

  return session.status === "loading" ? (
    <div className="min-h-100vh d-flex justify-content-center align-items-center">
      <ReactLoading type="spinningBubbles" />
    </div>
  ) : session.status === "unauthenticated" ? (
    <Login />
  ) : (
    <>{children}</>
  );
};

export default Application;
