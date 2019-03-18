import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  Column,
  ManyToMany,
  JoinTable
} from "typeorm";

import { levelOption } from "src/types/types";
import Project from "./Project";
import Tag from "./Tag";

@Entity()
class Message extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column({ nullable: true, enum: ["NOTICE", "WARNING", "DEBUG", "DANGER"] })
  level: levelOption;

  @Column({ nullable: false })
  contents: string;

  @Column({ nullable: true })
  location: string;

  @ManyToOne(type => Project, project => project.messages)
  project: Project;

  @Column()
  projectId: number;

  @ManyToMany(type => Tag, tag => tag.messages)
  @JoinTable({
    joinColumns: [{ name: "message_id" }],
    inverseJoinColumns: [{ name: "tag_id" }]
  })
  tags: Tag[];

  @CreateDateColumn() createdAt: string;
}

export default Message;
