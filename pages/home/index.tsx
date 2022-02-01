import { useSession } from "next-auth/react";
import React from "react";

const Home: React.FC = () => {
  const session = useSession();

  console.log(session);

  return <div>HOME</div>;
};

export default Home;
