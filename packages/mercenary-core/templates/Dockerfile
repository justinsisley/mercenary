# Base image
FROM node:7-slim

# In the event of a breakout, the application will be running as a non-root user
# RUN groupadd -r nodejs && useradd -m -r -g nodejs nodejs
# USER nodejs

# Update system
RUN apt-get update

# Install, modify, and start netdata
WORKDIR /home
RUN curl -Ss 'https://raw.githubusercontent.com/firehol/netdata-demo-site/master/install-required-packages.sh' > /tmp/kickstart.sh && bash /tmp/kickstart.sh -i netdata -y
RUN git clone https://github.com/firehol/netdata.git --depth=1
RUN sed -i '6i<base href="/_netdata/">' /home/netdata/web/index.html
RUN cd netdata && ./netdata-installer.sh

# Copy and install the web app
RUN mkdir -p /home/app
WORKDIR /home/app
ADD . /home/app
RUN npm install --production

# Expose the application port
EXPOSE 3325

# Simple process that handles the responsibilities of running as PID 1
# ADD https://github.com/Yelp/dumb-init/releases/download/v1.2.0/dumb-init_1.2.0_amd64 /usr/local/bin/dumb-init
# RUN chmod +x /usr/local/bin/dumb-init

# Start netdata
# RUN /usr/sbin/netdata

# Start the web app in production mode
# CMD ["dumb-init", "npm", "run", "prod"]
CMD ["npm", "run", "prod"]