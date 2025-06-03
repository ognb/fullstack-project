import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.dto';
import { UpdateUserInput } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserInput: CreateUserInput): Promise<User> {
    const user = await this.prisma.user.create({
      data: {
        email: createUserInput.email,
        username: createUserInput.username,
        firstName: createUserInput.firstName,
        lastName: createUserInput.lastName,
        phoneNumber: createUserInput.phoneNumber,
        role: createUserInput.role || 'user',
      },
    });

    return user as User;
  }

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return users as User[];
  }

  async findOne(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user as User;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    return user as User | null;
  }

  async update(updateUserInput: UpdateUserInput): Promise<User> {
    const { id, ...updateData } = updateUserInput;

    try {
      const user = await this.prisma.user.update({
        where: { id },
        data: updateData,
      });

      return user as User;
    } catch (error) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }

  async remove(id: string): Promise<boolean> {
    try {
      await this.prisma.user.delete({
        where: { id },
      });
      return true;
    } catch (error) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }
}
