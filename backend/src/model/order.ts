import { dbQuery, findFirst } from "../db/db";

export type Order = {
  id: number;
  user_id: number;
  date: number;
  shift: string;
  status: boolean;
  type: string;
};

const insertOrder = async (order: Order) => {
  await dbQuery(
    `INSERT INTO 'orders' (user_id, date, shift, type, status) VALUES(?, ?, ?, ?, ?)`,
    [order.user_id, order.date, order.shift, order.type, order.status]
  );

  let [response] = await dbQuery(
    `SELECT seq AS Id FROM sqlite_sequence WHERE name = 'orders'`
  );

  return getOrder(response.Id);
};

const getOrder = async (id: number) => {
  const response = await findFirst(`SELECT * FROM orders WHERE id = ?`, [id]);

  return response as Order | undefined;
};

const getCurrentTimestamp = async () => {
  const dataAtual = new Date();

  const dia = dataAtual.getDate();
  const mes = dataAtual.getMonth();
  const ano = dataAtual.getFullYear();

  var timeStamp = new Date(ano, mes, dia);
  console.log(timeStamp);
  return timeStamp.getTime();
};

const listActiveOrders = async () => {
  const date = await getCurrentTimestamp();

  const response = await dbQuery(
    `
        SELECT *
        FROM orders
        WHERE date >= ?
    `,
    [date]
  );

  return response as Order[];
};

export const orderModel = {
  insertOrder,
  getOrder,
  listActiveOrders,
};
