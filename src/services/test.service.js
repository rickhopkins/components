import { injector, Injectable } from '../injection/index.js';

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

// injector.register(TestService, 'TestService');
const injectable = new Injectable('TestService', TestService);
injectable.setSingleton(false);
injector.register(injectable);