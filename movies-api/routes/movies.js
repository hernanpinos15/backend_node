const express = require('express');
const MovieService = require('../services/movies');
const {
    movieIdSchema,
    createMovieSchema,
    updateMovieSchema
} = require('../utils/schemas/movies');

const validationHandler = require('../utils/middleware/validationHandler');
const cacheResponse = require('../utils/cacheResponde');
const {
    FIVE_MINUTES_IN_SECONDS,
    SIXTY_MINUTES_IN_SECONDS
} = require('../utils/time');

function moviesApi(app) {
    const router = express.Router();
    app.use("/api/movies", router);

    const moviesService = new MovieService();

    router.get("/", async function (req, res, next) {
        cacheResponse(res, FIVE_MINUTES_IN_SECONDS);
        const { tags } = req.query;
        try {
            const movies = await moviesService.getMovies({ tags });
            res.status(200).json({
                data: movies,
                message: 'movies listed'
            })
        } catch (err) {
            next(err);
        }
    });

    router.get("/:movieId", validationHandler({ movieId: movieIdSchema }, 'params'), async function (req, res, next) {
        cacheResponse(res, SIXTY_MINUTES_IN_SECONDS);
        const { movieId } = req.params;

        try {
            const movies = await moviesService.getMovie({ movieId });

            res.status(200).json({
                data: movies,
                message: 'movie retrieved'
            })
        } catch (err) {
            next(err);
        }
    });

    router.post("/", validationHandler(createMovieSchema), async function (req, res, next) {
        const { body: movie } = req;
        try {
            const createMovieId = await moviesService.createMovie({ movie });

            res.status(201).json({
                data: createMovieId,
                message: 'movie created'
            })
        } catch (err) {
            next(err);
        }
    });

    router.put("/:movieId", validationHandler({ movieId: movieIdSchema }, 'params'), validationHandler(updateMovieSchema), async function (req, res, next) {
        const { movieId } = req.params;
        const { body: movie } = req;
        try {
            const updateMovieId = await moviesService.updateMovie({ movieId, movie });

            res.status(200).json({
                data: updateMovieId,
                message: 'movie updated'
            })
        } catch (err) {
            next(err);
        }
    });

    router.delete("/:movieId", validationHandler({ movieId: movieIdSchema }, 'params'), async function (req, res, next) {
        const { movieId } = req.params;
        try {
            const deleteMovieId = await moviesService.deleteMovie({ movieId });

            res.status(200).json({
                data: deleteMovieId,
                message: 'movie deleted'
            })
        } catch (err) {
            next(err);
        }
    });

    // router.patch("/:movieId", async function (req, res, next) {
    //     const { movieId } = req.params;
    //     const { body: movie } = req;
    //     try {
    //         const replacedMovieId = await moviesService.replaceMovie({ movieId, movie });

    //         res.status(200).json({
    //             data: replacedMovieId,
    //             message: 'movie replaced'
    //         })
    //     } catch (err) {
    //         next(err);
    //     }
    // });
}

module.exports = moviesApi;