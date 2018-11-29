global.dir = __dirname;

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const log4js = require('log4js');

const log = log4js.getLogger();
log.level = 'debug';
const resLog = async (ctx, next) => {
	const start = Date.now();
	await next();
	const ms = Date.now() - start;
	const bytes = ctx.response.header['content-length'] || 0;
	log.info(`${ctx.method} ${ctx.url} ${ctx.response.status} ${bytes}bytes ${ms}ms`);
}

const normalizePort = val => (parseInt(val));
const port = normalizePort(process.env.PORT || 3000);

const router = require('./routes');
const app = new Koa();
app.use(resLog);
app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());
app.listen(port);

log.info('Nginx-node is starting at port ' + port);
