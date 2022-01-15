import { Role } from "./entities/role.enum";

export interface JWTPayload {
  email: string;
  role: Role;
}
