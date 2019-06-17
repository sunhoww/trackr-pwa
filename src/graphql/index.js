import { mergeDeepRight } from 'ramda';
import { typeDef as Auth, resolvers as authResolvers } from './auth';

export const typeDefs = [Auth];

export const defaults = {
  traccarSessionId: null,
  waitForToken: false,
};

export const resolvers = mergeDeepRight({}, authResolvers);
