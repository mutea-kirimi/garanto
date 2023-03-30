## Local environment for development

* setup
    * run the ```createCerts.sh```script in the ```backend``` folder to create some required certificates
      for ```backend/src/main/resources/key/```
    * run ```npm install``` in the ```frontend``` folder
* start
    * database (in root folder):  ```docker-compose up -d```
    * backend (in root folder): ```./gradlew backend:quarkusDev```
    * frontend (in ```frontend``` folder): ```npm start```
* reset
    * run the ```reset-all.sh``` or ```reset-all.cmd``` script in the root folder, this:
        * sets up a new database with docker-compose
        * rebuilds the backend with Quarkus
        * reinstalls the local npm packages
* OpenApi
    * http://localhost:8080/q/openapi to see the Api documentation