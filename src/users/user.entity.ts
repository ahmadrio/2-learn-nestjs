import {
  BeforeCreate,
  BeforeUpdate,
  Column,
  Table,
} from 'sequelize-typescript';
import { PaginationModel } from 'src/utils/services/pagination';
import * as bcrypt from 'bcrypt';

@Table({
  tableName: 'users',
  timestamps: true,
})
export class User extends PaginationModel {
  @Column
  name: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column
  password: string;

  @BeforeUpdate
  @BeforeCreate
  static async updateOrCreatePassword(instance: User): Promise<void> {
    instance.password = await bcrypt.hash(instance.password, 10);
  }
}
