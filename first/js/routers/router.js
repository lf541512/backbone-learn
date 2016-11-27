var app=app||{}

var Workspace=Backbone.Router.extend({
    routes:{
        '*f':"setFilter"
    },
    setFilter(param){
        console.log(param);
        if(param){
            param=param.trim();
        }
        app.TodoFilter=param||""
        app.Todos.trigger('filter')
    }
})
app.TodoRouter=new Workspace;
Backbone.history.start();