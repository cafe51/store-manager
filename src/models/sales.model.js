// const camelize = require('camelize');
const { forEach } = require('p-iteration');
const connection = require('./connection');

const queryAllSalesModel = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.sales ORDER BY id',
  );
  return result;
};

const insertDate = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUE (NOW())',
  );
  return insertId;
};

const numberOfSales = async () => {
  const sales = await queryAllSalesModel();
  return sales.length;
};

const insertSales = async (salesId, productId, quantity) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUE (?, ?, ?)',
    [`${salesId}`, `${productId}`, `${quantity}`],
  );
  return insertId;
};

const newArrayOfProducts = (arrayOfProducts, totalSales) => {
  const newArray = arrayOfProducts.map((product) => {
    const newProduct = product;
    newProduct.salesId = totalSales;
    return product;
  });
  return newArray;
};

const insertSalesModel = async (arrayOfProducts) => {
  try {
    const insertDateId = await insertDate(); // insere a venda
    const totalSales = await numberOfSales(); // pega o numero de vendas

    const reqCopy = JSON.parse(JSON.stringify(arrayOfProducts)); // deep copy do array pra retornar pro controller

    const productsWithSalesId = newArrayOfProducts(arrayOfProducts, totalSales); // novo array com salesId

    // inserção do novo array com salesId no banco
    const insertSaleID = await (async function insertLoop() {
      const array = []; await forEach(productsWithSalesId, async (product) => {
        const { salesId, productId, quantity } = product;

        const insertId = await insertSales(salesId, productId, quantity);
        array.push(insertId); return array;
      });
      return array;
    }());

    return [reqCopy, insertDateId, insertSaleID]; // id das querys para testes
  } catch (error) { console.log(error); }
};

module.exports = {
  insertSalesModel,
  queryAllSalesModel,
};
