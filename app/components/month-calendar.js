import Component from '@ember/component';
import {computed} from '@ember/object';
import DS from 'ember-data';

export default Component.extend({
  month: null,
  monthName: computed('month', function(){
    return ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'][this.month] + ' ' + this.year;
  }),
  year: null,
  otherCalendars: computed('calendars', 'calendar', function(){
    return this.calendars.filter(calendar => calendar !== this.calendar);
  }),
  selectedCalendars: [],
  allEvents: computed('calendar.events.[]', 'month', 'selectedCalendars.[]', function(){
    return DS.PromiseArray.create({
      promise: this.selectedCalendars.reduce((carry, calendar) => {
        return carry.then(events => {
          return calendar.get('events').then(e => {
            let allEvents = events.toArray();
            return allEvents.concat(e.toArray());
          });
        });
      }, this.calendar.get('events'))
    });
  }),
  monthArray: computed('allEvents', function(){
    return DS.PromiseArray.create({
      promise: this.allEvents.then(e => {
        let events = e.toArray();
        let today = new Date();
        if (this.month === null) this.set('month', today.getMonth());
        if (this.year === null) this.set('year', today.getFullYear());

        // first day to display
        let first = new Date();
        first.setDate(1);
        first.setMonth(this.month);
        first.setYear(this.year);
        while (first.getDay() !== 1)
        first = new Date(Date.parse(first) - 24*3600*1000);

        // last day to display
        let last = new Date();
        last.setDate(1);
        last.setMonth(this.month === 11 ? 0 : this.month + 1);
        last.setYear(this.month === 11 ? this.year + 1 : this.year);
        last = new Date(Date.parse(last) - 24*3600*1000);
        while (last.getDay() !== 0)
        last = new Date(Date.parse(last) + 24*3600*1000);

        // build month array
        let month = [];
        let week = [];
        let currentDay = first;

        while (currentDay <= last)
        {
          if (currentDay.getDay() === 1)
          {
            week = [];
            month.pushObject(week);
          }
          let day = {
            date: currentDay.getDate(),
            today: this.formatDate(currentDay) === this.formatDate(today),
            currentMonth: currentDay.getMonth() === this.month,
            events: []
          };
          // events of the day from current Calendar
          for (let i in events)
          {
            if (events[i].date === this.formatDate(currentDay)) day.events.pushObject({
              content: events[i],
              external: events[i].calendar.get('id') === this.calendar.get('id')
            });
          }
          week.pushObject(day);
          currentDay = new Date(Date.parse(currentDay) + 24*3600*1000);
        }
        return month;
      })
    });
  }),
  actions: {
    createEvent(date, month, year){
      let fullDate = new Date();
      fullDate.setDate(date);
      fullDate.setMonth(month);
      fullDate.setYear(year);
      this.get('onCreate')(this.formatDate(fullDate));
    },
    toPreviousMonth(){
      if (this.month === 0){
        this.set('month', 11);
        this.set('year', this.year - 1);
      }
      else{
        this.set('month', this.month - 1);
      }
    },
    toNextMonth(){
      if (this.month === 11){
        this.set('month', 0);
        this.set('year', this.year + 1);
      }
      else{
        this.set('month', this.month + 1);
      }
    },
    addCalendar(calendar){
      this.selectedCalendars.pushObject(calendar);
    },
    removeCalendar(calendar){
      this.selectedCalendars.removeObject(calendar);
    }
  },
  formatDate(date){
    return (date.getDate() >= 10 ? '' : '0')+date.getDate()+(date.getMonth() > 10 ? '/' : '/0')+(date.getMonth()+1)+'/'+date.getFullYear();
  },
});
