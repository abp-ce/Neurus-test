<template>
  <b-container>
    <b-navbar>
      <!--b-nav><b-nav-item v-b-toggle.sessions class="float-left">Sessions</b-nav-item></b-nav-->
      <b-navbar-brand to="/">Neurus</b-navbar-brand>
      <!--b-button v-b-toggle.sessions class="float-left">Sessions</b-button-->
      <b-navbar-nav class="ml-auto">
        <b-nav-text v-if = "this.$store.state.changed" class="text-danger">Изменено</b-nav-text>
        <b-nav-text v-if = "!this.$store.state.changed">Сохранено</b-nav-text>
        <!--b-nav-item v-if = "!this.$store.getters.isLoggedIn" to="/login/reg">Register</b-nav-item>
        <b-nav-item v-if = "!this.$store.getters.isLoggedIn" to="/login/log">Login</b-nav-item-->
      </b-navbar-nav>
      <!--b-nav><b-nav-item v-b-toggle.personal class="float-left">Personal List</b-nav-item></b-nav>
      <b-button v-b-toggle.personal class="float-right">Personal</b-button-->
    </b-navbar>
    <router-view/>
  </b-container>
</template>
<!--template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template-->

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
