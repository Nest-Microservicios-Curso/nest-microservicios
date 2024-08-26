import {
  Injectable,
  Logger,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaClient } from '@prisma/client';
import { PaginationDto } from 'src/common';

@Injectable()
export class ProductsService extends PrismaClient implements OnModuleInit {
  private logger = new Logger('ProductsService');
  onModuleInit() {
    this.$connect();
    this.logger.verbose('Database connected!');
  }
  async create(createProductDto: CreateProductDto) {
    return await this.product.create({ data: createProductDto });
  }

  async findAll(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    const totalProducts = await this.product.count({
      where: { available: true },
    });
    const lastPage = Math.ceil(totalProducts / limit);
    return {
      data: await this.product.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: { available: true },
      }),
      meta: {
        totalProducts,
        lastPage,
        actualPage: page,
      },
    };
  }

  async findOne(id: number) {
    const product = await this.product.findFirst({
      where: { id, available: true },
    });
    if (!product) throw new NotFoundException(`Product(id:${id}) not found.`);
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    await this.findOne(id);
    return await this.product.update({ where: { id }, data: updateProductDto });
  }

  //!! NOT RECOMMENDED: HARD DELETE
  // async remove(id: number) {
  //   await this.findOne(id);
  //   return await this.product.delete({ where: { id } });
  // }

  // * RECOMMENDED: SOFT DELETE
  async remove(id: number) {
    await this.findOne(id);

    const product = await this.product.update({
      where: { id },
      data: {
        available: false,
      },
    });

    return product;
  }
}
