export type Idea = {
  _id: string;
  title: string;
  summary: string;
  description: string;
  tags: string[];
  createdAt: string;
  user: string;
};

export type NewIdea = {
  title: string;
  summary: string;
  description: string;
  tags: string[];
};
