FROM ubuntu:latest

RUN apt update && apt install sudo -y

RUN useradd -rm -d /home/ubuntu -s /bin/bash -g root -G sudo -u 1000 admin 

RUN  echo 'admin:1234' | chpasswd

RUN mkdir backend

COPY . backend/

RUN cd backend/shiftify

RUN sudo apt install libcairo2-dev pkg-config python3-dev python3-pip -y

RUN pip install wheel setuptools --upgrade

RUN pip install -r requirements.txt

RUN mkdir logs

EXPOSE 8000

CMD ["python3 manage.py runserver"]