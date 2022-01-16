export const translate = (language = "pt-BR") => {
  switch (language) {
    default:
      return {
        "Wellcome to ": `Bem vindo ao ${process.env.NEXT_PUBLIC_APP_NAME}`,
        "This field is required": "Esse Campo é obrigatório",
        "Choose one": "Escolha 1 (um)",
      };
  }
};
