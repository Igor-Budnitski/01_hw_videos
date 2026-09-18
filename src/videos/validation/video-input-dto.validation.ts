import {CreateVideoInputDto} from "../dto/createVideoInputDto";
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
    data: CreateVideoInputDto,
): ValidationError[] => {
    const errors: ValidationError[] = [];

    const validValues = Object.values(Resolutions);
    const clientData = data.availableResolutions;
    const isValid = clientData.every((item) => validValues.includes(item as any));

//  Проверяем поле Title
    if (isInvalidString(data.title, 1, 40)) {
        errors.push({message: 'Invalid title size', field: 'title'})
    }
//  Проверяем поле author елси
    if (isInvalidString(data.author, 1, 20)) {
        errors.push({message: 'Invalid title size', field: 'author'})
    }

    if (data.availableResolutions.length < 1) {
        errors.push({message: 'Is empty', field: 'Resolution'})
    }

    if (!isValid) {
        errors.push({message: 'Resolution doesn\'t exists', field: 'availableResolutions'})
    }

    return errors;
}