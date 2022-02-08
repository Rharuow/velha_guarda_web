export const getPermission: (secrete: string, kind: string) => boolean = (
  secret,
  kind
) => {
  switch (kind) {
    case "Representante":
      return secret === `${process.env.NEXT_PUBLIC_ADMIN_SECRET}`;
    default:
      return secret === `${process.env.NEXT_PUBLIC_USER_SECRET}`;
  }
};
