import { injector } from '../injection/injector.class.js';

export class TestService {
	values = ['one', 'two', 'three'];
	isTrue = false;

	getValues() {
		return this.values;
	}

	getValue(index) {
		return this.values[index];
	}
}

injector.bind('TestService', TestService);