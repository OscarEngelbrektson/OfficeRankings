set -e

AWS_USER_ID=$1
REGION=$2
ECR_TAG=$3
LAMBDA_NAME=$4

docker build -t ${ECR_TAG} .
# docker build -t ${ECR_TAG} . --no-cache

aws ecr get-login-password --region ${REGION} | docker login --username AWS --password-stdin ${AWS_USER_ID}.dkr.ecr.${REGION}.amazonaws.com
docker tag ${ECR_TAG}:latest ${AWS_USER_ID}.dkr.ecr.${REGION}.amazonaws.com/${ECR_TAG}:latest
docker push ${AWS_USER_ID}.dkr.ecr.${REGION}.amazonaws.com/${ECR_TAG}:latest

aws lambda update-function-code --function-name $LAMBDA_NAME --image-uri ${AWS_USER_ID}.dkr.ecr.${REGION}.amazonaws.com/${ECR_TAG}:latest