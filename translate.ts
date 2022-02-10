export const translate = (language = "pt-BR") => {
  switch (language) {
    default:
      return {
        "Wellcome to ": `Bem vindo ao ${process.env.NEXT_PUBLIC_APP_NAME}`,
        "This field is required": "Esse Campo é obrigatório",
        "Choose one": "Escolha 1 (um)",
        "ops!": "Ops!",
        "U tried something really bad": "Você tentou algo muito ruim!",
        "U did make something wrong": "Você fez algo de errado!",
        "There is someting bad on CIP sever":
          "Há algo de errado com servidor da CIP!",
        "Greate!": "Parabens!",
        "Registrations was successfully": "Cadastro feita com sucesso!",
        "Request failed with status code 401": "Requisição não autorizada!",
        error: "Algo deu errado, desculpe!",
        "Event was registred": "O evento foi registrado com sucesso",
        "Meet was registred": "O encontro foi registrado com sucesso",
        "Your char was add on meet": "Seu Char foi adicionado ao encontro",
        "Your char was deleted on meet": "Seu Char foi retirado do encontro",
        "Meet deleted with success": "Encontro deletado com Sucesso",
      };
  }
};
