import {Resolutions, Video} from "../types/video";

// Данные, которые клиент присылает при создании водителя
// (без служебных id и createdAt — их проставляет сервер).

export type CreateVideoInputDto = {
    title: string,
    author: string,
    availableResolutions: Resolutions[],
}