import { Column, Table } from 'sequelize-typescript';
import { PaginationModel } from 'src/utils/services/pagination';

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
}
