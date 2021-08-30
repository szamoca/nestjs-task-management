import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { hash } from 'bcrypt';
import { Task } from '../tasks/task.entity';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  // When eager is set to true, whenever we retrieve the user as an object, we can access user.tasks immediately and get an array of tasks of the same user (only one side of the relationship can be eager)
  @OneToMany(type => Task, task => task.user, { eager: true })
  tasks: Task[];

  // We are testing with the same hashing method and the user's salt database value
  async validatePassword(password: string): Promise<boolean> {
    const requestHash = await hash(password, this.salt);
    return requestHash === this.password;
  }
}
