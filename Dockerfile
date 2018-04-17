FROM php:7.2.4-apache-stretch

VOLUME ["/var/www"]

COPY ./src /tmp/src


RUN apt update
RUN apt install -y perl
RUN apt install -y libapache2-mod-perl2
RUN apt install -y librsvg2-bin
RUN apt install -y git
RUN perl -e'use CPAN; install "File::Slurp"'
RUN docker-php-ext-install mysqli

WORKDIR /var/www/atlasOBEC
EXPOSE 85
EXPOSE 3306

RUN chmod +x -R /tmp/src/

CMD /tmp/src/actions/start.sh
