import { User } from "../models/user.model";

export interface GetUser{

    total: number;
    totalPages: number;
    users: User[];
}