import "reflect-metadata";
import { createConnection, Connection } from "typeorm";
import { Photo } from './entity/Photo';
import { PhotoMetadata } from './entity/PhotoMetadata';
import { Album } from "./entity/Album";

async function createPhotoAndMetadata(connection:Connection) {
    // Create a new Photo
    let photo = new Photo();
    photo.name = "Me and Bears";
    photo.description = "I am near polar bears";
    photo.filename = "photo-with-bears.jpg";
    photo.isPublished = true;
    photo.views = 0;

    // Create a new Photo Metadata
    let metadata = new PhotoMetadata();
    metadata.width = 640;
    metadata.height = 480;
    metadata.compressed = true;
    metadata.comment = "cybershoot";
    metadata.orientation = "portrait";
    metadata.photo = photo;             // connect Photo Table

    // Get Entity Repos
    let photoRepository = connection.getRepository(Photo);
    let metadataRepository = connection.getRepository(PhotoMetadata);

    // Save a Photo first
    await photoRepository.save(photo);
    
    // Photo is saved. Need to save metadata.
    await metadataRepository.save(metadata);

    console.log('All Data inserted');
}

async function getPhotoWithMetadata(connection:Connection) {
    let photoRepository = connection.getRepository(Photo);
    let photos = await photoRepository.find({ relations: ["metadata"] });
    
    console.log(photos);
}

async function createPhotoAndMetadataWithCascade(connection:Connection) {
    // Create a new Photo
    let photo = new Photo();
    photo.name = "Me and Bears";
    photo.description = "I am near polar bears";
    photo.filename = "photo-with-bears.jpg";
    photo.isPublished = true;
    photo.views = 0;

    // Create a new Photo Metadata
    let metadata = new PhotoMetadata();
    metadata.width = 640;
    metadata.height = 480;
    metadata.compressed = true;
    metadata.comment = "cybershoot";
    metadata.orientation = "portrait";
    
    photo.metadata = metadata;  // Connect Metadata

    let photoRepository = connection.getRepository(Photo);

    await photoRepository.save(photo);
    console.log('Photo is saved, PhotoMetadata is saved too.');
}

async function createAlbums(connection:Connection) {
    let album1 = new Album();
    album1.name = "Bears";
    await connection.manager.save(album1);

    let album2 = new Album();
    album2.name = "Me";
    await connection.manager.save(album2);

    // Create a few photos
    let photo = new Photo();
    photo.name = 'Me and Bears';
    photo.description = 'I am near polar bears';
    photo.filename = 'photo-with-bears.jpg';
    photo.views = 0;
    photo.isPublished = true;
    photo.albums = [album1, album2];
    await connection.manager.save(photo);

    const loadedPhoto = await connection.getRepository(Photo).findOne(1, { relations: ["albums"] });
    console.log(loadedPhoto);
}

createConnection().then(async connection => {
    // await createPhotoAndMetadata(connection);    
    // await getPhotoWithMetadata(connection);
    // await createPhotoAndMetadataWithCascade(connection);
    await createAlbums(connection);
}).catch(error => console.log(error));
