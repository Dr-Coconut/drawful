########## Stage 2 - React ##########
#FROM node:current-alpine3.16 AS builder
#WORKDIR /home/gitlab-runner/builds/ZTttgQvU/0/team-projects-2022-23/team40-22/frontend
#COPY ./frontend/package.json ./
#COPY ./frontend/package-lock.json ./
#RUN npm install --silent
#ENV PATH /frontend/node_modules/.bin$PATH
#COPY ./frontend/ ./
#RUN npm run build
#WORKDIR /home/gitlab_runner/builds/ZTttgQvU/0/team-projects-2022-23/drawful

########## Stage 3 - Nginx ##########
#FROM nginx
#WORKDIR /home/gitlab_runner/builds/ZTttgQvU/0/team-projects-2022-23/team40-22
#RUN rm -rf /etc/nginx/nginx.conf /etc/nginx/conf.d/default.conf
#RUN ls /home/gitlab-runner/builds/ZTttgQvU/0/team-projects-2022-23/team40-22/frontend
#COPY  --from=builder /home/gitlab-runner/builds/ZTttgQvU/0/team-projects-2022-23/team40-22/frontend/build /usr/share/nginx/html
#RUN ls /usr/share/nginx/html
#COPY ./conf /etc/nginx/nginx.conf
#VOLUME /etc/nginx
#VOLUME /usr/share/nginx/html
#RUN ls /etc/nginx/
#RUN cat /etc/nginx/nginx.conf
#COPY  /etc/nginx/nginx.conf /etc/nginx/conf.d/default.conf
#RUN nginx -s reload
#CMD ["nginx", "-g", "daemon off;"]

########## Stage 1 - Django ##########
# pull official base image
FROM python:3.9.16-alpine
# set work directory
WORKDIR /home/gitlab-runner/builds/ZTttgQvU/0/team-projects-2022-23/team40-22
# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV PIP_ROOT_USER_ACTION=ignore
#ENV PYTHONPATH "{PYTHONPATH}:/home/gitlab-runner/builds/ZTttgQvU/0/team-projects-2022-23/team40-22"
# install psycopg2 dependencies
RUN apk update \
    && apk add postgresql-dev gcc python3-dev musl-dev
# install dependencies
RUN pip3 install --upgrade pip 
COPY ./requirements.txt .
RUN pip3 install -r requirements.txt
# install python packages
RUN pip3 install django-cors-headers
RUN pip3 install djangorestframework
RUN pip3 install pillow
RUN pip3 install django-base64field
RUN pip3 install django_filter
# copy project
COPY . .
#CMD python3 manage.py runserver
