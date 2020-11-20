import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: { id: 'abcd', name: 'abbbb' },
    categories: [
      'sustainability',
      'nature',
      'animal welfare',
      'housing',
      'education',
      'food',
      'community'
    ],
    events: [
      { id: 1, title: '...', organizer: '...' },
      { id: 2, title: '...', organizer: '...' },
      { id: 3, title: '...', organizer: '...' },
      { id: 4, title: '...', organizer: '...' }
    ]
    // todos: [
    //   { id: 1, text: '...', done: true },
    //   { id: 2, text: '...', done: false },
    //   { id: 3, text: '...', done: true },
    //   { id: 4, text: '...', done: false }
    // ]
  },
  mutations: {},
  actions: {},
  getters: {
    // catLength: state => {
    //   return state.categories.length
    // },
    // activeTodosCount: state => {
    //   return state.todos.filter(todo => !todo.done).length
    // }
    getEventById: state => id => {
      return state.events.find(event => event.id === id)
    }
  }
})
