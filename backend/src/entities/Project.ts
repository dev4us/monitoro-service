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
  JoinTable,
  BeforeInsert
} from "typeorm";

import hat from "hat";

import User from "./User";
import Message from "./Message";
import Tag from "./Tag";

@Entity()
class Project extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  thumbnail: string;

  @ManyToMany(type => User, user => user.innerProjects)
  @JoinTable()
  participants: User[];

  @ManyToOne(type => User, user => user.manages)
  admin: User;

  @OneToMany(type => Message, message => message.project)
  messages: Message[];

  @OneToMany(type => Tag, tag => tag.project)
  tags: Tag[];

  @Column({ nullable: false })
  apiKey: string;

  @CreateDateColumn() createdAt: string;
  @UpdateDateColumn() updatedAt: string;

  @BeforeInsert()
  async GenerateAPIKey(): Promise<void> {
    this.apiKey = hat();
  }
}

export default Project;
