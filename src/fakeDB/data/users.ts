import { hashSync } from "bcryptjs";
import { IUserDocument } from "../../models/User/index";

export const users: IUserDocument[] = [
  {
    id: "1",
    username: "user1",
    email: "user1@example.com",
    password: hashSync("user1"),
  },
  {
    id: "2",
    username: "user2",
    email: "user2@example.com",
    password: hashSync("user2"),
  },
];
