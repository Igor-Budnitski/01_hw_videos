import {Video, availableResolutions} from "../videos/types/video";

export const db = {
    videos: <Video[]>[
        {
            "id": 1,
            "title": "The Rock",
            "author": "Jerry Bruckheimer",
            "canBeDownloaded": true,
            "minAgeRestriction": 19,
            "createdAt": new Date(),
            "publicationDate": new Date(),
            "availableResolutions": [availableResolutions.P144],
        },
        {
            "id": 2,
            "title": "Lord of the Rings",
            "author": "Peter Jackson",
            "canBeDownloaded": false,
            "minAgeRestriction": 3,
            "createdAt": new Date(),
            "publicationDate": new Date(),
            "availableResolutions": [availableResolutions.P240, availableResolutions.P1080, availableResolutions.P2160],
        },
        {
            "id": 3,
            "title": "Titanic",
            "author": "James Cameron",
            "canBeDownloaded": true,
            "minAgeRestriction": 14,
            "createdAt": new Date().toISOString(),
            "publicationDate": new Date(),
            "availableResolutions": [availableResolutions.P144, availableResolutions.P1080],
        },
    ]
}