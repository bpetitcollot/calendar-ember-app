import Route from '@ember/routing/route';

export default Route.extend({
        model(){
            var store = this.get('store');
            return store.findAll('calendar');
        }
});
