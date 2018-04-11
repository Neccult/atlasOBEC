FROM php:7.2.4-apache-stretch

VOLUME ["/var/www"]

COPY ./src /tmp/src


RUN apt update
RUN apt install -y mariadb-server
RUN apt install -y perl
RUN apt install -y libapache2-mod-perl2
RUN apt install -y librsvg2-bin
RUN apt install -y git
RUN perl -e'use CPAN; install "File::Slurp"'
#RUN mysql -u root -p atlas < /var/www/app/data/sql/dump-Atlas.sql

WORKDIR /var/www/
EXPOSE 85

RUN chmod +x -R /tmp/src/
CMD /tmp/src/actions/start.sh
