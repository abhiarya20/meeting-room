import UserModel from "../models/user-model";
class UserService {
  async findUser(filter) {
    const user = await UserModel.findOne(filter);
    return user;
  }

  async createUser(data) {
    const user = await UserModel.create(data);
    return user;
  }

  async updateUser(id, data) {
    const updatedUser = await UserModel.findByIdAndUpdate(id, data, { new: true });
    return updatedUser;
  }
}

export default new UserService();
