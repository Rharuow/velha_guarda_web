import type { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className="min-h-100vh d-flex justify-content-center align-items-center flex-wrap">
      <h1 className="text-center text-white">
        {process.env.NEXT_PUBLIC_APP_NAME}
      </h1>
      <div className="buttons d-flex justify-content-around w-100 align-self-start">
        <Link href="/login">
          <a className="btn btn-success min-w-150px w-25">Entrar</a>
        </Link>
        <Link href="/signup">
          <a className="btn btn-danger min-w-150px w-25">Cadastrar</a>
        </Link>
      </div>
    </div>
  );
};

export default Home;
