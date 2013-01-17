remoteStorage.defineModule('tasks', function(privateClient) {
  return {
    exports: {
      getTodos: function() {
        console.log('in getTodos, calling getAll');
        return privateClient.getAll('todos/').then(function(objs) {
          console.log('in getAll promise');
          var arr = [];
          for(var i in objs) {
            arr.push(objs[i]);
          }
          return arr;
        });
      },
      setTodos: function(todos) {
        return privateClient.getAll('todos/').then(function(existingTodos) {
          for(var i=0; i<todos.length; i++) {
            if(existingTodos[todos[i].id]) {
              console.log('setTodos:have '+todos[i].id);
              delete existingTodos[todos[i]];
            } else {
              console.log('setTodos:add '+todos[i].id);
              privateClient.storeObject('todos/'+todos[i].id, todos[i]);
            }
          }
          for(var i in existingTodos) {
            console.log('setTodos:remove '+todos[i].id);
            privateClient.remove('todos/'+i);
          }
        });
      },
      onChange: function( cb ) {
        privateClient.on('change', cb);
      }
    }
  };
});
