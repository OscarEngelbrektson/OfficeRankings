AWS_USER_ID=733315428519
REGION="eu-north-1"
ECR_TAG="aws-update-ratings"
LAMBDA_NAME="update-ratings-docker"

bash push-lambda.sh $AWS_USER_ID $REGION $ECR_TAG $LAMBDA_NAME