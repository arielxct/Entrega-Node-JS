import jwt from 'jsonwebtoken';

export const login = (req, res) => {
  const { email, password } = req.body;

  // Ejemplo simple: credenciales fijas
  if (email === 'campostula@gmail.com' && password === 'MiPostHombre26') {
    const token = jwt.sign(
      { email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Credenciales inválidas' });
  }
};
