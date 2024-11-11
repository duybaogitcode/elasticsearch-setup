import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Product } from '../products/interfaces/product.interface';

@Injectable()
export class ProductsService {
  private readonly index = 'products';

  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async createProduct(product: Product) {
    return await this.elasticsearchService.index({
      index: this.index,
      document: product,
    });
  }

  async searchProducts(text: string) {
    const { hits } = await this.elasticsearchService.search({
      index: this.index,
      query: {
        multi_match: {
          query: text,
          fields: ['name', 'description'],
        },
      },
    });
    
    return hits.hits.map(hit => hit._source);
  }
} 