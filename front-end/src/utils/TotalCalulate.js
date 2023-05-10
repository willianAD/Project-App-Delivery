const totalCalculate = (products) => products
  .map((product) => Number(product.price) * Number(product.SalesProduct.quantity))
  .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

export default totalCalculate;
