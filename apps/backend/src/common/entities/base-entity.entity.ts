import { CreateDateColumn, PrimaryColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseEntity {
  // Используем @PrimaryColumn, так как ID генерируется на стороне приложения
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @CreateDateColumn({
    type: 'timestamptz',
    // нужно для поиска следующего контакта. В JS передается время с точностью до 3 знаков
    // PostgreSQL сохраняет с точностью до 6 знаков. Поэтому возникает неравенство
    precision: 3,
    // default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    precision: 3,
    // default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  // @DeleteDateColumn({
  //   type: 'timestamptz',
  //   precision: 3,
  //   nullable: true,
  // })
  // deletedAt?: Date | null;
}
