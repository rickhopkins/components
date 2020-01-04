import { Topic } from '../pubsub/index.js';
import { httpInterceptors } from './http-interceptor.class.js';

const initializeRequest = (method, url) => {
	const xhr = new XMLHttpRequest();
	xhr.open(method, url);
	return xhr;
};

const executeRequest = (xhr, body = null) => {
	/** serialize the body */
	if (body !== null) body = JSON.stringify(body);

	/** execute interceptors */
	httpInterceptors.forEach(interceptor => interceptor.intercept(xhr));

	/** send the request */
	xhr.send(body);
};

export class HttpRequest {
	url = null;
	method = null;
	xhr = null;
	body = null;

	constructor(method, url) {
		this.method = method;
		this.url = url;
		this.xhr = initializeRequest(method, url);
	}

	getXHR() {
		return this.xhr;
	}

	send() {
		/** create a topic for subscribing to */
		const topic = new Topic();

		/** prepare the request */
		this.xhr.onload = () => topic.next(JSON.parse(this.xhr.responseText));
		this.xhr.onerror = () => topic.onError(this.xhr.responseText);

		/** send the request */
		executeRequest(this.xhr, this.body);

		/** return the topic */
		return topic;
	}
}