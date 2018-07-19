import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | calendar', function(hooks) {
  setupApplicationTest(hooks);

  test('Liste des calendriers', async function(assert) {
    await visit('/calendars');
    assert.equal(currentURL(), '/calendars', 'c\'était pas compliqué...');
  });
});
