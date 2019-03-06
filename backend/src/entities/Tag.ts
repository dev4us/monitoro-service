import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Column,
  ManyToMany
} from "typeorm";

import Project from "./Project";
import Message from "./Message";

@Entity()
class Tag extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  color: string;

  @ManyToOne(type => Project, project => project.tags)
  project: Project;

  @ManyToMany(type => Message, message => message.tags)
  messages: Message[];

  @CreateDateColumn() createdAt: string;
  @UpdateDateColumn() updatedAt: string;
}

export default Tag;
