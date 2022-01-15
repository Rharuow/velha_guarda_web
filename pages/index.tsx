import type { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className="min-h-100vh d-flex align-items-center flex-wrap">
      <h1 className="d-block w-100 text-center">
        {process.env.NEXT_PUBLIC_APP_NAME}
      </h1>
      <div className="buttons d-flex justify-content-around w-100">
        <Link href="#">
          <a className="btn btn-success w-25">Entrar</a>
        </Link>
        <Link href="#">
          <a className="btn btn-danger w-25">Cadastrar</a>
        </Link>
      </div>
    </div>
  );
};

export default Home;
