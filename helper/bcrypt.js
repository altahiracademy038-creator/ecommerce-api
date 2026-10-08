import bcrypt from "bcryptjs";

export function hash_password(params) {
  return bcrypt.hashSync(params);
}

export function compare_password(real_password,hash_password) {
  return bcrypt.compareSync(real_password,hash_password);
}