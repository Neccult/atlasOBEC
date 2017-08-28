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
    ou
    sudo aptitude install libapache2-mod-perl2
  
  sudo a2enmod cgi
  sudo ln -s /etc/apache2/mods-available/cgid.conf /etc/apache2/mods-enabled/
  sudo ln -s /etc/apache2/mods-available/cgid.load /etc/apache2/mods-enabled/
  sudo perl -e'use CPAN; install "File::Slurp"'
  sudo apt-get install librsvg2-bin

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

  sudo chmod 777 -R cgi/
  sudo chmod 777 -R cgi/download.pl 
 ```

 Após instalado é necessário configurar Apache para rodar os scripts PERL em  ``etc/apache2/sites-available/default``
 Adicionar o seguinte bloco de código:
 ``` 
    ScriptAlias /cgi-bin/ /var/www/html/atlasOBEC/cgi
        <Directory "/var/www/html/atlasOBEC/cgi">
              AllowOverride None
              Options ExecCGI
              AddHandler cgi-script cgi pl
              Require all granted
        </Directory>
 ```
Reiniciar o Apache para carregar as modificações:
```
 sudo service apache2 restart
```
  E para acessar através do navegador no link:
 ```
  localhost/atlasOBEC
  ou
  127.0.0.1/atlasOBEC
 ```

### Configurar Banco de Dados

Para facilitar a explicação vamos assumir o uso do mysql via terminal no diretório raiz do Projeto

  Criar banco de dados:
  ```
    mysql CREATE DATABASE Atlas
  ```

  Importar _dump_ do banco de dados:
  ```
    mysql -u [username] -p [password] Atlas < data/sql/dump-Atlas.sql
  ```

  Após importado os dados manter a _consistência_ de usuário e senha do banco de dados no arquivo ``EixoUm.php``
  ```
      define('DB_USUARIO', 'username');
      define('DB_SENHA', 'password');
  ```

## Documentação Detalhada

 - [Requisitos e Funcionalidades](https://github.com/dlazarosps/atlasOBEC/blob/master/data/docs/Requisitos%20Atlas.md)

 - [DER e Banco de Dados](https://github.com/dlazarosps/atlasOBEC/blob/master/data/docs/BD%20Atlas.md)
