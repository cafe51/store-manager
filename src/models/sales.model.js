const camelize = require('camelize');
const connection = require('./connection');

const queryAllSalesModel = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.sales ORDER BY id',
  );
  return camelize(result);
};

const queryAllSalesWithProductsModel = async () => {
  const [result] = await connection.execute(
    `SELECT sale_products.sale_id, sales.date, sale_products.product_id, sale_products.quantity
    FROM StoreManager.sales AS sales
    JOIN StoreManager.sales_products AS sale_products
    ON sale_products.sale_id = sales.id
    ORDER BY sale_id, product_id`,
  );
  // console.log('RESULTADO', result);
  return camelize(result);
};

const getSalesByIdModel = async (id) => {
  const [result] = await connection.execute(
    `SELECT sales.date, sale_products.product_id, sale_products.quantity
    FROM StoreManager.sales AS sales
    JOIN StoreManager.sales_products AS sale_products ON sale_products.sale_id = sales.id
    WHERE sale_products.sale_id = ?
    ORDER BY product_id;`,
    [id],
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
  queryAllSalesWithProductsModel,
  getSalesByIdModel,
  insertDate,
  insertSales,
};
