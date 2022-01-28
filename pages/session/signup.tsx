import React, { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import ReactLoading from "react-loading";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";

import { getChar, getGuild } from "../../services/charApi";
import { Guild } from "../../types/Guild";
import { CharDatabase, CharRegistration } from "../../types/database/Char";

import _ from "lodash";
import Link from "next/link";
import { createUser, getChars } from "../../services/api";
import { translate } from "../../translate";
import { serializeChar } from "../../util/serializerChar";
import { CreateUser } from "../../types/database/User";
import { secretHashed } from "../../util/hashSecret";

export type FormSignupUser = {
  email: string;
  char: string;
  password: string;
  secret: string;
  user_kind: string | null;
  password_confirmation: string;
};

const Signup: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [chars, setChars] = useState<Array<CharRegistration | null>>([]);
  const [guild, setGuild] = useState<Guild>();
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormSignupUser>();
  const [options, setOptions] =
    useState<Array<{ value: string; label: string }>>();

  useEffect(() => {
    const recoverGuildData = async () => {
      const guildData = await getGuild();
      if (guildData) {
        const charsRegistred = (await getChars()).record as Array<CharDatabase>;
        const charsNameRegistred = charsRegistred.map((char) => char.name);
        setGuild(guildData);
        let members: Array<CharRegistration> = [];
        let getOptions: Array<{ value: string; label: string }> = [];
        guildData?.guild?.members?.forEach((member) => {
          const getMembers = member.characters.map((char) => {
            if (charsNameRegistred.filter((c) => c === char.name).length < 1)
              getOptions.push({ value: char.name, label: char.name });
            return {
              name: char.name,
              admin:
                member.rank_title === "Representante" ||
                char.name.includes("Rharuow"),
            };
          });
          members = _.concat(members, getMembers);
        });
        setOptions(_.orderBy(getOptions, ["value"]));
        setChars(members);
        setLoading(false);
      }
    };
    recoverGuildData();
  }, []);

  const charWatch = watch("char");

  const onSubmit = async (data: FormSignupUser) => {
    console.log(data);
    setLoading(true);
    let charsApi = await getChar(data.char);
    const isPermitted = secretHashed(data.secret, charsApi.data.guild.rank);
    if (isPermitted) {
      const isAdmin = charsApi.data.guild.rank === "Representante";
      const charsParams: Array<CharDatabase> = [];
      charsParams.push(serializeChar(charsApi));
      for (const char of charsApi.other_characters) {
        if (char.world.includes("Pacera")) {
          charsApi = await getChar(char.name);
          charsParams.push(serializeChar(charsApi));
        }
      }
      // const dataFormatted: CreateUser = {
      //   chars: charsParams,
      //   email: data.email,
      //   is_active: false,
      //   name: data.char.split(" ")[0],
      //   password: data.password,
      //   is_admin: isAdmin,
      //   secret: `${process.env.NEXT_PUBLIC_SECRET}`,
      // };

      // console.log("dataFormatted = ", dataFormatted);

      // const res = await createUser(dataFormatted);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-100vh d-flex justify-content-center align-items-center">
      {loading ? (
        <ReactLoading type="spin" width={105} />
      ) : (
        <Card bg="secondary">
          <Card.Header>Cadastro</Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <input type="text" hidden {...register("user_kind")} />
              <Form.Group className="my-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  placeholder="Digite seu email"
                  required
                  {...register("email")}
                />
              </Form.Group>
              <Form.Group className="my-3">
                <Form.Label>Char</Form.Label>
                <Controller
                  name="char"
                  render={() => (
                    <Select
                      options={options}
                      placeholder="Nome do Char"
                      styles={{
                        menu: () => ({
                          color: "black",
                        }),
                      }}
                      onChange={(e) => {
                        e && setValue("char", e?.value);
                      }}
                    />
                  )}
                  control={control}
                />
                {errors.char && (
                  <span className="text-danger">
                    {translate()["Choose one"]} char
                  </span>
                )}
              </Form.Group>
              <Form.Group className="my-3">
                <Form.Label>Palavra secreta</Form.Label>
                <Form.Control
                  required
                  placeholder="Segredo de acesso"
                  {...register("secret")}
                />
              </Form.Group>
              <Form.Group className="my-3">
                <Form.Label>Senha</Form.Label>
                <Form.Control
                  required
                  placeholder="Senha"
                  type="password"
                  {...register("password")}
                />
              </Form.Group>
              <Form.Group className="my-3">
                <Form.Label>Confirmação da senha</Form.Label>
                <Form.Control
                  required
                  placeholder="Confirmação da Senha"
                  type="password"
                  {...register("password_confirmation")}
                />
              </Form.Group>
              <div className="d-flex justify-content-around">
                <Button disabled={charWatch === undefined} type="submit">
                  Salvar
                </Button>
                <Link href="/">
                  <a className="btn btn-danger">Voltar</a>
                </Link>
              </div>
            </Form>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default Signup;
