import {Resolutions} from "../types/video";

// Данные, которые клиент присылает при создании водителя
// (без служебных id и createdAt — их проставляет сервер).

export type VideoInputDto = {
    title: string,
    author: string,
    availableResolutions: Resolutions[]
}