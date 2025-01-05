import { User } from "@prisma/client";

//type User = {
//  id: string;
//  name: string;
//  discordHandle: string;
//  diplomas: Diploma[];
//};

type Diploma = {
  name: string;
  school: string;
};

type Post = {
  course: string;
  class: string;
  numOfTeammates: number;
  User: User;
  createdAt: string;
};
