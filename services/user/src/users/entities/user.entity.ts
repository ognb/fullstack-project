import { ObjectType, Field, ID, Directive } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
@ObjectType()
@Directive('@key(fields: "id")')
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({ unique: true })
  @Field()
  email: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  username?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  firstName?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  lastName?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  displayName?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  avatar?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  phoneNumber?: string;

  @Column({ default: 'user' })
  @Field()
  role: string;

  @Column({ default: 'active' })
  @Field()
  status: string;

  @Column({ default: false })
  @Field()
  emailVerified: boolean;

  @Column({ default: false })
  @Field()
  phoneVerified: boolean;

  @Column({ default: 0 })
  @Field()
  loginCount: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  lastLoginAt?: Date;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;
}
