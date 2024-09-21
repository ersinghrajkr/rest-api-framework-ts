// # Environment variable management
import dotenv from 'dotenv';
dotenv.config();

export const config = {
    apiUrl: process.env.API_URL || 'https://reqres.in',
    dbUrl: process.env.DB_URL || 'mongodb://localhost:27017/testdb',
    kafkaBroker: process.env.KAFKA_BROKER || 'localhost:9092',
    elasticUrl: process.env.ELASTIC_URL || 'http://localhost:9200',
  };