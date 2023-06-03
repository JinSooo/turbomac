import * as argon2 from 'argon2';

// 加密密码
export const encrypt = async (password: string) => {
  return await argon2.hash(password);
};

// 验证密码
export const verify = async (hash: string, password: string) => {
  return await argon2.verify(hash, password);
};
