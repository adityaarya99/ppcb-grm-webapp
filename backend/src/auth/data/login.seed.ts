import * as bcrypt from 'bcrypt';

export const LOGIN_SEED = async () => {
  const saltRounds = 10;

  return [
    {
      user_id: 1,
      username: 'admin',
      password: await bcrypt.hash('admin1234', saltRounds),
      role_id: 1,
      is_logged_in: false,
      last_login_at: undefined,
      session_expiry: undefined,
      status: true,
    },
    {
      user_id: 2,
      username: 'officer',
      password: await bcrypt.hash('officer1234', saltRounds),
      role_id: 2,
      is_logged_in: false,
      last_login_at: undefined,
      session_expiry: undefined,
      status: true,
    },
  ];
};