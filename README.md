# atlasOBEC
Atlas econômico da cultura brasileira (OBEC - UFRGS)

## Tecnologias utilizadas

 - PHP 7.0
 - JavaScript
  - D3JS (gráficos)
  - TopoJSON (coordenadas geográficas)
  - JQuery
 - HTML5
 - CSS3
  - Bootstrap (framework frontend)
 - MySQL


## Documentação para instalar o Atlas

### Dependências para instalação

- Apache
- Git
- MySQL
- NPM
- PHP
- PERL

Em ambiente linux(Ubuntu),
vamos começar atualizando o sistema para garantir que tudo corra bem
```
  sudo apt-get update
```
 Agora, instalar as dependências:
 ```
  sudo apt-get install apache2
  sudo apt-get install php
  sudo apt-get install mysql-server
 ```
 Ou instalar pacote LAMP(Linux, Apache, MySQL, PHP):
 ```
  apt-get -y install wget screen unzip
  wget --no-check-certificate -O lamp.zip https://github.com/teddysun/lamp/archive/master.zip
  unzip lamp.zip
  cd lamp-master
  chmod +x *.sh
  screen -S lamp
  ./lamp.sh
 ```
 Instalar o NodeJS para poder utilizar o NPM:
 ```
  sudo apt-get install nodejs
  npm install express
 ```

 Instalar o PERL para poder utilizar o rsvg-convert:
 ```
  sudo apt-get install perl
  sudo apt-get install apache2 mod_perl
  sudo a2enmod cgi
  sudo ln -s /etc/apache2/mods-available/cgid.conf /etc/apache2/mods-enabled/
  sudo ln -s /etc/apache2/mods-available/cgid.load /etc/apache2/mods-enabled/
  sudo perl -e'use CPAN; install "File::Slurp"'
  sudo apt-get install librsvg2-bin

 ```

 Após instalado e _Clonado_ é necessário configurar Apache para rodar os scripts PERL em  ``etc/apache2/sites-available/default``
 ``` 
    ScriptAlias /cgi-bin/ [DIR]
        <Directory "[DIR]">
              AllowOverride None
              Options ExecCGI
              AddHandler cgi-script cgi pl
              Require all granted
        </Directory>
 ```

 e o Git:
 ```
  sudo apt-get install git
 ```

### Configurar o Atlas

Para facilitar a explicação vamos assumir  a instalação local (_localhost_)

 Ir para o diretório padrão dos arquivos no Apache:
 ```
  cd /var/www/html
 ```

 Então _Clonar_ o repositório do **Atlas** e entrar na pasta clonada:
 ```
  git clone https://github.com/dlazarosps/atlasOBEC.git
  cd atlasOBEC
 ```

  E para acessar através do navegador no link:
 ```
  localhost/atlasOBEC
  ou
  127.0.0.1/atlasOBEC
 ```

 Após instalado e _Clonado_ é necessário configurar Apache para rodar os scripts PERL em  ``etc/apache2/sites-available/default``
 Adicionar o seguinte bloco de código
 ``` 
    ScriptAlias /cgi-bin/ /var/www/html/atlasOBEC
        <Directory "/var/www/html/atlasOBEC">
              AllowOverride None
              Options ExecCGI
              AddHandler cgi-script cgi pl
              Require all granted
        </Directory>
 ```
 
## Detalhamento de requisitos e funcionalidades

[Documento Google Drive] (https://drive.google.com/open?id=1awAMcvdPkXRN4dj4NJ1wAWA6tklW87aBFzwSc7-U1Xg)

## DER e Banco de Dados

[Documento Google Drive] (https://drive.google.com/open?id=1WcOf5DdOZvBE5u3fzjbd6unO4dAXoQwPKn8P6FQK-aY)

### end
