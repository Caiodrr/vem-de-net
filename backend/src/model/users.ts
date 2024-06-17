import { dbQuery, findFirst } from "../db/db";

export type User = {
  id: number;
  username: string;
  email?: string | null;
  cpf: string;
  phone: string;
};

const insertUser = async (user: User) => {
  await dbQuery(
    `INSERT INTO 'users' (username, email, cpf, phone) VALUES(?, ?, ?, ?)`,
    [user.username, user.email, user.cpf, user.phone]
  );

  let [response] = await dbQuery(
    `SELECT seq AS Id FROM sqlite_sequence WHERE name = 'users'`
  );
  return getUser(response.Id);
};

const getUser = async (id: number) => {
  const response = await findFirst(`SELECT * FROM users WHERE id = ?`, [id]);

  return response as User | undefined;
};

const getUserByCpf = async (cpf: string) => {
  const response = await findFirst(`SELECT * FROM users WHERE cpf = ?`, [cpf]);

  return response as User | undefined;
};

export const usersModel = {
  insertUser,
  getUser,
  getUserByCpf,
};
