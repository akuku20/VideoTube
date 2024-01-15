# VideoTube

Full-stack web application built with Spring Boot, Angular, and MongoDB. It allows users to upload videos to Amazon S3, edit video details, and play videos using an integrated video player.

Features
- Video Upload to Amazon S3: Users can easily upload videos to Amazon S3 storage, ensuring reliable and scalable storage for their multimedia content.
- Video Details Editing: Users can edit details such as title, description, and tags for each uploaded video. These details are stored in MongoDB for efficient retrieval and management.
- Integrated Video Player: The application includes a video player that allows users to play the uploaded videos directly within the web interface.
- Spring Boot Backend: The backend is built with Spring Boot, providing a robust and scalable server-side application. It handles video uploads, storage management, and serves data to the frontend.
- Angular Frontend: The frontend is developed using Angular, providing a responsive and user-friendly interface for interacting with the video management system.

![](https://github.com/akuku20/VideoTube/blob/main/overview.png)

Setup
1. Open backend/src/main/resources/application.properties and configure MongoDB connection settings.
Set your Amazon S3 credentials in the application.properties file.
2. Compile the backend
```
mvn compile
```
3. Run the server
```
mvn exec:java -Dexec.mainClass="com.akuku.youtubleclone.YoutubeCloneApplication"
```
4. Run frontend
```
npm install
ng serve
```
Open your browser and navigate to http://localhost:4200 to use the video management system.
