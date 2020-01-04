import { Subscription } from './subscription.class.js';

export class Topic {
	values = [];
	subscriptions = {};

	subscribe(callback) {
		/** create the subscription */
		const id = Date.now();
		const subscription = new Subscription(id, callback, this);
		this.subscriptions[id] = subscription;

		/** fire the callback initially */
		callback.call(null, this.values[this.values.length - 1])

		/** return the subscription */
		return subscription;
	}

	unsubscribe(subscription) {
		delete this.subscriptions[subscription.id];
	}
}