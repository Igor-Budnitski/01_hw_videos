import {Request, Response, Router} from "express";
import {db} from "../../db/in-memory.db";
import {HttpStatus} from "../../core/types/http-statuses";
import {createErrorMessages} from "../../core/utils/error.utils";
import {Resolutions, Video} from "../types/video";
import {VideoInputDto} from "../dto/video.input.dto";
import {validateVideoInputDto} from "../validation/video-input-dto.validation";


export const videosRouter = Router({});

videosRouter
    //delete all data from DB
    .delete('/all-data', (req: Request, res: Response) => {
        db.videos = [];
        res.status(HttpStatus.NoContent).send('All data deleted');
    })
    // Get All Videos
    .get('', (req: Request, res: Response) => {
        res.status(HttpStatus.Success).send(db.videos);
    })

    // Get by ID
    .get('/:id', (req: Request<{ id: string }>, res: Response) => {
        const video = db.videos.find((v) => v.id === +req.params.id);
        if (!video) {
            res
                .status(HttpStatus.NotFound)
                .send(
                    createErrorMessages([{field: 'id', message: 'Video not found'}]),
                )
            return;
        }
        res.status(HttpStatus.Success).send(video);
    })
    // Post a new video

    .post('', (req: Request<{}, {}, VideoInputDto>, res: Response) => {
            const errors = validateVideoInputDto(req.body);

            if (errors.length > 0) {
                res.status(HttpStatus.BadRequest).send([{message: 'Some mistake in body', field: 'req.body'}]);
            }
            const newVideo: Video = {
                id: db.videos.length + 1,
                title: req.body.title,
                author: req.body.author,
                canBeDownloaded: false,
                minAgeRestriction: null,
                createdAt: new Date(),
                publicationDate: new Date(new Date().setDate(new Date().getDate() + 1)),
                availableResolutions: req.body.availableResolutions,
            }
            db.videos.push(newVideo);
            res.status(HttpStatus.Created).send(newVideo);
        }
    )

