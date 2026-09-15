import {Resolutions, Video} from "../types/video";

// Данные, которые клиент присылает при создании водителя
// (без служебных id и createdAt — их проставляет сервер).

export type VideoInputDto = {
    title: string,
    author: string,
    canBeDownloaded?: boolean,
    minAgeRestriction?: number | null,
    publicationDate?: Date,
    availableResolutions: Resolutions[],
}