var app = app || {}

app.AppView = Backbone.View.extend({
    el: "#todoapp",
    statsTemplate: _.template($('#stats-template').html()),
    events: {
        'keypress #new-todo': "createOnEnter",
        'click #toggle-all': "toggleAllComplete",
        'click #clear-completed': 'clearCompleted'
    },
    clearCompleted() {
        _.invoke(app.Todos.completed(), 'destroy');
    },
    toggleAllComplete() {
        let completed = this.allCheckbox.checked;
        app.Todos.each(todo => {
            todo.save({
                completed: completed
            })
        })
    },
    createOnEnter(event) {
        if (event.which !== 13) {
            return
        }
        app.Todos.create(this.newAttributes());
        this.$input.val("")
    },
    newAttributes() {
        return {
            title: this.$input.val(),
            completed: false,
            order: app.Todos.nextOrder()
        }
    },
    initialize() {
        this.allCheckbox = this.$('#toggle-all')[0];
        this.$main = this.$("#main");
        this.$footer = this.$("#footer");
        this.$input = this.$("#new-todo");
        this.listenTo(app.Todos, "add", this.addOne);
        this.listenTo(app.Todos, "reset", this.addAll);
        this.listenTo(app.Todos, "all", this.render);

        this.listenTo(app.Todos, "filter", this.filterAll)
        this.listenTo(app.Todos,"change:completed",this.filterOne)
        app.Todos.fetch();
    },
    filterAll() {
        app.Todos.each(this.filterOne,this)
    },
    filterOne( todo) {
        todo.trigger("visible");
    },
    addOne(todo) {
        var view = new app.TodoView({ model: todo });
        $("#todo-list").append(view.render().el);
    },
    addAll() {
        this.$("#todo-list").html(app.Todos.each(this.addOne, this));
    },
    render() {
        var completed = app.Todos.completed().length;
        var remaining = app.Todos.remaining().length;
        if (app.Todos.length) {
            this.$main.show();
            this.$footer.show();
            this.$footer.html(this.statsTemplate({ completed, remaining }))

        } else {
            this.$main.hide();
            this.$footer.hide()
        }
        this.$("#filters li a")
        .removeClass("selected")
        .filter('[href="#/'+(app.TodoFilter||'')+'"]' )
        .addClass("selected")
        this.allCheckbox.checked = !remaining;
    }
})