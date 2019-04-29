/* ローカルストレージ周りの実装
 *
 * Vue.jsの公式サンプルを参考にした
 * https://jp.vuejs.org/v2/examples/todomvc.html
 */
var STORAGE_KEY = 'cr-vue-tutorial-todo-list'
var todoStorage = {
  fetch: function() {
    var todos = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || '[]'
    )
    todos.forEach(function(todo, index) {
      todo.id = index
    })
    todoStorage.uid = todos.length
    return todos
  },
  save: function(todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }
}

const app = new Vue({
  el: '#app',
  data: {
    // 使用するデータ
  },
  methods: {
    // 使用するメソッド
  }
})
