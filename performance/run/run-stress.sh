#!/bin/bash
set -e

ENV=${1:-staging}
echo "Running STRESS test against $ENV..."

k6 run \
  -e BASE_URL=$(node -e "console.log(require('../config/${ENV}.js').default.BASE_URL)") \
  -e ENV="$ENV" \
  --out json=../reports/stress-results.json \
  ../workloads/stress.js
