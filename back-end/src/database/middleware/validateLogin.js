const verificaLogin = async (req, res, next) => {
  // const { email, password } = req.body;
  // if (!email || !password) {
  //   return res.status(404).json({ message: 'Not found' });
  // }
  // if (password.length < 6) {
  //   return res.status(401).json({ message: 'Invalid email or password' });
  // }
  // const regex = /\S+@\S+\.\S+/;
  // if (!regex.test(email)) {
  //   return res.status(401).json({ message: 'Invalid email or password' });
  // }
  // const user = await User.findOne({ where: { email } });
  // if (!user) {
  //   return res.status(401).json({ message: 'Invalid email or password' });
  // }
  // if (user.password !== password) {
  //   return res.status(401).json({ message: 'Invalid email or password' });
  // }
  // next();
};

export default {
  verificaLogin,
};