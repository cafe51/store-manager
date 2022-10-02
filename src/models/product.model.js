// const camelize = require('camelize');
const connection = require('./connection');

const queryAllProducts = async () => {
  // try {
  //   const [result] = await connection.execute(
  //     'SELECT * FROM products',
  //   );
  //   return result;
  // } catch (error) {
  //   return { type: 'Erro no product.model', message: error.message };
  // }

  const [result] = await connection.execute(
    'SELECT * FROM products ORDER BY id',
  );
  return result;
};

const queryProductById = async (id) => {
  const [result] = await connection.execute(
    'SELECT * FROM products WHERE id = ? ORDER BY id',
    [id],
  );
  return result;
};

const insertProductModel = async (obj) => {
  const [{ insert }] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUE (?)',
    [`${obj.name}`],
  );
  // const [result] = await connection.execute(
  //   'SELECT * FROM products ORDER BY id',
  // );
  return insert;
};

module.exports = {
  queryAllProducts,
  queryProductById,
  insertProductModel,
};
