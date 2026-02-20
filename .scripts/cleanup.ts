import { logger } from '../helpers/logger';

async function cleanup() {
  logger.info('Running cleanup...');
  // TODO: Add cleanup logic for test data
  logger.info('Cleanup completed.');
}

cleanup().catch((err) => {
  logger.error(`Cleanup failed: ${err.message}`);
  process.exit(1);
});
