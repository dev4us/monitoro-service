import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable
} from "typeorm";

import Project from "./Project";

@Entity()
class User extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column({ nullable: false })
  userEmail: string;

  @Column({ nullable: false })
  userName: string;

  @Column({ nullable: true })
  profileImage: string;

  @ManyToMany(type => Project, project => project.participants)
  @JoinTable()
  innerProjects: Project[];

  @OneToMany(type => Project, project => project.admin)
  manages: Project[];

  @CreateDateColumn() createdAt: string;
  @UpdateDateColumn() updatedAt: string;
}

export default User;
