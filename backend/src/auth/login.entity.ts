
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('logins')
export class Login {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number; // FK → users.id

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  role_id: number; 

  @Column({ default: false })
  is_logged_in: boolean;

  @Column({ type: 'timestamp', nullable: true })
  last_login_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  session_expiry: Date;

  @Column({ default: true })
  status: boolean;
}