import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  ManyToMany,
  Column,
  JoinTable
} from "typeorm";

import User from "./User";
import Message from "./Message";
import Tag from "./Tag";

@Entity()
class Project extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column({ nullable: false })
  name: string;

  @ManyToMany(type => User, user => user.innerProjects)
  @JoinTable()
  participants: User[];

  @ManyToOne(type => User, user => user.manages)
  admin: User;

  @OneToMany(type => Message, message => message.project)
  messages: Message[];

  @OneToMany(type => Tag, tag => tag.projects)
  tags: Tag[];

  @CreateDateColumn() createdAt: string;
  @UpdateDateColumn() updatedAt: string;
}

export default Project;
