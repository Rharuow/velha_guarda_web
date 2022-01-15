import type { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className="min-h-100vh d-flex justify-content-center align-items-center flex-wrap">
      <h1 className="text-center">{process.env.NEXT_PUBLIC_APP_NAME}</h1>
      <div className="buttons d-flex justify-content-around w-100 align-self-start">
        <Link href="/session/login">
          <a className="btn btn-success w-25">Entrar</a>
        </Link>
        <Link href="/session/signup">
          <a className="btn btn-danger w-25">Cadastrar</a>
        </Link>
      </div>
    </div>
  );
};

export default Home;
