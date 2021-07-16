# Build app

FROM node:14.17.3 as BUILD
WORKDIR /app
COPY . /app

RUN npm install
RUN npm install -g @angular/cli@10.0.1

ENV PATH /app/node_modules/.bin:$PATH

# Dynamically configurable backend endpoint
ARG BE_HOST
ENV BE_HOST $BE_HOST
RUN printf "export const apiUrl = {\n\tdomain: 'http://$BE_HOST'\n};\n" >> src/environments/environment.prod.ts

RUN ng build --output-path=dist --prod

# Prod, expose the app via nginx
FROM nginx:1.16.0-alpine
COPY --from=BUILD /app/dist /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
