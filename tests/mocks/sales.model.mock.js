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
  },
  {
    "id": 3,
    "date": "2022-10-04T21:27:02.000Z"
  }
]


module.exports = {
  newSaleMock,
  saleResponseControllerMock,
  salesListMock,
};