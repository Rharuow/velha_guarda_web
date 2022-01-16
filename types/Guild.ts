export type Guild = {
  guild: {
    data: {
      name: string;
      description: string;
      guildhall: {
        name: string;
        town: string;
        paid: string;
        world: string;
        houseid: number;
      };
      application: boolean;
      war: boolean;
      online_status: number;
      offline_status: number;
      disbanded: boolean;
      totalmembers: number;
      totalinvited: number;
      world: string;
      founded: string;
      active: boolean;
      homepage: string;
      guildlogo: string;
    };
    members: Array<Member>;
    invited: Array<any>;
  };
};

export type Member = {
  rank_title: string;
  characters: [
    {
      name: string;
      nick: string;
      level: number;
      vocation: string;
      joined: string;
      status: string;
    }
  ];
};
