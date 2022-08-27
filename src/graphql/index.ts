import {Router as rtr} from 'express';
import {graphqlHTTP} from 'express-graphql';
import schema from './schema';

const router = rtr();

// graphql
router.use(
    '/',
    graphqlHTTP({
      schema,
      graphiql: true,
    }),
);

export default router;
