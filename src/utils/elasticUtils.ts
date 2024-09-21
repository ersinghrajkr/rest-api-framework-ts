// # Utility functions for Elasticsearch interaction
// src/services/elasticService.ts
import { Client } from '@elastic/elasticsearch';
import { config } from '../config/env';

const client = new Client({ node: config.elasticUrl });

export const searchDocument = async (index: string, query: any) => {
  return client.search({
    index,
    body: query,
  });
};
