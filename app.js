import express from 'express';
// import { postsRouter } from './routes/index.js';
// import { commentsRouter } from './routes/index.js';
import cookieParser from 'cookie-parser';
import logMiddleware from './middlewares/log.middleware.js';
import ErrorHandlingMiddleware from './middlewares/error-handling.middleware.js';
import UsersRouter from './routes/users.router.js';
import PostsRouter from './routes/posts.router.js';
import CommentsRouter from './routes/comments.router.js';
import logMiddleware from './middlewares/log.middleware.js';


const app = express();
const PORT = 3017;



app.use(logMiddleware);
app.use(express.json());
app.use(cookieParser());
// app.use(express.urlencoded({ extended: true }));
// app.use('/api/posts', postsRouter);
// app.use('/api/posts', commentsRouter);
app.use('/api', [UsersRouter, PostsRouter, CommentsRouter]);
app.use(ErrorHandlingMiddleware);


app.get('/', (req, res) => {
  return res.json({ message: '우당탕탕 삼뿅알 화이팅!!><' });
});


app.listen(PORT, () => {
  console.log(PORT, '포트로 서버가 열렸어요!');
});
