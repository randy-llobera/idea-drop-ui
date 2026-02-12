import api from '@/lib/axios';
import type { Idea, NewIdea } from '@/types';

export const fetchIdeas = async (): Promise<Idea[]> => {
  const res = await api.get('/ideas');
  return res.data;
};

export const fetchIdea = async (ideaId: string): Promise<Idea> => {
  const res = await api.get(`/ideas/${ideaId}`);
  return res.data;
};

export const createIdea = async (idea: NewIdea): Promise<Idea> => {
  const res = await api.post('/ideas', {
    ...idea,
    createdAt: new Date().toISOString(),
  });
  return res.data;
};

export const deleteIdea = async (ideaId: string): Promise<void> => {
  await api.delete(`/ideas/${ideaId}`);
};

export const updateIdea = async (
  ideaId: string,
  idea: NewIdea,
): Promise<Idea> => {
  const res = await api.patch(`/ideas/${ideaId}`, idea);
  return res.data;
};
