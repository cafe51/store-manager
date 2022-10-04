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
  // console.log('AAAAAAAAA', insertId);
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

// const arrayOfObjects = [
//   { productId: 1, quantity: 2 },
//   { productId: 2, quantity: 3 },
//   { productId: 3, quantity: 4 },
// ];

// const newArrayOfObjectsWithNewProperty = arrayOfObjects.map((product, index) => {
//   const newProduct = product;
//   newProduct.salesId = index;
//   return product;
// });

// console.log(newArrayOfObjectsWithNewProperty);

// const arraydeprodutos = [
//     { productId: 1, quantity: 2 },
//     { productId: 2, quantity: 3 },
//     { productId: 3, quantity: 4 },
// ];

// const novoarray = arraydeprodutos.push({ productId: 1, quantity: 2 });

// const arraydeprodutos = [
//   1,
//   2,
//   3,
// ];

// const novoarray = arraydeprodutos.map((x) => x + 1);
  
// console.log('ANTIGO ARRAY', arraydeprodutos, 'NOVO ARRAY', novoarray);