const camelize = require('camelize');
const connection = require('./connection');

const queryAllProducts = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM products ORDER BY id',
  );
  return camelize(result);
};

// const queryProductById = async (id) => {
//   const [[result]] = await connection.execute(
//     'SELECT * FROM products WHERE id = ? ORDER BY id',
//     [id],
//   );
//   return camelize(result);
// };

const insertProductModel = async (obj) => {
  const [{ insert }] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUE (?)',
    [`${obj.name}`],
  );
  return insert;
};

const updateProductModel = async (id, obj) => {
  const [{ update }] = await connection.execute(
    'UPDATE StoreManager.products SET name = ? WHERE id = ?',
    [`${obj.name}`, id],
  );
  return update;
};

const deleteProductModel = async (id) => {
  const [{ result }] = await connection.execute(
    'DELETE FROM StoreManager.products WHERE id = ?',
    [id],
  );
  return result;
};

module.exports = {
  queryAllProducts,
  // queryProductById,
  insertProductModel,
  updateProductModel,
  deleteProductModel,
};
