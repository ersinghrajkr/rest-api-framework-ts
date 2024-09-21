// # Utility functions for Kafka interaction
// src/services/kafkaService.ts
import { Kafka } from 'kafkajs';
import { config } from '../config/env';

const kafka = new Kafka({ brokers: [config.kafkaBroker] });

export const produceMessage = async (topic: string, message: string) => {
  const producer = kafka.producer();
  await producer.connect();
  await producer.send({
    topic,
    messages: [{ value: message }],
  });
  await producer.disconnect();
};

export const consumeMessages = async (topic: string, callback: (message: string) => void) => {
  const consumer = kafka.consumer({ groupId: 'test-group' });
  await consumer.connect();
  await consumer.subscribe({ topic });
  await consumer.run({
    eachMessage: async ({ message }) => {
      callback(message.value.toString());
    },
  });
};
