import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { createContext, useContext, useEffect, useState } from "react";
import ReactLoading from "react-loading";
import { getCurrentUserByToken } from "../../services/api";
import { User } from "../../types/database/User";

const CurrentUserContext = createContext<User | null>(null);

export const useCurrentUserContext = () => useContext(CurrentUserContext);

const Application: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const session = useSession();
  const [loadingContext, setLoadingContext] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const getCurrentUser = async () => {
      const tempUser = (await getCurrentUserByToken(`${session?.data?.token}`))
        .data.record as User;

      setUser(tempUser);
    };
    if (session && session.data && session.data.token) getCurrentUser();
    if (
      session &&
      session.status === "unauthenticated" &&
      router.pathname.includes("dashboard")
    )
      router.push("/");
    setLoadingContext(false);
  }, [router, session]);

  return session.status === "loading" || loadingContext ? (
    <div className="min-h-100vh d-flex justify-content-center align-items-center">
      <ReactLoading type="spinningBubbles" />
    </div>
  ) : (
    <CurrentUserContext.Provider value={user}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export default Application;
