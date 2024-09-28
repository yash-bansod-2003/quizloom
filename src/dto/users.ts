export class CreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  restaurantId: number;
}

export class UpdateUserDto {
  firstName: string;
  lastName: string;
  age: number;
  restaurantId: number;
}
