import {availableResolutions} from "../types/video";

// Данные, которые клиент присылает при создании водителя
// (без служебных id и createdAt — их проставляет сервер).

export type VideoInputDto = {
    id: string,
    title: string,
    author: string,
    canBeDownloaded: boolean | false,
    minAgeRestriction: number | null,
    createdAt: Date,
    publicationDate: Date,
    availableResolutions: availableResolutions[]
}