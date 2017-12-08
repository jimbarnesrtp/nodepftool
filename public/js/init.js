const store = new Vuex.Store({
  state: {
    count: 0,
    players: [],
    currentPlayer: 0,
    playerUp: -1,
    round: 1,
    conditions: []
  },
  mutations: {
    increment (state) {
      state.count++
    },
    addPlayer(state) {
      state.players.push({ name: $('#name').val(), init: $('#init').val(), bonus: $('#bonus').val() });
      state.players.sort(function(a, b){return sortPlayers(a,b)});
      $('#name').val('');
      $('#init').val('');
      $('#bonus').val('');

    },
    setCurrentPlayer(state, n) {
      state.currentPlayer = n;
    },
    updatePlayer(state, n) {
      state.players[state.currentPlayer].bonus = n.bonus;
      state.players[state.currentPlayer].init = n.init;
      state.players.sort(function(a, b){return sortPlayers(a,b)});
    },
    reset(state) {
      var arrayLength = state.players.length;
      for (var i = 0; i < arrayLength; i++) {
         //state.players[i].bonus=0;
         state.players[i].init=0;
      } 
      state.playerUp = -1;
      state.round = 1;
      state.conditions = [];
    },
    clear(state) {
      state.players = [];
      state.playerUp = -1;
      state.round = 1;
      state.conditions = [];
    },
    changePlayer(state) {
      state.playerUp++;
      if(state.playerUp < state.players.length) {
        
      } else {
        state.playerUp = 0;
        state.round++;
        updateConditions();
      }
      
    },
    addCondition(state) {
      state.conditions.push({ player: $('#player').val(), name: $('#conName').val(), total: $('#rounds').val(), active:0 });
      $('#player').val('');
      $('#conName').val('');
      $('#rounds').val('');

    }
    
  },
  actions: {
    addPlayer (context) {      
      context.commit('addPlayer');
    },
    setCurrentPlayer (context, n) {
      context.commit('setCurrentPlayer', n);
    },
    updatePlayer (context, n) {
      context.commit('updatePlayer', n);
    },
    addCondition(context) {
      context.commit('addCondition');
    }
  }
})


Vue.component('modal', {
  template: '#modal-template',
  store,
  methods: { 
    save: function() {
      store.dispatch('updatePlayer', {
        init: $('#init2').val(),
        bonus: $('#bonus2').val()
      })
      //store.players.sort(function(a, b){return sortPlayers(a,b)});
    }
  },
  computed: {
    players () {
      return this.$store.state.players;
    },
    currentPlayer() {
      return this.$store.state.currentPlayer;
    }
  }
})

Vue.component('modal-reset', {
  template: '#modal-reset',
  store,
  methods: { 
    save: function() {
      store.dispatch('updatePlayer', {
        init: $('#init2').val(),
        bonus: $('#bonus2').val()
      })
      //store.players.sort(function(a, b){return sortPlayers(a,b)});
    },
    modalChangeCharacter(index) {
      this.save();
      store.dispatch('setCurrentPlayer', index);
    },
  },
  computed: {
    players () {
      return this.$store.state.players;
    },
    currentPlayer() {
      return this.$store.state.currentPlayer;
    },
    maxPlayers() {
      return this.$store.state.players.length-1;
    }
  }
})

var app4 = new Vue({
  el: '#app4',
  store,
  data: {
    showModal: false,
    showModalNewFight: false,
    statuses: ["Bleed", "Blinded", "Broken", "Confused", "Cowering","Dazed", "Dazzled", "Dead", "Deafened", "Disabled", "Dying",	"Energy Drained", "Entangled","Exhausted",
      "Fascinated", "Fatigued", "Flat-Footed", "Frightened", "Grappled", "Helpless", "Incorporeal", "Invisible", "Nauseated", "Panicked", "Paralyzed", "Petrified", "Pinned",
      "Poisoned", "Prone", "Shaken", "Sickened", "Sinking", "Stable", "Staggered", "Stunned", "Unconscious"],
  },
  methods: {
    openModal(index) {
       app4.showModal = true;
       store.dispatch('setCurrentPlayer', index);
    },
    openModalNewFight() {
      store.commit('reset');
      app4.showModalNewFight = true;
      store.dispatch('setCurrentPlayer', 0);
    },
    reset: function() {
       store.commit('reset');
    },
    clear: function() {
       store.commit('clear');
    },
    showNextPlayer() {
       store.commit('changePlayer');
    },
    readyPlayer(index) {
      if(index == this.$store.state.playerUp) {
        return true;
      } else {
        return false;
      }
    },
    addCondition() {
      store.dispatch('addCondition');
    },
    deletePlayer: function(index) {
      store.state.players.splice(index,1);
    }

  },
  computed: {
    players () {
      return this.$store.state.players;
    },
    currentPlayer() {

      return this.$store.state.currentPlayer;
    },
    round() {
      return this.$store.state.round;
    },
    conditions() {
      return this.$store.state.conditions;
    }
  }

})

var itemNum = 4;
var addPlayer = function() {
	store.dispatch('addPlayer');
}

var sortPlayers = function(a, b) {
  if(b.init==a.init) {
        return b.bonus-a.bonus;
    } else {
      return b.init-a.init;
    }

}
var updateConditions = function() {
   var arrayLength = store.state.conditions.length;
    for (var i = 0; i < arrayLength; i++) {
      if(store.state.conditions[i].active < store.state.conditions[i].total) {        
       store.state.conditions[i].active++;
      } else {
        store.state.conditions.splice(i,1);
      }
    }
}