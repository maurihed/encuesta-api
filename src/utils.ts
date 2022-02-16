import { User } from "./entity/User.entity";

export const getSafeUserObject = (user: User) => ({
  id: user.id,
  firstName: user.firstName,
  lastName: user.lastName,
  role: user.role,
});

export const createBypass = <T>(Controller: T) => {
  const controller = new (Controller as any)();
  return {
    getAll: (...args: [any, any, any]) => {
      controller.getAll(...args);
    },
    createOne: (...args: [any, any, any]) => {
      controller.createOne(...args);
    },
    getOne: (...args: [any, any, any]) => {
      controller.getOne(...args);
    },
    updateOne: (...args: [any, any, any]) => {
      controller.updateOne(...args);
    },
    deleteOne: (...args: [any, any, any]) => {
      controller.deleteOne(...args);
    },
    findByParam: (...args: [any, any, any, any]) => {
      controller.findByParam(...args);
    },
  }
};
