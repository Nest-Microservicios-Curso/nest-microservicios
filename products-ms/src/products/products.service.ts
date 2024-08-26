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
    const totalProducts = await this.product.count();
    const lastPage = Math.ceil(totalProducts / limit);
    return {
      data: await this.product.findMany({
        skip: (page - 1) * limit,
        take: limit,
      }),
      meta: {
        totalProducts,
        lastPage,
        actualPage: page,
      },
    };
  }

  async findOne(id: number) {
    const product = await this.product.findFirst({ where: { id } });
    if (!product) throw new NotFoundException(`Product(id:${id}) not found.`);
    return product;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
