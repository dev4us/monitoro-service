import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  Column
} from "typeorm";

import Project from "./Project";
import Message from "./Message";

@Entity()
class Tag extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column({ nullable: false })
  name: string;

  @ManyToMany(type => Message, message => message.tags)
  messages: Message[];

  @Column({ nullable: true })
  color: string;

  @ManyToOne(type => Project, project => project.tags)
  projects: Project;

  @CreateDateColumn() createdAt: string;
  @UpdateDateColumn() updatedAt: string;
}

export default Tag;
