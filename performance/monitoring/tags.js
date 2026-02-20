export const Tags = {
  FLOW: 'flow',
  ENDPOINT: 'endpoint',
  ENV: 'env',
};

export function tagRequest(name, flow) {
  return {
    tags: {
      [Tags.FLOW]: flow,
      [Tags.ENDPOINT]: name,
      [Tags.ENV]: __ENV.ENV || 'local',
    },
  };
}
