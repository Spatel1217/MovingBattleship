const Counter = {
    data() {
        return {
            counter: 0
        }
    },
    mounted() {
        setInterval(() => {
            this.counter++
        }, 1000)
    }
}
Vue.createApp(Counter).mount('#counter')

const AttributeBinding = {
    data() {
        return {
            message: 'You loaded this page on ' + new Date().toLocaleString()
        }
    }
}
Vue.createApp(AttributeBinding).mount('#bind-attribute')

const EventHandling = { //use this button functionality to react to the text
    data() {
        return {
            message: 'Hello Vue.js!'
        }
    },
    methods: {
        reverseMessage() {
            this.message = this.message
                .split('')
                .reverse()
                .join('')
        }
    }
}
Vue.createApp(EventHandling).mount('#event-handling')

const TwoWayBinding = { //use this to hold the text box
    data() {
        return {
            message: 'Hello Vue!'
        }
    }
}
Vue.createApp(TwoWayBinding).mount('#two-way-binding')

const ConditionalRendering = {
    data() {
        return {
            seen: true
        }
    }
}
Vue.createApp(ConditionalRendering).mount('#conditional-rendering')

const ListRendering = {
    data() {
        return {
            todos: [
                { text: 'Learn JavaScript' },
                { text: 'Learn Vue' },
                { text: 'Build something awesome' }
            ]
        }
    }
}
Vue.createApp(ListRendering).mount('#list-rendering')

const TodoList = {
    data() {
        return {
            groceryList: [
                { id: 0, text: 'Vegetables' },
                { id: 1, text: 'Cheese' },
                { id: 2, text: 'Whatever else humans are supposed to eat' }
            ]
        }
    }
}

const app = Vue.createApp(TodoList)

app.component('todo-item', {
    props: ['todo'],
    template: `<li>{{ todo.text }}</li>`
})

app.mount('#todo-list-app')


const TextBox = {
    data() {
        return {
            message: "hi",
            response: "yo"
        }
    },
    methods: { //create a list with vue (?) use input and the push method to push our message into the list, have it displayed
        confirmation() {
            this.response = "your command has been read soldier: " + this.message // not using current user input
        }
    }
}

Vue.createApp(TextBox).mount('#command-box')