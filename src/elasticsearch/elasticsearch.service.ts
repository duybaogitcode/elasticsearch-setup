import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class SearchService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  // Index một document
  async indexDocument(index: string, document: any) {
    return this.elasticsearchService.index({
      index,
      document,
    });
  }

  // Tìm kiếm
  async search(index: string, query: any) {
    const result = await this.elasticsearchService.search({
      index,
      query,
    });
    return result.hits.hits;
  }

  // Xóa document
  async remove(index: string, id: string) {
    return this.elasticsearchService.delete({
      index,
      id,
    });
  }
} 