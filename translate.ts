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
        "CIPSOFT server can't find yout char!":
          "O servidor da CIPSOFT não encontrou seu char!",
        "There is someting something worng with CIP API. Please try again":
          "Há algo de errado com a API da CIP. Por favor tente novamente",
        "Greate!": "Parabens!",
        "Registrations was successfully": "Cadastro feita com sucesso!",
        "Request failed with status code 401": "Requisição não autorizada!",
        "Character does not exist.": "Esse char não existe no Tibia!",
        "Character without token comment!":
          "Entre na conta e adicione o token no comentário!",
        error: "Algo deu errado, desculpe!",
        "Password or email incorrects": "Senha ou email incorretos",
        "Passwords don't match!": "Senhas não conferem!",
        "Event was registred": "O evento foi registrado com sucesso",
        "Event was changed": "O evento foi alterado com sucesso",
        "Event was deleted": "O evento foi apagado com sucesso",
        "Event wasn't load": "Os eventos não foram carregados",
        "Meet was registred": "O encontro foi registrado com sucesso",
        "Meet wasn't load": "Os encontros não foram carregados",
        "There ins't meet today!": "Não há encontros hoje!",
        "There ins't meet with title!": "Não há encontros com esse título!",
        "There ins't meet available!": "Não há encontros ativos!",
        "There ins't meet not available!": "Não há encontros intativos!",
        "Your char was add on meet": "Seu Char foi adicionado ao encontro",
        "Your char was deleted on meet": "Seu Char foi retirado do encontro",
        "Meet deleted with success": "Encontro deletado com Sucesso",
      };
  }
};
