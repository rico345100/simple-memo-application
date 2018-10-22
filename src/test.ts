import "reflect-metadata";
import { createConnection } from "typeorm";
import { Photo } from './entity/Photo';

createConnection().then(async connection => {

    console.log("Inserting a new user into the database...");
    const photo = new Photo();
    photo.name = 'Test';
    photo.description = 'My Test Description';
    photo.filename = 'file-doesnt-exists.png';
    photo.views = 0;
    photo.isPublished = false;

    await connection.manager.save(photo);
    console.log("Saved a new user with id: " + photo.id);
    
    console.log("Loading photos from the database...");
    const photos = await connection.manager.find(Photo);
    console.log("Loaded photos: ", photos);
    
}).catch(error => console.log(error));
