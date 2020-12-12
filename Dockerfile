FROM node:12
RUN git clone -q https://github.com/fondueInTheCity/electronic-documents-web.git
WORKDIR electronic-documents-web
RUN npm install > /dev/null
EXPOSE 8082
CMD ["npm", "start"]
