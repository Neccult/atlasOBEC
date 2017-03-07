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
 - CSV padronizado (Informações / Banco de Dados)


## Documentação para instalar Atlas

### Dependências para instalação

- Apache2
- NPM
- Git

Em ambiente linux,
vamos começar atualizando o sistema para garantir que tudo corra bem
`
  sudo apt-get update
`
 Agora, instalar o Apache:
 `
  sudo apt-get install apache2
 `

 Instalar o NodeJS para poder utilizar o NPM:
 `
  sudo apt-get install nodejs
  npm install express
`
 e o Git:
 `
  sudo apt-get install git
 `
### Configurar Atlas

Para facilitar a explicação vamos assumir  a instalação local (_localhost_)

 Ir para o diretório padrão dos arquivos no Apache:
 `
  cd /var/www/html
 `
 Então _Clonar_ o repositório do **Atlas** e entrar na pasta clonada:
 `
  git clone https://github.com/dlazarosps/atlasOBEC.git
  cd atlasOBEC
 `
  E para acessar através do navegador no link:
 `
  localhost/atlasOBEC
  ou
  127.0.0.1/atlasOBEC
 `
 
## Detalhamento de requisitos e funcionalidades

[Documento Google Drive] (https://drive.google.com/open?id=1awAMcvdPkXRN4dj4NJ1wAWA6tklW87aBFzwSc7-U1Xg)
