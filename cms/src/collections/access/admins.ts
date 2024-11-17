import type { Access } from 'payload/config';
import { checkRole } from './checkRole';
import type { PayloadRequest } from 'payload/types';

const admins = ({ req }: { req: PayloadRequest }) => {
  const { user } = req;
  return checkRole(['admin'], user);
};

export default admins;
