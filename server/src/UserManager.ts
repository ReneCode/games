export class User {
  id: string;
  name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}

export class UserManager {
  users: Map<string, User> = new Map();

  getUsers() {
    return Array.from(this.users.values());
  }

  addUser(id: string, name: string) {
    this.users.set(id, new User(id, name));
  }

  removeUser(id: string) {
    this.users.delete(id);
  }

  setUserName(id: string, name: string) {
    const user = this.users.get(id);
    if (user) {
      user.name = name;
    }
  }
}
