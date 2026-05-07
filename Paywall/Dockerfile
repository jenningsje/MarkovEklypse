FROM python:3.12-alpine

WORKDIR /opt/app

COPY requirements.txt /tmp/requirements.txt

COPY nftables-setup.sh /opt/app/nftables-setup.sh

RUN chmod u+x nftables-setup.sh

WORKDIR /opt/app

RUN apk update && \
    xargs apk add --no-cache < /tmp/requirements.txt && \
    rm /tmp/requirements.txt

# Install docker securely
RUN chmod u+x security.sh && ./security.sh

RUN yarn install && \
    yarn add express cors fs nodemon

# Set the working directory
WORKDIR /opt/app

# Copy the application files into the container
COPY ./Markov .

WORKDIR /opt/app/MarkovProprietary

USER appuser

# Expose ports for Node.js applications
EXPOSE 8888
EXPOSE 4000
EXPOSE 8000

# Define the command to run your application
CMD ["/bin/bash", "./run_server_one.sh"]