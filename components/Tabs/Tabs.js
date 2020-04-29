Component({
    properties: {
        tabsList:{
            type:Array,
            value:[]
        }
    },
    data: {},
    methods: {
        changeActive(ev){
            const index = ev.currentTarget.dataset.index
            this.triggerEvent('changeItem',{index})
        }
    }
});
