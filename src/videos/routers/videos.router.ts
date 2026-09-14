import {Request, Response, Router} from "express";
import {db} from "../../db/in-memory.db";
import {HttpStatus} from "../../core/types/http-statuses";
import {createErrorMessages} from "../../core/utils/error.utils";
import { Video} from "../types/video";
import { VideoInputDto} from "../dto/video.input.dto";
import {validateVideoInputDto} from "../validation/video-input-dto.validation";


export const videosRouter = Router({});

videosRouter
    // Get All Videos
.get('',(req: Request, res)=>{
    res.status(HttpStatus.Success).send(db.videos);
})