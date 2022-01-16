export type Char = {
  account_information: {
    created: {
      date: string;
      timezone: string;
      timezone_type: number;
    };
    loyalty_title: string;
  };
  achievements: Array<any>;
  data: {
    account_status: string;
    achievement_points: number;
    guild: {
      name: string;
      rank: string;
    };
    last_login: Array<{
      date: string;
      timezone: string;
      timezone_type: number;
    }>;
    level: number;
    name: string;
    residence: string;
    sex: string;
    status: string;
    title: string;
    vocation: string;
    world: string;
  };
  deaths: Array<{
    date: {
      date: string;
      timezone_type: number;
      timezone: string;
    };
    involved: Array<any>;
    level: number;
    reason: string;
  }>;
  other_characters: Array<{
    name: string;
    status: string;
    world: string;
  }>;
};
