import { HttpRequest } from './http-request.class.js';

export class HttpPost extends HttpRequest {
	constructor(url, body) {
		super('POST', url);
		this.body = body;
	}
}