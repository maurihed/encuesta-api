import { User } from "./entity/User";

export const getSafeUserObject = (user: User) => ({
  id: user.id,
  firstName: user.firstName,
  lastName: user.lastName,
  role: user.role,
});
