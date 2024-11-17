import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserRepository } from "./user.repository";

@Controller('/users')
export class UserController {
  constructor(private UserRepository: UserRepository) {}

  @Post()
  async create(@Body() data) {
    this.UserRepository.save(data);
    return data;
  }

  @Get()
  async getAll() {
    return this.UserRepository.getAll();
  }
}