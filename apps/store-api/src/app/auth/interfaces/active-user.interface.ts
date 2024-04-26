import { UserRoles } from "../../users/user-roles";

export interface ActiveUserData {
    sub: number;
    email: string;
    role: UserRoles
}