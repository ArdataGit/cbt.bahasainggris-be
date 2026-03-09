import * as authService from './auth.service.js';

export const register = async (req, res) => {
  try {
    const { name, email, password, phone, provinceId, provinceName, cityId, cityName, address, role } = req.body;
    const user = await authService.register(name, email, password, phone, provinceId, provinceName, cityId, cityName, address, role);
    res.status(201).json({
      message: 'User registered successfully',
      data: user,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await authService.login(email, password);
    res.status(200).json({
      message: 'Login successful',
      data: { user, token },
    });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
