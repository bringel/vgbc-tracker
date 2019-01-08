//@flow
export type User = {
  userID: string,
  displayName: string,
  email: string,
  role: 'user' | 'admin'
};
