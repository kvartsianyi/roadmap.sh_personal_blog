export const log = message => console.log(message);

export const wrapAsyncErrors = (controller) => async (req, res, next) => {
	try {
		await controller(req, res, next);
	} catch (e) {
		next(e);
	}
}