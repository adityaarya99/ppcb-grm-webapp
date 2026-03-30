import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('districts')
export class District {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  name: string;

  @Column({ length: 20, nullable: true })
  lgd_code: string;

  @Column()
  state_id: number;

  @Column({ default: true })
  status: boolean;
}