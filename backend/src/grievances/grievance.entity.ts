import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('grievances')
export class Grievance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  grievance_no: string;

  @Column({ length: 20, default: 'public' })
  form_type: string;

  @Column({ length: 255, nullable: true })
  source_of_complaint: string;

  @Column({ length: 255, nullable: true })
  pollution_types: string;

  @Column({ length: 255 })
  complaint_subject: string;

  @Column({ length: 255, nullable: true })
  board_reference_no: string;

  @Column({ type: 'date', nullable: true })
  date_of_receipt: string;

  @Column({ length: 50 })
  filed_by_type: string;

  @Column({ length: 255, nullable: true })
  complainant_name: string;

  @Column({ type: 'text', nullable: true })
  complainant_address: string;

  @Column({ nullable: true })
  complainant_district_id: number;

  @Column({ length: 10, nullable: true })
  complainant_pincode: string;

  @Column({ length: 20, nullable: true })
  complainant_contact_no: string;

  @Column({ length: 255, nullable: true })
  complainant_occupation: string;

  @Column({ length: 255, nullable: true })
  group_type: string;

  @Column({ length: 255, nullable: true })
  group_nodal_name: string;

  @Column({ length: 20, nullable: true })
  group_nodal_contact_no: string;

  @Column({ type: 'text', nullable: true })
  group_address: string;

  @Column({ length: 255, nullable: true })
  industry_name: string;

  @Column({ type: 'text' })
  site_address: string;

  @Column()
  site_district_id: number;

  @Column({ length: 10 })
  site_pincode: string;

  @Column({ type: 'text', nullable: true })
  complaint_details: string;

  @Column({ type: 'text', nullable: true })
  media_file?: string;

  @Column({ length: 50, default: 'Submitted' })
  status: string;

  @CreateDateColumn()
  created_at: Date;
}