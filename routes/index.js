/* @flow */
const Router = require('koa-router');
const router = new Router();

router.get('/', (ctx, next) => {
	ctx.body = 'Helloworld';
});

module.exports = router;