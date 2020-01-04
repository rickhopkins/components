export class Subscription {
	id = null;
	callback = null;
	topic = null;

	constructor(id, callback, topic) {
		this.id = id;
		this.callback = callback;
		this.topic = topic;
	}

	unsubscribe() {
		this.topic.unsubscribe(this.id);
	}
}