import { Injectable } from "@nestjs/common";

@Injectable()
export class UserRepository {
  private users = [];

  async save(users) {
    this.users.push(users);
    return users;
  }

  async getAll() {
    return this.users;
  }
}