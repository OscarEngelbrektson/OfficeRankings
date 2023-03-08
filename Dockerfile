FROM public.ecr.aws/lambda/python:3.8

# Install the function's dependencies using file requirements.txt
# from your project folder.

RUN  pip3 install --upgrade pip
#COPY requirements.txt  .
RUN  pip3 install pandas numpy gspread trueskill --target "${LAMBDA_TASK_ROOT}"
# RUN  pip3 install -r requirements.txt --target "${LAMBDA_TASK_ROOT}"

# Copy function code
COPY . ${LAMBDA_TASK_ROOT}

# Set the CMD to your handler (could also be done as a parameter override outside of the Dockerfile)
CMD [ "index.lambda_handler" ] 