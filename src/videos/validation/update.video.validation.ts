import {Resolutions} from "../types/video";
import {updateVideoInputDto} from "../dto/updatevideo.input.dto";
import {ValidationError} from "../../core/types/validation-error";
import e from "express";


// Строка считается некорректной, если это не строка или её длина (после trim)
// выходит за границы [min, max]. Вынесено отдельно, чтобы не дублировать проверку.
const isInvalidString = (value: unknown, min: number, max: number): boolean =>
    typeof value !== 'string' ||
    value.trim().length < min ||
    value.trim().length > max;

export const validateUpdateVideoInputDto = (data: updateVideoInputDto,): ValidationError[] => {
    const errors: ValidationError[] = [];

    // For resolution check
    const validValues = Object.values(Resolutions);
    const clientData = data.availableResolutions;
    const isValid = clientData.every((item) => validValues.includes(item as any));

    // For age check
    const age = data.minAgeRestriction;

    // For canBeDownloaded check
    const cd = data.canBeDownloaded;

    // For publicationDate check
    const pubDate = data.publicationDate;


    // Title check
    if (isInvalidString(data.title, 1, 40)) {
        errors.push({message: 'Invalid title size', field: 'title'})
    }

    // Author check
    if (isInvalidString(data.author, 1, 20)) {
        errors.push({message: 'Invalid title size', field: 'author'})
    }

    // canBeDownloaded check
    if (typeof cd !== 'boolean') {
        errors.push({message: 'Invalid value', field: 'canBeDownloaded'});
    }

    // minAgeRestriction check
    if (age !== null && (typeof age !== 'number' || age < 1 || age > 18 || !Number.isInteger(age))) {
        errors.push({message: 'Invalid age', field: 'minAgeRestriction'});
    }

    // publicationDate check
    if (pubDate !== undefined && pubDate !== null) {
        // 1. Проверяем, что это строка
        // 2. Проверяем, что встроенный метод Date.parse() смог её распознать
        if (typeof pubDate !== 'string' || Number.isNaN(Date.parse(pubDate))) {
            errors.push({message: 'Invalid value', field: 'publicationDate'});
        }
    }

    //Check if Resolutions is not empty & contains correct data.
    if (data.availableResolutions.length < 1 && !isValid) {
        errors.push({message: 'Is empty', field: 'Resolution'})
    }

    return errors;
}

