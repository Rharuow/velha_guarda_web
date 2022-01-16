import React, { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import ReactLoading from "react-loading";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";

import { getGuild } from "../../services/charApi";
import { Guild } from "../../types/Guild";
import { Char, CharRegistration } from "../../types/database/Char";

import _ from "lodash";
import Link from "next/link";
import { getChars } from "../../services/api";

const Signup: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [chars, setChars] = useState<Array<CharRegistration | null>>([]);
  const [guild, setGuild] = useState<Guild>();
  const { register, handleSubmit, control } = useForm();
  const [options, setOptions] =
    useState<Array<{ value: string; label: string }>>();

  useEffect(() => {
    const recoverGuildData = async () => {
      const guildData = await getGuild();
      const charsRegistred = (await getChars()).record as Array<Char>;
      const charsNameRegistred = charsRegistred.map((char) => char.name);
      setGuild(guildData);
      let members: Array<CharRegistration> = [];
      let getOptions: Array<{ value: string; label: string }> = [];
      guildData.guild.members.forEach((member) => {
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
    };
    recoverGuildData();
  }, []);

  return (
    <div className="min-h-100vh d-flex justify-content-center align-items-center">
      {loading ? (
        <ReactLoading type="spin" width={105} />
      ) : (
        <Card bg="secondary">
          <Card.Header>Cadastro</Card.Header>
          <Card.Body>
            <Form>
              <Form.Group className="my-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  placeholder="Digite seu email"
                  {...register("email")}
                />
              </Form.Group>
              <Form.Group className="my-3">
                <Form.Label>Char</Form.Label>
                <Controller
                  render={() => (
                    <Select
                      options={options}
                      placeholder="Nome do Char"
                      styles={{
                        menu: () => ({
                          color: "black",
                        }),
                      }}
                      name="char"
                    />
                  )}
                  name="char"
                  control={control}
                />
              </Form.Group>
              <Form.Group className="my-3">
                <Form.Label>Token</Form.Label>
                <Form.Control
                  placeholder="Token de acesso"
                  {...register("token")}
                />
              </Form.Group>
              <Form.Group className="my-3">
                <Form.Label>Senha</Form.Label>
                <Form.Control
                  placeholder="Senha"
                  type="password"
                  {...register("password")}
                />
              </Form.Group>
              <Form.Group className="my-3">
                <Form.Label>Confirmação da senha</Form.Label>
                <Form.Control
                  placeholder="Confirmação da Senha"
                  type="password"
                  {...register("password_confirmation")}
                />
              </Form.Group>
              <div className="d-flex justify-content-around">
                <Button type="submit">Salvar</Button>
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
