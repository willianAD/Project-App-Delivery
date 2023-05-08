const sales = [
  {
    "id": 1,
    "userId": 1,
    "sellerId": 1,
    "totalPrice": "1000.00",
    "deliveryAddress": "rua numero dois",
    "deliveryNumber": "1000",
    "saleDate": "2023-05-04T21:12:39.000Z",
    "status": "concluido"
  },
  {
    "id": 2,
    "userId": 1,
    "sellerId": 1,
    "totalPrice": "1000.00",
    "deliveryAddress": "rua numero dois",
    "deliveryNumber": "1000",
    "saleDate": "2023-05-08T20:24:26.000Z",
    "status": "concluido"
  },
  {
    "id": 3,
    "userId": 2,
    "sellerId": 1,
    "totalPrice": "780.00",
    "deliveryAddress": "rua numero tres",
    "deliveryNumber": "5880",
    "saleDate": "2023-05-08T20:24:26.000Z",
    "status": "pendente"
  },
  {
    "id": 4,
    "userId": 1,
    "sellerId": 2,
    "totalPrice": "1000.00",
    "deliveryAddress": "rua numero dois",
    "deliveryNumber": "1000",
    "saleDate": "2023-05-08T20:24:59.000Z",
    "status": "concluido"
  },
  {
    "id": 5,
    "userId": 2,
    "sellerId": 2,
    "totalPrice": "780.00",
    "deliveryAddress": "rua numero tres",
    "deliveryNumber": "5880",
    "saleDate": "2023-05-08T20:24:59.000Z",
    "status": "pendente"
  }
];

const salesId1 = [
  {
    "id": 1,
    "userId": 1,
    "sellerId": 1,
    "totalPrice": "1000.00",
    "deliveryAddress": "rua numero dois",
    "deliveryNumber": "1000",
    "saleDate": "2023-05-04T21:12:39.000Z",
    "status": "concluido"
  },
  {
    "id": 2,
    "userId": 1,
    "sellerId": 1,
    "totalPrice": "1000.00",
    "deliveryAddress": "rua numero dois",
    "deliveryNumber": "1000",
    "saleDate": "2023-05-08T20:24:26.000Z",
    "status": "concluido"
  },
  {
    "id": 3,
    "userId": 2,
    "sellerId": 1,
    "totalPrice": "780.00",
    "deliveryAddress": "rua numero tres",
    "deliveryNumber": "5880",
    "saleDate": "2023-05-08T20:24:26.000Z",
    "status": "pendente"
  },
];

const newSaleRequest = {
  "userId": 2,
  "sellerId": 3,
  "totalPrice": "780.00",
  "deliveryAddress": "rua numero dois",
  "deliveryNumber": "5880",
  "saleDate": "2023-05-08T20:24:26.000Z",
  "status": "pendente"
};

const newSaleResponse = {
  "id": 1,
  "userId": 2,
  "sellerId": 3,
  "totalPrice": "780.00",
  "deliveryAddress": "rua numero dois",
  "deliveryNumber": "5880",
  "saleDate": "2023-05-08T20:24:26.000Z",
  "status": "pendente"
};

const salesDetails = [
  {
    id: 1,
    userId: 1,
    sellerId: 1,
    totalPrice: '1000.00',
    deliveryAddress: 'rua numero dois',
    deliveryNumber: '1000',
    saleDate: '2023-05-04T21:12:39.000Z',
    status: 'concluido',
    products: [
      {
        id: 1,
        name: 'Skol Lata 250ml',
        price: '2.20',
        urlImage: 'http://localhost:3001/images/skol_lata_350ml.jpg',
        SalesProduct: {
          productId: 1,
          saleId: 1,
          quantity: 1,
        },
      },
      {
        id: 2,
        name: 'Heineken 600ml',
        price: '7.50',
        urlImage: 'http://localhost:3001/images/heineken_600ml.jpg',
        SalesProduct: {
          productId: 2,
          saleId: 1,
          quantity: 8,
        },
      },
    ],
  },
];

module.exports = {
  sales,
  salesId1,
  newSaleRequest,
  newSaleResponse,
  salesDetails,
};
