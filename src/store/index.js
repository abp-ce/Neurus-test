import axios from 'axios';
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    turnstileList: [],
    eventList: [],
    savedSessions: []
  },
  mutations: {
    initTurnstileList(state, data) {
      //console.log(data)
      state.turnstileList = data
    },
    initEventList(state, data) {
      //console.log(data)
      state.eventList = data
    },
    saveSession(state, data) {
      state.savedSessions.push(data)
    },
    addEvent(state,data) {
      state.eventList.push({
        "id": data.id,
        "type": "put_on",
        "timestamp": Date.now(),
        "productName": data.productName,
        "productCount": 1,
        "sessionId": data.sessionId
      })
    },
    editEvent(state, data) {
      state.eventList = state.eventList.filter(e => !(e.productName == data.productName && e.sessionId == data.sessionId))
      state.eventList.push({
        "id": data.id,
        "type": "put_on",
        "timestamp": 1634623963,
        "productName": data.productName,
        "productCount": data.productCount,
        "sessionId": data.sessionId
      })
    },
    deleteEvent(state, data) {
      //console.log(data.name,data.sessionId)
      state.eventList.map(e => {
        if (e.productName == data.name && e.sessionId == data.sessionId) {
          e.sessionId = ''
          e.productCount = 0
          e.id = 0
        }
      })
    }
  },
  actions: {
    getTurnstileList({commit}) {
      axios.get("trunstile-events.json").then(response => commit('initTurnstileList',response.data))
    },
    getEventList({commit}) {
      axios.get("events.json").then(response => commit('initEventList',response.data));
    }
  },
  getters: {
    sessionList: state => [...new Set(state.turnstileList.map(t => t.sessionId))],
    //enterTime: state => payload => state.turnstileList.find((el) => el.sessionId == payload && el.type == 'open').timestamp,
    eventsBySession: state => payload => state.eventList.filter(e => e.sessionId == payload),
    allProducts: state => [...new Set(state.eventList.map(e => e.productName))],
    productSum: state => payload => state.eventList.reduce((acc,el) => {
      if (el.productName == payload.name && el.sessionId == payload.sessionId) return acc += el.productCount
      return acc
    },0),
    lastEventId: state => Math.max(...state.eventList.map(e => e.id)),
    saved: state => payload => state.savedSessions.includes(payload)
  },
  modules: {
  }
})
