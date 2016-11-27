var app=app||{}

var TodoList=Backbone.Collection.extend({
    model:app.Todo,
    localStorage:new Backbone.LocalStorage("todos-backbone"),
    nextOrder(){
        if(!this.length){
            return 1
        }
        return this.last().get("order")+1;
    },
    completed(){
        return this.filter((todo)=>{
            return todo.get("completed")
        })
    },
    remaining(){
        return this.without.apply(this,this.completed());
    }
})
app.Todos=new TodoList();