<template>
  <div id="app">
    <md-toolbar class="md-accent">
      <md-button class="md-icon-button" @click="showNavigation = true">
        <md-icon>menu</md-icon>
      </md-button>
      <h3 class="md-title">Vee Validate Address Book App</h3>
    </md-toolbar>
    <md-drawer :md-active.sync="showNavigation" md-swipeable>
      <md-toolbar class="md-transparent" md-elevation="0">
        <span class="md-title">Vee Validate Address Book App</span>
      </md-toolbar>

      <md-list>
        <md-list-item>
          <router-link to="/">
            <span class="md-list-item-text">Home</span>
          </router-link>
        </md-list-item>

        <md-list-item>
          <router-link to="/contact">
            <span class="md-list-item-text">Add Contact</span>
          </router-link>
        </md-list-item>

        <md-list-item>
          <router-link to="/about">
            <span class="md-list-item-text">About</span>
          </router-link>
        </md-list-item>
      </md-list>
    </md-drawer>
    <router-view />

    <footer class="footer">
      2020<a href="https://github.com/ksawl" class="creator">@creator</a>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'app',
  data: () => ({
    showNavigation: false,
  }),
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  height: 100%;
}
body {
  height: 100%;
  min-height: 100%;
}
#app {
  display: grid;
  grid-template-rows: 48px 1fr 40px;
  height: 100%;
}
.container {
    padding: 50px 0;
}
.center {
  text-align: center;
}
.footer {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  border-top: 1px solid #ccc;
}
</style>
