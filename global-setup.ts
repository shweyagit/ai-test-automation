const BASE_URL = process.env.BASE_URL || 'https://shop-pulse-9.preview.emergentagent.com';
const MAX_RETRIES = 10;
const RETRY_DELAY_MS = 10_000; // 10 seconds between retries

async function wakeServer(): Promise<void> {
  console.log(`\n🔄 Waking up server at ${BASE_URL}...`);

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const response = await fetch(`${BASE_URL}/api/products`, {
        signal: AbortSignal.timeout(30_000),
      });

      if (response.ok) {
        console.log(`✅ Server is awake! (attempt ${attempt}, status ${response.status})`);
        return;
      }

      console.log(`⏳ Attempt ${attempt}/${MAX_RETRIES}: status ${response.status}, retrying in ${RETRY_DELAY_MS / 1000}s...`);
    } catch (error) {
      console.log(`⏳ Attempt ${attempt}/${MAX_RETRIES}: ${(error as Error).message}, retrying in ${RETRY_DELAY_MS / 1000}s...`);
    }

    if (attempt < MAX_RETRIES) {
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
    }
  }

  console.warn(`⚠️ Server did not respond after ${MAX_RETRIES} attempts. Tests may fail.`);
}

export default wakeServer;
