import Component from '@ember/component';

export default Component.extend({
  actions:{
    remove:function(){
      this.event.deleteRecord();
      this.event.save();
    }
  }
});
