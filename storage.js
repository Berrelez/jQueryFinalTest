(function () {

	var STORAGE_ID = 'todo-store';
	var tasks = JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');

	function newId(callback) {
		if (callback && typeof callback === 'function') {
			newCallbackId(callback); 
		}
		else {
			return newPromiseId();
		}
	}	

	function newCallbackId(callback) {

		$.get('http://guid.setgetgo.com/get.php', function (data) {
			callback(data.replace('{', '').replace('}', ''));
		});
	}

	function newPromiseId() {

		var dfd = jQuery.Deferred();

		$.when($.get('http://guid.setgetgo.com/get.php'))
			.then(function (data, status) {
				dfd.resolve(data.replace('{', '').replace('}', ''));
			})
			.fail(function (err) {
				console.log(err);
				dfd.reject(err);
			});

		return dfd.promise();
	}

	function list() {
		return tasks;
	}

	function add(task) {

		tasks.push(task);
		saveToLocalStorage();

		return tasks;
	}

	function update(task) {

		var original = tasks.find(function (item) {
			return item.id === task.id;
		});	

		Object.assign(original, task);

		saveToLocalStorage();

		return tasks;
	}

	function remove(id) {

		tasks = tasks.filter(function (item) {
			return item.id !== id;
		});

		saveToLocalStorage();

		return tasks;
	}

	function saveToLocalStorage() {
		localStorage.setItem(STORAGE_ID, JSON.stringify(tasks));
	}

	window.todoStore = {
		newId: newId,
		list: list,
		add: add,
		update: update,
		remove: remove
	};

})();