import authFlow from '../scenarios/auth.flow.js';
import browseFlow from '../scenarios/browse.flow.js';

export const options = {
  vus: 1,
  duration: '30s',
  thresholds: {
    http_req_duration: ['p(95)<500'],
    http_req_failed: ['rate<0.01'],
  },
};

export default function () {
  authFlow();
  browseFlow();
}
