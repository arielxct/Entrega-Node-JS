import jwt from 'jsonwebtoken';

export const login = (req, res) => {

  const { email, password } = req.body;

  if (
    email === 'campostula@gmail.com' &&
    password === 'MiPostHombre26'
  ) {

    const token = jwt.sign(
      { email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res.json({
      token
    });
  }

  return res.status(401).json({
    message: 'Credenciales inválidas'
  });
};