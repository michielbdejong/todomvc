remoteStorage.defineModule('tasks', function(privateClient) {
  return {
    exports: {
      getTodos: function() {
        console.log('in getTodos, calling getAll');
        return privateClient.getAll('todos/');
      },
      setTodo: function(id, todo) {
        console.log('setTodo', id, todo);
        privateClient.storeObject('todo-list-item', 'todos/'+id, todo);
      },
      setTodoText: function(id, text) {
        privateClient.getObject('todos/'+id).then(function(obj) {
          obj.text = text;
          privateClient.storeObject('todo-list-item', 'todos/'+id, obj);
        });
      },
      setTodoCompleted: function(id, value) {
        privateClient.getObject('todos/'+id).then(function(obj) {
          obj.completed = value;
          privateClient.storeObject('todo-list-item', 'todos/'+id, obj);
        });
      },
      setAllTodosCompleted: function(value) {
        privateClient.getAll('todos/').then(function(objs) {
          for(var i in objs) {
            if(objs[i].completed != value) {
              objs[i].completed = value;
              privateClient.storeObject('todo-list-item', 'todos/'+i, objs[i]);
            }
          }
        });
      },
      removeTodo: function(id) {
        privateClient.remove('todos/'+id);
      },
      removeAllCompletedTodos: function() {
        privateClient.getAll('todos/').then(function(objs) {
          for(var i in objs) {
            if(objs[i].completed) {
              privateClient.remove('todos/'+i);
            }
          }
        });
      },
      onChange: function( cb ) {
        privateClient.on('change', cb);
      }
    }
  };
});
