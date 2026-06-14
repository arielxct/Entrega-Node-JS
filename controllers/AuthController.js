import jwt from 'jsonwebtoken';

export const login = (req, res) => {
  console.log('BODY:', req.body);

  const { email, password } = req.body;

  console.log('EMAIL:', email);
  console.log('PASSWORD:', password);
  console.log('JWT_SECRET:', process.env.JWT_SECRET);

  if (
    email === 'campostula@gmail.com' &&
    password === 'MiPostHombre26'
  ) {

    try {

      const token = jwt.sign(
        { email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      return res.json({
        ok: true,
        token
      });

    } catch (error) {

      console.error('ERROR JWT:', error);

      return res.status(500).json({
        message: error.message
      });

    }

  } else {

    return res.status(401).json({
      message: 'Credenciales inválidas',
      emailRecibido: email
    });

  }
};