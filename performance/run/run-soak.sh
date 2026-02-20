#!/bin/bash
set -e

ENV=${1:-staging}
echo "Running SOAK test against $ENV..."

k6 run \
  -e BASE_URL=$(node -e "console.log(require('../config/${ENV}.js').default.BASE_URL)") \
  -e ENV="$ENV" \
  --out json=../reports/soak-results.json \
  ../workloads/soak.js
