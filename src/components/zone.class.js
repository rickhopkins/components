export class Zone {
	_id;
	_data;

	get id() {
		return this._id;
	};
	set id(id) {
		this._id = id;
	}
	get data() {
		return this._data;
	}
	set data(data) {
		this._data = data;
	}

	constructor(id, data) {
		this.id = id;
		this.data = data;
	}

	isEqual(data) {
		return JSON.stringify(data) === JSON.stringify(this.data);
	}
}