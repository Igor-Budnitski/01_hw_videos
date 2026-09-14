import {VideoInputDto} from "../dto/video.input.dto";
import {availableResolutions} from "../types/video";
import {ValidationError} from "../../core/types/validation-error";

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

    if (isInvalidString(data.title, 1, 40)) {
        errors.push({field: 'title', message: 'Invalid title size'})
    }

    if (isInvalidString(data.author, 1, 20)) {
        errors.push({field: 'author', message: 'Invalid author size'})
    }

    return errors;
}