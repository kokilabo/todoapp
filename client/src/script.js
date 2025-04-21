// ToDoリストをサーバーから取得して表示する関数
async function getTodos() {
    const response = await fetch('/todos');
    const todos = await response.json();
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = ''; 
  
    // 取得したToDoをリストに表示
    todos.forEach(todo => {
      const li = document.createElement('li');
      li.textContent = todo.task;
      todoList.appendChild(li);
    });
  }
  
  // 新しいToDoをサーバーに追加する関数
  async function addTodo() {
    const newTodo = document.getElementById('new-todo').value; 
    if (newTodo === '') return;
  
    await fetch('/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ task: newTodo, done: false })
    });
  
    document.getElementById('new-todo').value = '';
    getTodos(); 
  }
  
  // ページ読み込み時にToDoリストを取得して表示
  window.onload = getTodos;

  // EnterキーでaddTodoを呼び出す
  document.getElementById('new-todo').addEventListener('keydown', function(event) {
    if (event.key === 'Enter' && !event.isComposing) {
      addTodo();
    }
  });