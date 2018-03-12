# Base image
FROM node:8.10-alpine

# Update system
RUN apk update
RUN apk upgrade

# Add software we need
RUN apk --no-cache add curl bash sed git

# Modify and install netdata
WORKDIR /home
RUN curl -Ss 'https://raw.githubusercontent.com/firehol/netdata-demo-site/master/install-required-packages.sh' >/tmp/kickstart.sh && bash /tmp/kickstart.sh -i netdata -y
RUN git clone https://github.com/firehol/netdata.git --depth=1
RUN sed -i '6i<base href="/_netdata/">' /home/netdata/web/index.html
RUN cd /home/netdata && ./netdata-installer.sh --dont-wait

# Copy and install the web app
RUN mkdir -p /home/app
WORKDIR /home/app
COPY . /home/app

# Install dependencies
RUN npm install --only=production

# Start the web app in production mode
CMD /usr/sbin/netdata && {{command}}

# Expose the application port
EXPOSE 3325