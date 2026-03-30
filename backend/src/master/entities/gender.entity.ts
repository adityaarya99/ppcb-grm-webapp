import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('genders')
export class Gender {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  name: string;

  @Column({ default: true })
  status: boolean;
}