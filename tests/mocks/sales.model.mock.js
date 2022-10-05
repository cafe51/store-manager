const newSaleMock = [
  {
    "productId": 1,
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 5
  }
]

const newSaleMockMissingProductIdInTheBank = [
  {
    "productId": 1,
    "quantity": 1
  },
  {
    "productId": 42,
    "quantity": 5
  }
]


const newSaleMockMissingProductIdPropertie = [
  {
    "productIdO": 1,
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 5
  }
]

const newSaleMockMissingQuantityPropertie = [
  {
    "productId": 1,
    "quantities": 1
  },
  {
    "productId": 2,
    "quantity": 5
  }
]

const newSaleMockWrongQuantity = [
  {
    "productId": 1,
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 0
  }
]

const saleResponseControllerMock = {
  "id": 3,
  "itemsSold": [
    {
      "productId": 1,
      "quantity": 1
    },
    {
      "productId": 2,
      "quantity": 5
    }
  ]
}

const salesListMock = [
  {
    "id": 1,
    "date": "2022-10-04T21:27:02.000Z"
  },
  {
    "id": 2,
    "date": "2022-10-04T21:27:02.000Z"
  }
]

const responseOfGetSalesByIdMock = [
  {
    "date": "2022-10-05T06:09:21.000Z",
    "productId": 1,
    "quantity": 5
  },
  {
    "date": "2022-10-05T06:09:21.000Z",
    "productId": 2,
    "quantity": 10
  }
]

const responseOfGetAllSalesWithProductsMock = [
  {
    "saleId": 1,
    "date": "2022-10-05T06:09:21.000Z",
    "productId": 1,
    "quantity": 5
  },
  {
    "saleId": 1,
    "date": "2022-10-05T06:09:21.000Z",
    "productId": 2,
    "quantity": 10
  },
  {
    "saleId": 2,
    "date": "2022-10-05T06:09:21.000Z",
    "productId": 3,
    "quantity": 15
  }
]


module.exports = {
  newSaleMock,
  saleResponseControllerMock,
  salesListMock,
  newSaleMockMissingProductIdInTheBank,
  newSaleMockMissingProductIdPropertie,
  newSaleMockMissingQuantityPropertie,
  newSaleMockWrongQuantity,
  responseOfGetAllSalesWithProductsMock,
  responseOfGetSalesByIdMock,
};