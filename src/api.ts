import {Router as rtr} from 'express';
import auth from './authentication';
import graphql from './graphql';
import crudrest from './crudrest';

const router = rtr();

router.use('/auth', auth);
router.use('/graphql', graphql);
router.use('/crudrest', crudrest);

export default router;
