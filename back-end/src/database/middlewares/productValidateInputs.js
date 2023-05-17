const validateInputs = (req, res, next) => {
  const { name, price, urlImage } = req.body;

  if (!name || !price || !urlImage) {
    return res.status(400).json({ message: 'Some required fields are missing!' });
  }

  if (name.length < 3) {
    return res.status(400).json({ message: 'Name must be more than 3 characters.' })
  }

  if (price.length < 3) {
    return res.status(400).json({ message: 'Price must be more than 3 characters.' })
  }

  return next();
}

module.exports = {
  validateInputs,
};
