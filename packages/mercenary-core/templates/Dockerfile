# Base image
FROM node:latest

# Update system
RUN apt-get update

# Install, modify, and start netdata
RUN curl -Ss 'https://raw.githubusercontent.com/firehol/netdata-demo-site/master/install-required-packages.sh' > /tmp/kickstart.sh && bash /tmp/kickstart.sh -i netdata -y
RUN git clone https://github.com/firehol/netdata.git --depth=1
RUN sed -i '6i<base href="/_netdata/">' /netdata/web/index.html
RUN cd netdata && ./netdata-installer.sh

# Bundle application source
ADD . /application

# Install application dependencies
RUN cd /application && npm install --production

# Expose the application port
EXPOSE 3325

# Start netdata, then run the application in production mode
CMD /usr/sbin/netdata && cd /application && npm run prod