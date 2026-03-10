# Estágio 1: Build do Angular utilizando Node.js
FROM node:22-alpine AS build
WORKDIR /app

# Copia package.json e instala dependências primeiro (aproveita cache do Docker)
COPY package.json package-lock.json ./
RUN npm ci

# Copia o restante do código e faz o build de produção
COPY . .
RUN npm run build --configuration=production

# Estágio 2: Servir a aplicação com NGINX
FROM nginx:alpine

# Copia os arquivos compilados do Angular para a pasta padrão do NGINX
# Lembre-se de trocar "sistema-aa" pelo nome configurado no seu angular.json (outputPath)
COPY --from=build /app/dist/sistema-aa/browser /usr/share/nginx/html

# Copia o arquivo de configuração de roteamento do NGINX (necessário para o Angular Router funcionar)
# Crie um arquivo nginx.conf simples na mesma pasta deste Dockerfile, ou o Nginx usará o padrão.
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
