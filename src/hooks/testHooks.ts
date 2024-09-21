// # Global test hooks for beforeEach and afterEach
// src/hooks/testHooks.ts
import { connectDb, disconnectDb } from '../services/mongodbService';
// import { produceMessage, consumeMessages } from '../services/kafkaService';

export const setupTestHooks = () => {
  before(async () => {
    // await connectDb();
    // await produceMessage('test-topic', 'Starting Tests');
  });

  after(async () => {
    // await disconnectDb();
    // await produceMessage('test-topic', 'Tests Finished');
  });

  afterEach(async function () {
    // Capture logs or any other post-test logic here
    // if (this.currentTest.state === 'failed') {
    //   console.error(`Test failed: ${this.currentTest.title}`);
    // }
  });
};
