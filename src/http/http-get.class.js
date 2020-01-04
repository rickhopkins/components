import { HttpRequest } from './http-request.class.js';

export class HttpGet extends HttpRequest {
	constructor(url) {
		super('GET', url);
	}
}