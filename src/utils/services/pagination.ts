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
    { page = 1, perPage = 10, options = {} }: IPaginationOptions = {
      page: 1,
      perPage: 10,
      options: {},
    },
  ): Promise<IPaginationResponse<I>> {
    const optionParams = Object.assign({}, options);
    const countOptions = Object.keys(optionParams).reduce((acc, key) => {
      if (!['order', 'attributes', 'include'].includes(key)) {
        acc[key] = optionParams[key];
      }
      return acc;
    }, {});

    optionParams.limit = perPage;
    optionParams.offset = perPage * (page - 1);

    if (optionParams.limit) {
      console.warn(`(sequelize-pagination) Warning: limit option is ignored.`);
    }
    if (optionParams.offset) {
      console.warn(`(sequelize-pagination) Warning: offset option is ignored.`);
    }

    if (optionParams.order) optionParams.order = options.order;

    const [count, rows] = await Promise.all([
      this.count(countOptions),
      this.findAll(optionParams),
    ]);

    const total = optionParams.group !== undefined ? count['length'] : count;
    const data = rows as unknown as I[];
    const totalPage = Math.ceil(total / perPage);

    return {
      data: data,
      meta: {
        page: page,
        perPage: perPage,
        total: total,
        totalPage: totalPage,
      },
    };
  }
}
