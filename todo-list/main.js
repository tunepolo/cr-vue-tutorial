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
    todos: []
  },
  created() {
    // インスタンス作成時にローカルストレージから保存データを取得する
    this.todos = todoStorage.fetch()
  },
  watch: {
    todos: {
      handler: function(todos) {
        todoStorage.save(todos)
      },
      deep: true
    }
  },
  methods: {
    addComment: function(event, value) {
      var comment = this.$refs.comment
      if (!comment.value.length) {
        return
      }
      this.todos.push({
        id: todoStorage.uid++,
        comment: comment.value,
        state: 0
      })
      // 入力欄を空にする
      comment.value = ''
    }
  }
})
