import { Request, Response } from 'express';
import { IUser } from '../intefaces/IUser';
import { generateToken } from '../authToken';
import { User } from '../models/User';

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Verificar se o email e senha estão presentes na requisição
    if (!email || !password) {
      return res.status(400).json({ error: 'Email e senha são obrigatórios' });
    }

    // Buscar o usuário no banco de dados com base no email
    const user: IUser | null = await User.findOne({
      where: { email },
    });

    // Verificar se o usuário existe e se a senha está correta
    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Email ou senha incorretos' });
    }

    // Gerar um token JWT e enviar na resposta
    const token = generateToken({ email: user.email, role: user.role });
    return res.json({ token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro ao fazer login' });
  }
};