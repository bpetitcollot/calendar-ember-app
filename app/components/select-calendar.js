import Component from '@ember/component';

export default Component.extend({
  selected: false,
  actions:{
    toggle(){
      this.set('selected', !this.selected);
      this.get(this.selected ? 'onAdd' : 'onRemove')(this.calendar);
    }
  }
});
