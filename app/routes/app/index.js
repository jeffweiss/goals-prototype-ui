import Ember from 'ember';

const { RSVP, inject } = Ember;

export default Ember.Route.extend({
  flashMessages: inject.service(),
  actions: {
    createGoal() {
      let data = this.get('currentModel.newGoal');
      let goal = this.store.createRecord('goal', {name: data.name});

      this.set('currentModel.newGoal.errors', []);

      goal.save().then(() => {
        this.get('flashMessages').success(`Created goal: ${data.name}`);
        this.set('currentModel.newGoal.name', '');
      }).catch((err) => {
        this.store.unloadRecord(goal);
        this.set('currentModel.newGoal.errors', (err.errors || []).mapBy('detail'));
        this.get('flashMessages').danger(`Problem creating goal: ${data.name}`);
      });
    },
    removeGoal(goal) {
      if (window.confirm('Are you sure?')) {
        goal.destroyRecord().then(() => {
          this.get('flashMessages').success(`Deleted goal: ${goal.get('name')}`);
        }).catch(() => {
          this.get('flashMessages').danger(`Problem deleting goal: ${goal.get('name')}`);
        });
      }
    }
  },
  model() {
    return RSVP.hash({
      goals: this.store.findAll('goal'),
      newGoal: {name: '', errors: []}
    });
  }
});
