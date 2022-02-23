import { EventDatabase } from "../types/database/Event";
import { MeetDatabase } from "../types/database/Meet";

export const meetInvitation = (event: EventDatabase, meet: MeetDatabase) => {
  const partners = meet.chars.map(
    (char) => `\n    (x) ${char.name} [${char.voc}] [${char.lvl}]`
  );

  return (
    `Fala ${process.env.NEXT_PUBLIC_APP_NAME}. \r\nTa rolando um encontro de *${
      event.name
    }* as *${meet.start_at.toString().split("T")[1].split(".")[0]}* no dia *${
      meet.start_at.toString().split("T")[0].split("-")[2] +
      "/" +
      meet.start_at.toString().split("T")[0].split("-")[1] +
      "/" +
      meet.start_at.toString().split("T")[0].split("-")[0]
    }*!\r\n Até agora temos *${
      meet.chars.length
    }*.\r\n Chega mais no nosso app (${
      process.env.NEXT_PUBLIC_SITE
    }dashboard) pra participar!` +
    `\r\n    Participantes:` +
    partners.join() +
    "\r\n    ( ) Sua vaga te espera la no app" +
    `\r\n` +
    `${
      !meet.location.includes("Sem local")
        ? `\r\nSe liga no ponto de encontro -->*${meet.location}*<--`
        : "\r\nVê se não falta hein!"
    }`
  );
};
