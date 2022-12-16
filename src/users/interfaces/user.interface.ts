import { Role } from 'src/common/entities/roles.enum';

export interface User {
  id?: number;
  firstName?: string;
  lastName: string;
  email: string;
  roles: Role[];
}
