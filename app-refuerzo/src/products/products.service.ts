import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { v4 as UuidV4 } from 'uuid';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  create(createProductDto: CreateProductDto) {
    const { name, description, price } = createProductDto;
    const newProduct = new Product(UuidV4(), name, description, price);

    this.products.push(newProduct);

    return newProduct;
  }

  findAll() {
    return this.products;
  }

  findOne(id: string): Product {
    const result = this.products.find((product) => product.id == id);

    if (!result) throw new NotFoundException();

    return result;
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    const { id: __, ...properties } = updateProductDto;
    const existProduct = this.findOne(id);
    existProduct.updateWith({ ...properties });
    return existProduct;
  }

  remove(id: string) {
    const existProduct = this.findOne(id);
    this.products = this.products.filter((product) => product.id !== id);
    return existProduct;
  }
}
