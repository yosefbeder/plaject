export interface Project {
  sectionsOrder: string[];
  sections: {
    [sectionId: string]: {
      id: string;
      name: string;
      cards: string[];
    };
  };
  cards: {
    [cardId: string]: {
      id: string;
      title: string;
      description: string;
      checklist: { id: string; isChecked: boolean; content: string }[];
    };
  };
}

export type Color =
  | 'red'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'blue'
  | 'purple'
  | 'pink';

export interface UserInfo {
  email: string;
  name: string;
  thumbnail: string;
  projects: {
    id: string;
    name: string;
    color: Color;
    inFavorite: boolean;
    isDefault?: boolean;
  }[];
}
