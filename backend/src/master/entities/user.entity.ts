import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'; 

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  mobile: string;

  @Column()
  email: string;


  @Column()
  role_id: number;

  @Column({ default: true })
  status: boolean;
}