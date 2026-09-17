import {VideoInputDto} from "../dto/video.input.dto";
import {Resolutions} from "../types/video";
import {ValidationError} from "../../core/types/validation-error";
import {db} from "../../db/in-memory.db";
import {createErrorMessages} from "../../core/utils/error.utils";

// Строка считается некорректной, если это не строка или её длина (после trim)
// выходит за границы [min, max]. Вынесено отдельно, чтобы не дублировать проверку.
const isInvalidString = (value: unknown, min: number, max: number): boolean =>
    typeof value !== 'string' ||
    value.trim().length < min ||
    value.trim().length > max;

// Ручная валидация тела запроса (на этом этапе — без сторонних библиотек).
// Возвращает список ошибок; пустой список означает, что данные корректны.

export const validateVideoInputDto = (
    data: VideoInputDto,
): ValidationError[] => {
    const errors: ValidationError[] = [];
    // This 3 lines below is to check if what clien send in resolution in req.boy to enum that we have.
    const validValues = Object.values(Resolutions);
    const clientData = data.availableResolutions;
    const isValid = clientData.every((item) => validValues.includes(item as any));
    const age = data.minAgeRestriction;
    const canDownload = data.canBeDownloaded;

// Проверяем, что значение является ЛИБО null, ЛИБО числом в диапазоне от 1 до 18
    if (age !== null && (typeof age !== 'number' || age < 1 || age > 18 || !Number.isInteger(age))) {
        errors.push({message: 'Invalid age', field: 'minAgeRestriction'});
        createErrorMessages(errors); //new
    }

// Проверяем, является ли тип строго 'boolean'
    if (typeof canDownload !== 'boolean') {
        errors.push({message: 'Invalid value', field: 'canBeDownloaded'});
        createErrorMessages(errors); //new
    }

    const pubDate = data.publicationDate;

// Проверяем только если поле передано (не равно undefined и null)
    if (pubDate !== undefined && pubDate !== null) {
        // 1. Проверяем, что это строка
        // 2. Проверяем, что встроенный метод Date.parse() смог её распознать
        if (typeof pubDate !== 'string' || Number.isNaN(Date.parse(pubDate))) {
            errors.push({message: 'Invalid value', field: 'publicationDate'});
        }
    }
//  Проверяем поле Title
    if (isInvalidString(data.title, 1, 40)) {
        errors.push({message: 'Invalid title size', field: 'title'})
        createErrorMessages(errors); //new
    }
//  Проверяем поле author елси
    if (isInvalidString(data.author, 1, 20)) {
        errors.push({message: 'Invalid title size', field: 'author'})
        createErrorMessages(errors); //new
    }

    if (data.availableResolutions.length < 1) {
        errors.push({message: 'Is empty', field: 'Resolution'})
    }

    if (!isValid) {
        errors.push({message: 'Resolution doesn\'t exists', field: 'availableResolutions'})
    }

    return errors;
}