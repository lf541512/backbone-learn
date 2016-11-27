var app=app||{}

app.TodoView=Backbone.View.extend({
    tagName:"li",
    events:{
        "click .toggle": "toggleCompleted",
         "click .destroy": "destroy",
         "dblclick label":"edit",
         "blur .edit":"close",
         'keypress .edit':'updateOnEnter'
    },
    edit(){
        this.$el.addClass("editting");
        this.$input.focus();
    },
    updateOnEnter(e){
        if(e.which===ENTER_KEY){
            this.close();
        }
    },
    close(){
        let value=this.$input.val();
        if(value){
            this.model.save({title:value})
        }
         this.$el.removeClass("editting");
    },
    initialize(){
        this.listenTo(this.model,"change",this.render)
        this.listenTo(this.model,"destroy",this.remove);
        this.listenTo(this.model,"visible",this.toggleVisible)
    },
    toggleVisible(){
this.$el.toggleClass("hidden",this.isHidden())
    },
    isHidden(){
        var isCompleted=this.model.get("completed");
        return (((!isCompleted)&&app.TodoFilter=="completed")||(isCompleted&&app.TodoFilter=="active"))
    },
    toggleCompleted(){
        this.model.toggle();
    },
    destroy(){
        this.model.destroy();
    },
    template:_.template($("#item-template").html()),
    render(){
        this.$el.html(this.template(this.model.attributes));
        this.toggleVisible();
        this.$input=this.$(".edit")
        return this
    }
})