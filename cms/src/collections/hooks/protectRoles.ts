import type { FieldHook } from 'payload/types';

import type {Usuario} from '../../payload-types';

// ensure there is always a `user` role
// do not let non-admins change roles
export const protectRoles: FieldHook<Usuario & { id: string }> = async ({ req, data }) => {
  const isAdmin = req.user?.roles.includes('admin') || data?.email === 'tech@sejahype.com.br'; // for the seed script

  if (!isAdmin) {
    return ['marketing'];
  }

  const userRoles = new Set(data?.roles || []);
  userRoles.add('marketing');
  return [...userRoles];
};
