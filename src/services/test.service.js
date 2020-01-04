import { injector, Injectable } from '../injection/index.js';
import { HttpGet } from '../http/http-get.class.js';

export class TestService {
	values = ['one', 'two', 'three'];
	isTrue = false;

	getValues() {
		return this.values;
	}

	getValue(index) {
		return this.values[index];
	}

	getUsers() {
		return new HttpGet('/data/users.json').send();
	}
}

// injector.register(TestService, 'TestService');
const injectable = new Injectable('TestService', TestService);
injectable.setSingleton(false);
injector.register(injectable);