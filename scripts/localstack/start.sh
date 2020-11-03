docker-compose up -d
aws cloudformation create-stack \
  --endpoint-url http://localhost:4566 \
  --stack-name samplestack \
  --template-body file://../../template.yml 