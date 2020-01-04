import { Subscription } from './subscription.class.js';

export class Topic {
	values = [];
	subscriptions = new Map();

	subscribe(callback) {
		/** create the subscription */
		const id = Date.now();
		const subscription = new Subscription(id, callback, this);
		this.subscriptions.set(id, subscription);

		/** fire the callback initially */
		callback.call(null, this.last());

		/** return the subscription */
		return subscription;
	}

	unsubscribe(subscription) {
		this.subscriptions.delete(subscription.id);
	}

	next(value) {
		this.values.push(value);

		/** fire callback for each subscription */
		this.subscriptions.forEach(subscription => {
			const callback = subscription.callback;
			callback.call(null, this.last());
		});
	}

	last() {
		if (this.values.length === 0) return null;
		return this.values[this.values.length - 1];
	}
}