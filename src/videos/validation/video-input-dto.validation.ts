import {VideoInputDto} from "../dto/video.input.dto";
import {Resolutions} from "../types/video";
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

    const validValues = Object.values(Resolutions);

    const clientData = data.availableResolutions;

    const isValid = clientData.every((item) => validValues.includes(item as any));

    if (isInvalidString(data.title, 1, 40)) {
        errors.push({message: 'Invalid title size', field: 'title'})
    }

    if (isInvalidString(data.author, 1, 20)) {
        errors.push({message: 'Invalid title size', field: 'author'})
    }

    if (data.availableResolutions.length < 1){
        errors.push({message: 'Is empty', field: 'Resolution'})
    }

    if (!isValid){
        errors.push({message: 'Resolution doesn\'t exists', field: 'Resolution'})
    }

    return errors;
}