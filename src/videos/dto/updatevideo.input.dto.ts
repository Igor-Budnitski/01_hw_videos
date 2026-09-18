import {Resolutions, Video} from "../types/video";

export type updateVideoInputDto = {
    title: string,
    author: string,
    canBeDownloaded: boolean,
    minAgeRestriction: number | null,
    publicationDate: Date,
    availableResolutions: Resolutions[],
}


