<template>
  <b-container>
    <div class="d-flex justify-content-between align-items-center">
      <b-form-group label-for="sessions" label="Выберите сессию:">
        <b-form-select id="sessions" v-model="selected" :options="sessionList" value-field="sessionId" text-field="name"></b-form-select>
        <span v-if="selected">         Время сессии: {{viewDate(enterTime)}} - {{viewDate(exitTime)}}</span>
      </b-form-group>
      <span v-if="saved" class="text-success">Сохранено</span>
    </div>
    <b-card no-body>
      <b-card-body>
        <b-card-text>
          <b-list-group>
            <b-list-group-item v-for="event in eventsBySession" :key="event.name" button class="d-flex justify-content-between align-items-center">
              <span>{{event.name}}</span>
              <span v-if="saved">{{event.sum}}</span>
              <div v-if="!saved">
                <b-form-spinbutton v-model="event.sum" min="-100" @change="changeSum(event)" inline></b-form-spinbutton>
                <b-button @click="delEvent(event)">Удалить</b-button>
              </div>
            </b-list-group-item>
          </b-list-group>
        </b-card-text>
        <b-dropdown v-if="selected && !saved" id="dropdown-dropup" dropup text="Добавить продукт" variant="primary" class="m-2">
          <b-dropdown-item-button v-for="name in allProducts" :key="name" @click="addEvent(name)">{{name}}</b-dropdown-item-button>
        </b-dropdown>
        <b-button v-if="selected && !saved" @click="saveEvents">Сохранить</b-button>
      </b-card-body>
    </b-card>
  </b-container>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
export default {
  name: 'NewrusCard',
  data() {
    return {
      selected: ''
    }
  },
  beforeMount() {
    this.$store.dispatch('getTurnstileList')
    this.$store.dispatch('getEventList')
  },
  methods: {
    saveEvents: function() {
      this.$store.commit('saveSession',this.selected)
    },
    changeSum: function(event) {
      this.$store.commit('editEvent',{id: this.lastEventId + 1, productName: event.name, sessionId: this.selected, productCount: event.sum})
      //console.log(event.name, event.sum, this.lastEventId)
    },
    addEvent: function(event) {
      this.$store.commit('addEvent',{id: this.lastEventId + 1, productName: event, sessionId: this.selected})
      //console.log(event)
    },
    delEvent: function(event) {
      console.log(event.name)
      this.$store.commit('deleteEvent',{name: event.name, sessionId: this.selected})
      //console.log(this.eventsBySession)
    },
    viewDate: function(value) {
      if (!value) return ''
      let tm = new Date(value)
      /*return tm.getDate().toString().padStart(2,'0') + '-' + (tm.getMonth()+1).toString().padStart(2,'0') + 
                '-' + tm.getFullYear() + ' ' + tm.getHours().toString().padStart(2,'0') + ':' + 
                tm.getMinutes().toString().padStart(2,'0')*/
      return tm.getHours().toString().padStart(2,'0') + ':' + tm.getMinutes().toString().padStart(2,'0') +
            ':' + tm.getSeconds().toString().padStart(2,'0')
    }
  },
  computed: {
    ...mapState(['turnstileList','eventList']),
    ...mapGetters(['allProducts','lastEventId']),
    enterTime: function() {
      if (this.selected) {
        return this.turnstileList.find(el => el.sessionId == this.selected && el.type == 'open').timestamp
      }
      return ''
    },
    exitTime: function() {
      if (this.selected) {
        return this.turnstileList.find(el => el.sessionId == this.selected && el.type == 'exit').timestamp
      }
      return ''
    },
    sessionList: function() {
      let res = []
      for (let i=0; i < this.$store.getters.sessionList.length; i++) {
        res.push({sessionId: this.$store.getters.sessionList[i], name: `Сессия ${i+1}`})
      }
      //console.log(res)
      return res
    },
    eventsBySession: function() {
      let arr = this.$store.getters.eventsBySession(this.selected)
      let names = [...new Set(arr.map(e => e.productName))] 
      let res = []
      for (let i = 0; i < names.length; i++) {
        res.push({name: names[i], sum: this.$store.getters.productSum({name: names[i], sessionId: this.selected})})
      }
      res.sort((a,b) => a.name > b.name ? 1 : a.name < b.name ? -1 : 0)
      //console.log(res)
      return res;
    },
    saved: function() {
      return this.$store.getters.saved(this.selected)
    }
  }
}
</script>