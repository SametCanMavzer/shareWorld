const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../src/app');
const Post = require('../src/models/post');
const User = require('../src/models/user');
const jwt = require('jsonwebtoken');

let mongoServer;
let token;
let userId;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);

    const user = new User({
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User'
    });
    await user.save();
    userId = user._id;
    token = jwt.sign(
        { email: user.email, userId: user._id.toString() },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

beforeEach(async () => {
    await Post.deleteMany({});
});

describe('Feed Endpoints', () => {
    it('should create a new post', async () => {
        const res = await request(app)
            .post('/feed/post')
            .set('Authorization', 'Bearer ' + token)
            .send({
                title: 'Test Post',
                content: 'This is a test post',
                imageUrl: 'test-image.jpg'
            });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('post');
        expect(res.body.post.title).toEqual('Test Post');
        expect(res.body.post.content).toEqual('This is a test post');
    });

    it('should get posts', async () => {
        await Post.create({
            title: 'Test Post',
            content: 'This is a test post',
            imageUrl: 'test-image.jpg',
            creator: userId
        });

        const res = await request(app)
            .get('/feed/posts')
            .set('Authorization', 'Bearer ' + token);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('posts');
        expect(res.body.posts.length).toBeGreaterThan(0);
    });
});

