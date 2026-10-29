import { BaseEntity } from '#/common/entities/base-entity.entity.js';
import { PollStatus } from '#/types/poll.enums.js';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { PollOptionEntity } from './poll-option.entity.js';
import { UserEntity } from './user.entity.js';
import { VoteEntity } from './vote.entity.js';

@Entity('polls')
export class PollEntity extends BaseEntity {
  @Column()
  question: string;

  @Column({
    type: 'enum',
    enum: PollStatus,
    default: PollStatus.OPEN,
  })
  status: PollStatus;

  @OneToMany(() => PollOptionEntity, (option) => option.poll, { cascade: true })
  options: PollOptionEntity[];

  @OneToMany(() => VoteEntity, (vote) => vote.poll)
  votes: VoteEntity[];

  @ManyToOne(() => UserEntity, (author) => author.polls)
  @JoinColumn({ name: 'authorId' })
  author: UserEntity | null;

  @Column()
  authorId: string;

  @Column({ type: 'timestamptz' })
  expiresAt: Date;
}
