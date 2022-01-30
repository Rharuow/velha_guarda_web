export const getPermission: (secrete: string, kind: string) => boolean = (
  secret,
  kind
) => {
  switch (kind) {
    case "Representante":
      return secret === "avalanca";
    default:
      return secret === "sodropaquemjoga";
  }
};
