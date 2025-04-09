// ToDoリストをサーバーから取得して表示する関数
async function getTodos() {
    const response = await fetch('/todos');  // サーバーからToDoリストを取得
    const todos = await response.json();  // JSONデータとしてレスポンスをパース
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';  // リストをクリア
  
    // 取得したToDoをリストに表示
    todos.forEach(todo => {
      const li = document.createElement('li');
      li.textContent = todo.task;  // タスク名を表示
      todoList.appendChild(li);  // リストに追加
    });
  }
  
  // 新しいToDoをサーバーに追加する関数
  async function addTodo() {
    const newTodo = document.getElementById('new-todo').value;  // 入力値を取得
    if (newTodo === '') return;
  
    await fetch('/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ task: newTodo, done: false })  // 新しいToDoを送信
    });
  
    document.getElementById('new-todo').value = '';  // 入力欄をクリア
    getTodos();  // 更新後にToDoリストを再表示
  }
  
  // ページ読み込み時にToDoリストを取得して表示
  window.onload = getTodos;

  // EnterキーでaddTodoを呼び出す
  document.getElementById('new-todo').addEventListener('keydown', function(event) {
    if (event.key === 'Enter' && !event.isComposing) {
      addTodo();
    }
  });