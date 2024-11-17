import type { Usuario } from '../../payload-types';

export const checkRole = (allRoles: Usuario['roles'] = [], user: Usuario | undefined = undefined): boolean => {
  if (user) {
    return allRoles.some(role => user.roles.includes(role));
  }
  return false;
};
