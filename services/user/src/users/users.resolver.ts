import {
  Resolver,
  Query,
  Mutation,
  Args,
  ID,
  ResolveReference,
} from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.dto';
import { UpdateUserInput } from './dto/update-user.dto';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput
  ): Promise<User> {
    return this.usersService.create(createUserInput);
  }

  @Query(() => [User], { name: 'users' })
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'user' })
  async findOne(@Args('id', { type: () => ID }) id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Query(() => User, { name: 'userByEmail', nullable: true })
  async findByEmail(@Args('email') email: string): Promise<User | null> {
    return this.usersService.findByEmail(email);
  }

  @Mutation(() => User)
  async updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput
  ): Promise<User> {
    return this.usersService.update(updateUserInput);
  }

  @Mutation(() => Boolean)
  async removeUser(
    @Args('id', { type: () => ID }) id: string
  ): Promise<boolean> {
    return this.usersService.remove(id);
  }

  // Federation: Resolve user by ID from other services
  @ResolveReference()
  async resolveReference(reference: {
    __typename: string;
    id: string;
  }): Promise<User> {
    return this.usersService.findOne(reference.id);
  }
}
