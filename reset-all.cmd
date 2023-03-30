
docker-compose down
docker-compose up -d
./gradlew clean
./gradlew quarkusBuild
cd frontend
npm install