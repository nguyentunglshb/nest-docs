import { SetMetadata } from '@nestjs/common';

export const matchRoles = (roles: string[], userRoles: string[]) =>
  roles.some((role) => userRoles.includes(role));

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
