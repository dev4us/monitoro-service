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

import Project from "./Project";
import Tag from "./Tag";

@Entity()
class Message extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column({ nullable: true })
  level: string;

  @Column({ nullable: false })
  contents: string;

  @Column({ nullable: false })
  fileName: string;

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
