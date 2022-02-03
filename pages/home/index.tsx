import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const Home: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const recoverySession = async () => {
      const session = await getSession();
      console.log(session);
    };

    recoverySession();
  }, []);

  return <div>HOME</div>;
};

export default Home;
