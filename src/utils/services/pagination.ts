import { Model } from 'sequelize-typescript';
import { FindOptions } from 'sequelize/types';

interface IPaginationOptions {
  page?: number;
  perPage?: number;
  options: FindOptions;
}

export interface IPaginationMeta {
  page: number;
  perPage: number;
  total?: number;
  totalPage?: number;
}

export interface IPaginationResponse<I> {
  data: I[];
  meta: IPaginationMeta;
}

export class PaginationModel extends Model {
  static async paginate<T extends typeof PaginationModel, I = InstanceType<T>>(
    this: T,
    { page = 1, perPage = 10, options = {} }: IPaginationOptions,
  ): Promise<IPaginationResponse<I>> {
    options.limit = perPage;
    options.offset = perPage * (page - 1);

    const { count, rows } = await this.findAndCountAll(options);
    const data = rows as unknown as I[];
    const totalPage = Math.ceil(count / perPage);

    return {
      data: data,
      meta: {
        page: page,
        perPage: perPage,
        total: count,
        totalPage: totalPage,
      },
    };
  }
}
