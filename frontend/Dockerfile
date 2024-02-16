FROM ubuntu:latest

RUN apt update && apt install sudo -y

RUN useradd -rm -d /home/ubuntu -s /bin/bash -g root -G sudo -u 1000 admin 

RUN  echo 'admin:1234' | chpasswd

RUN mkdir frontend

COPY . frontend/

RUN sudo apt-get install locales -y

RUN sudo apt-get install curl -y

RUN curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash - &&\ 
sudo apt-get install -y nodejs

RUN cd frontend

RUN npm i

CMD ["npm run dev"]