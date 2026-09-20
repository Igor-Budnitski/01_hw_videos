import request from 'supertest';
import express from "express";
import {setupApp} from "../../src/setup-app";
import {CreateVideoInputDto} from '../../src/videos/dto/createVideoInputDto';
import {HttpStatus} from "../../src/core/types/http-statuses";
import {Resolutions} from "../../src/videos/types/video";

describe("Video API", () => {
    const app = express();
    setupApp(app);

    const testVideoData: CreateVideoInputDto = {
        title: "Test title",
        author: "Author",
        availableResolutions: [Resolutions['P240']]
    };

    beforeAll(async () => {
        await request(app).delete('/testing/all-data').expect(HttpStatus.NoContent);
    })

    it('should  create a video; POST /videos', async () => {
        const newVideo: CreateVideoInputDto = {
            ...testVideoData,
            title: 'Test title_1',
            author: "Author_1",
            availableResolutions: [Resolutions['P240']]
        };

        await request(app)
            .post('/videos')
            .send(newVideo)
            .expect(HttpStatus.Created);
    });

    it('should create a video; POST /videos', async () => {
        const newVideo: CreateVideoInputDto = {
            ...testVideoData,
            title: 'Test title POST',
            author: "Author_1_POST",
            availableResolutions: [Resolutions['P240']]
        }

        await request(app)
            .post('/videos')
            .send(newVideo)
            .expect(HttpStatus.Created);
    })

    it('should return videso list; GET /videos', async () => {
        await request(app)
            .post('/videos')
            .send({...testVideoData, title: 'Another Title'})
            .expect(HttpStatus.Created);

        await request(app)
            .post('/videos')
            .send({...testVideoData, title: 'Another Title_2'})
            .expect(HttpStatus.Created);

        const videoResponse = await request(app)
            .get('/videos')
            .expect(HttpStatus.Success);

        expect(videoResponse.body).toBeInstanceOf(Array);
    });
})