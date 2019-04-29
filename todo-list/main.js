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
    todos: [],
    options: [
      { value: -1, label: 'すべて' },
      { value: 0,  label: '作業中' },
      { value: 1,  label: '完了'   }
    ],
    current: -1
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
  computed: {
    filteredTodos: function() {
      return this.todos.filter(function(el) {
        return this.current < 0 ? true : this.current == el.state
      }, this)
    },
    // キーから見つけやすいように、次のように加工したデータを作成
    // {0: '作業中', 1: '完了', -1: 'すべて'}
    labels() {
      return this.options.reduce(function(a, b) {
        return Object.assign(a, { [b.value]: b.label })
      }, {})
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
    },
    changeState: function(item) {
      item.state = item.state ? 0 : 1
    },
    removeComment: function(item) {
      var index = this.todos.indexOf(item)
      this.todos.splice(index, 1)
    }
  }
})
