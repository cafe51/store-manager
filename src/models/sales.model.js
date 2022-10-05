const camelize = require('camelize');
const connection = require('./connection');

const queryAllSalesModel = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.sales ORDER BY id',
  );
  return camelize(result);
};

const insertDate = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUE (NOW())',
  );
  return insertId;
};

const insertSales = async (salesId, productId, quantity) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUE (?, ?, ?)',
    [`${salesId}`, `${productId}`, `${quantity}`],
  );
  return insertId;
};

module.exports = {
  queryAllSalesModel,
  insertDate,
  insertSales,
};
