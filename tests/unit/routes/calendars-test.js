import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | calendars', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:calendars');
    assert.ok(route);
  });
});
