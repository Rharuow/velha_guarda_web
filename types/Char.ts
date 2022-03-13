export type Char = {
  account_information: {
    created: {
      date: string;
      timezone: string;
      timezone_type: number;
    };
    loyalty_title: string;
  };
  character: {
    account_status: string;
    achievement_points: number;
    comment: string;
    guild: { name: string; rank: string };
    last_login: string;
    level: number;
    name: string;
    residence: string;
    sex: string;
    title: string;
    unlocked_titles: number;
    vocation: string;
    world: string;
  };
  other_characters: Array<{
    name: string;
    status: string;
    world: string;
  }>;
  error?: "Character does not exist.";
};
