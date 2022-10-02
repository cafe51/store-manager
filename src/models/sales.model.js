// const camelize = require('camelize');
const connection = require('./connection');

const queryAllSalesModel = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.sales ORDER BY id',
  );
  return result;
};

// const queryProductById = async (id) => {
//   const [result] = await connection.execute(
//     'SELECT * FROM products WHERE id = ? ORDER BY id',
//     [id],
//   );
//   return result;
// };

const insertSalesModel = async (arrayOfProducts) => {
  // const currentDate = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
  arrayOfProducts.forEach(async (_elementOfArray) => {
    const [{ insertId1 }] = await connection.execute(
      'INSERT INTO StoreManager.sales (date) VALUE (?)',
      ['(NOW())'],
    );
    const [{ insertId2 }] = await connection.execute(
      'INSERT INTO StoreManager.sales_products (product_id, quantity) VALUE (?, ?)',
      [`${_elementOfArray.product}`, `${_elementOfArray.quantity}`],
    );
    return [insertId1, insertId2];
  });
};

module.exports = {
  insertSalesModel,
  queryAllSalesModel,
};