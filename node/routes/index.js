const fs = require('fs');
const path = require('path');
const exec = require('child_process').exec;
const Router = require('koa-router');
const router = new Router();
const log4js = require('log4js');
const log = log4js.getLogger();
log.level = 'debug';

const reloadNginx = () => {
	exec('"nginx -s reload"', (error, stdout, stderr) => {
		if (error) {
			log.error(error);
			return;
		}
		log.info(`stdout: ${stdout}`);
		log.info(`stderr: ${stderr}`);
	});
}

router.get('/', ctx => {
	ctx.type = 'html';
	ctx.body = fs.readFileSync(path.join(global.dir, 'views', 'index.html'));
});

router.get('/login', ctx => {
	ctx.cookies.set('uid', 'a001');
	reloadNginx();
	ctx.type = 'html';
	ctx.body = fs.readFileSync(path.join(global.dir, 'views', 'login.html'));
});

module.exports = router;
