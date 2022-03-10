import { User } from "../../models/User";

const usersView = {
  render(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      data_created: user.created_at
    };
  },

  renderMany(users: User[]) {
    return users.map(user => this.render(user));
  }
}

export { usersView };