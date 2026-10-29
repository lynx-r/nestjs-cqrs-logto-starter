import { BaseEntity } from '#/common/entities/base-entity.entity.js';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { PollEntity } from './poll.entity.js';
import { VoteEntity } from './vote.entity.js';

@Entity('poll_options')
export class PollOptionEntity extends BaseEntity {
  @Column()
  answer: string;

  @ManyToOne(() => PollEntity, (poll) => poll.options, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'pollId' })
  poll: PollEntity | null;

  @Column()
  pollId: string;

  @OneToMany(() => VoteEntity, (vote) => vote.option)
  votes: VoteEntity[];
}
