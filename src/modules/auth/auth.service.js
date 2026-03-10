import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-key';

export const register = async (name, email, password, phone = null, provinceId = null, provinceName = null, cityId = null, cityName = null, address = null, role = 'user') => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      phone,
      provinceId,
      provinceName,
      cityId,
      cityName,
      address,
      role,
    },
  });
};

export const login = async (email, password) => {
  const user = await prisma.user.findFirst({
    where: { email },
  });

  if (!user) {
    throw new Error('User not found');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid password');
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: '1d' }
  );

  return { user, token };
};

export const getUserProfile = async (userId) => {
  return await prisma.user.findUnique({
    where: { id: parseInt(userId) },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      provinceId: true,
      provinceName: true,
      cityId: true,
      cityName: true,
      address: true,
      role: true
    }
  });
};
