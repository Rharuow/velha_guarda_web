import React, { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import CharDetailed from "../../components/Cards/CharDetailed";
import Header from "../../components/domain/Header";
import { useCurrentUserContext } from "../../components/Page/Application";
import { CharDatabase } from "../../types/database/Char";

const Home: React.FC = () => {
  const currentUser = useCurrentUserContext();
  const [loading, setLoading] = useState(true);
  const [chars, setChars] = useState<Array<CharDatabase>>();
  const [char, setChar] = useState<CharDatabase>();

  console.log(currentUser);

  useEffect(() => {
    if (currentUser && currentUser !== null && currentUser.chars) {
      setChars(currentUser.chars);
      setChar(currentUser.chars[0]);
      setLoading(false);
    }
  }, [currentUser]);

  return (
    <div className="d-flex justify-content-center flex-wrap">
      {!loading && char ? (
        <>
          <div className="mb-4 w-100">
            <Header />
          </div>
          <div className="mb-4">
            <CharDetailed {...char} />
          </div>
        </>
      ) : (
        <div className="min-h-100vh d-flex justify-content-center align-items-center">
          <ReactLoading type="spinningBubbles" />
        </div>
      )}
    </div>
  );
};

export default Home;
