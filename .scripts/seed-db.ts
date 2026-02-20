import { logger } from '../helpers/logger';

async function seedDatabase() {
  logger.info('Seeding database...');
  // TODO: Add seed logic for test data
  logger.info('Database seeded successfully.');
}

seedDatabase().catch((err) => {
  logger.error(`Seed failed: ${err.message}`);
  process.exit(1);
});
