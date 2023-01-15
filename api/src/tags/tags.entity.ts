import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tags')
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 2 })
  lang: string;
}
