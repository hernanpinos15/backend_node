const sinon = require('sinon');

const { moviesMock, filteredMoviesMock } = require('./movies');

const getAllStub = sinon.stub();
getAllStub.withArgs('movies').resolves(moviesMock);

const tagQuery = { tags: { $in: ["Drama"] } }
getAllStub.withArgs('movies', tagQuery).resolves(filteredMoviesMock('Drama'));

const createStub = sinon.stub().resolves(moviesMock[0].id);

class MongoLibMock {
    getAll(collecion, query) {
        return getAllStub(collecion, query);
    }
    create(collecion, data) {
        return createStub(collecion, data);
    }
}

module.exports = {
    getAllStub,
    createStub,
    MongoLibMock
}

