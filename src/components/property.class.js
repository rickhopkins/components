let _value = null;

export class Property {
	get value() {
		return _value;
	}

	set value(value) {
		if (this.type === 'string' && typeof value !== 'string') _value = Property.toString(value);
		else if ((this.type === 'int' || this.type === 'number') && typeof value !== 'number') _value = Property.toInt(value);
		else if (this.type === 'decimal' && typeof value !== 'number') _value = Property.toDecimal(value);
		else if (this.type === 'boolean' && typeof value !== 'boolean') _value = Property.toBoolean(value);
		else if (this.type === 'object') _value = Property.toObject(value);
		else _value = value;
	}

	constructor(name, type = 'string') { // = 'string' | 'int' | 'decimal' | 'number' | 'boolean' | 'object'
		this.name = name;
		this.type = type;
	}

	static toInt(value) {
		return parseInt(value);
	}

	static toDecimal(value) {
		return parseFloat(value);
	}

	static toObject(value) {
		return JSON.parse(value);
	}

	static toString(value) {
		return JSON.stringify(value);
	}

	static toBoolean(value) {
		if (['true', true, '1', 1].includes(value)) return true;
		return false;
	}
}