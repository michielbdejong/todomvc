remoteStorage.defineModule('tasks', function(privateClient) {
	return {
		exports: {
			getTodos: function() {
				return privateClient.getListing('todos/');
			},
			setTodos: function( todos ) {
				privateClient.getListing('todos/').then(function(existingTodos) {
				});
			}
		}
	};
});				
