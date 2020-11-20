# State & Getters

## コンポーネントから `state` にアクセスする方法

```js
<template>
  <h1>Create Event, {{ $store.state.user.name }}</h1>
</template>
```

### 1 つのコンポーネント内の複数箇所でアクセスする場合、 `computed` を使う

```js
computed: {
  userName() {
    return this.$store.state.user.name
  }
}
```

```html
<h1>Create an Event, {{ userName }}</h1>
<p>This event is created by {{ userName }}</p>
```

### 1 つのコンポーネント内で複数の state にアクセスする場合、 `mapState` を使う

```js
state: {
  user: { id: 'abc123', name: 'Adam Jahr' },
  categories: ['sustainability', 'nature', 'animal welfare', 'housing', 'education', 'food', 'community']
}
```

```js
import { mapState } from 'vuex'
computed: mapState({
  userName: state => state.user.name,
  categories: state => state.categories
})
```

簡潔に書く

```js
computed: mapState({
  userName: state => state.user.name,
  categories: 'categories' // <-- simplified syntax for top-level State
})
```

さらに簡潔に

```js
computed: mapState(['categories', 'user'])
```

### state そのものではなく、state の属性？にアクセスしたい場合

length の場合

```js
this.$store.state.categories.length
```

複数のコンポーネントで利用したい場合、store.js で加工したものを渡すようにする

```js
getters: {
  catLength: state => {
    return state.categories.length
  }
}
```

コンポーネント側では `getters` を通して受け取る

```js
computed: {
  catLength() {
    return this.$store.getters.catLength
  }
}
```

### ほかの Getter を通した getters も作れる

state

```js
todos: [
  { id: 1, text: '...', done: true },
  { id: 2, text: '...', done: false },
  { id: 3, text: '...', done: true },
  { id: 4, text: '...', done: false }
]
```

`done` のものだけを取得する

```js
getters: {
  doneTodos: state => {
    return state.todos.filter(todo => todo.done)
  }
}
```

未完了の ToDo の数を出す

```js
getters: {
  ...
  activeTodosCount: (state, getters) => {
    return state.todos.length - getters.doneTodos.length
  }                            ^^^^^^^^
}
```

以上は説明用で、本来は以下のように書く

```js
getters: {
  activeTodosCount: state => {
    return state.todos.filter(todo => !todo.done).length
  }
}
```

## ダイナミック Getters

パラメーターを渡すことで、state を取得するには、戻り値を関数にする

```js
getters: {
  getEventById: state => id => {
    return state.events.find(event => event.id === id)
  }
}
```

コンポーネント側

```js
computed: {
  getEvent() {
    return this.$store.getters.getEventById
  }
}
```

```html
<p>{{ getEvent(1) }}</p>
```

注意：この関数呼び出しは、毎回行われて結果はキャッシュされない

## `mapGetters`

コンポーネントで `mapGetters` を使うことができる

```js
import { mapGetters } from 'vuex'

...
    computed: mapGetters([
      'categoriesLength',
      'getEventById'
    ])
```

これで getters とコンポーネントを紐づけて、 computed プロパティとしてコンポーネントで利用できる

getters をリネームすることもできる

```js
computed: mapGetters({
  catCount: 'categoriesLength',
  getEvent: 'getEventById'
})
```

スプレッド演算子で、ローカルな computed プロパティと一緒に記述できる

```js
computed: {
  localComputed() { return something }
  ...mapGetters({
    catCount: 'categoriesLength',
    getEvent: 'getEventById'
  })
}
```
