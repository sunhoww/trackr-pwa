import { merge } from 'lodash';
import { typeDef as Auth, resolvers as authResolvers } from './auth';

export const typeDefs = [Auth];
export const defaults = {
  isAuthed: false,
  authCompleted: false,
  traccarSessionId: null,
};
export const resolvers = merge(authResolvers);
