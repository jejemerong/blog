export type LogLink = {
  href: string;
  label: string;
};

export type LogParagraph =
  | string
  | {
      parts: Array<string | LogLink>;
    };

export type LogSection = {
  heading: string;
  paragraphs: LogParagraph[];
  steps?: string[];
};

export type LogPost = {
  slug: string;
  title: string;
  description: string;
  thumbnail?: string;
  date: string;
  intro: string;
  sections: LogSection[];
};

export type ContentsIndex = {
  posts: Array<{
    slug: string;
    file: string;
  }>;
};
