import * as Router from 'koa-router';

const router = new Router();

router.get('/', (ctx, next) => {
	ctx.body = 'Helloworld';
});

export default router;