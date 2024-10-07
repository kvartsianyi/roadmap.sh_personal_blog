export const authMiddleware = async (req, res, next) => {
	try {
		if (!req.headers?.authorization?.startsWith('Basic')) {
			throw new Error('Authorization header invalid');
		}
	
		const credentialsBase64 = req.headers?.authorization?.split(' ')[1];
		if (!credentialsBase64) {
			throw new Error('Empty credentials');
		}
	
		const credentialsStr = Buffer.from(credentialsBase64, 'base64').toString();
		const [login, password] = credentialsStr.split(':');
		const { LOGIN, PASSWORD } = process.env;
	
		if (login !== LOGIN || password !== PASSWORD) {
			throw new Error('Invalid credentials');
		}

		res.locals.isAuthorized = true;
	
		return next();
	} catch (e) {
		res.set('WWW-Authenticate', 'Basic realm="blog_app"');
		return res.sendStatus(401);
	}
};