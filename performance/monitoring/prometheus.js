import { Trend, Counter, Rate } from 'k6/metrics';

export const requestDuration = new Trend('custom_req_duration');
export const requestCount = new Counter('custom_req_count');
export const errorRate = new Rate('custom_error_rate');

export function recordMetrics(response) {
  requestDuration.add(response.timings.duration);
  requestCount.add(1);
  errorRate.add(response.status >= 400);
}
