import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateUserDTO {
  @IsString({message: 'Name must be a string'})
  @IsNotEmpty({message: 'Name is required'})
  name: string;

  @IsEmail({}, {message: 'Invalid email'})
  @IsString({message: 'Email must be a string'})
  @IsNotEmpty({message: 'Email is required'})
  email: string;

  @MinLength(6, {message: 'Password must be at least 6 characters'})
  @IsNotEmpty({message: 'Password is required'})
  password: string;
  role: string;
  isActive: boolean;
  createdDate: Date;
  updatedDate: Date;
}