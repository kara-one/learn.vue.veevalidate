<template>
  <div class="about md-layout md-alignment-center">
    <div
      class="container md-layout-item md-xlarge-size-60 md-large-size-70 md-medium-size-80 md-small-size-80 md-xsmall-size-90"
    >
      <h1 class="md-display-2">About history this project</h1>

      <p
        class="md-subheading"
      >I was looking for a beautiful solution for data exchange with REST via axios and I found this article . I put together an example for this article, but I had to correct and supplement it</p>

      <div class="viewport">
        <md-toolbar :md-elevation="1">
          <span class="md-title">Used technology:</span>
        </md-toolbar>
        <md-toolbar :md-elevation="1">
          <span
            class="md-subheading"
          >vue-cli, vee-validate, vue-material, vue-router, vuex, axios, json-server</span>
        </md-toolbar>
      </div>

      <br />
      <div class="viewport">
        <md-toolbar :md-elevation="1">
          <span class="md-title">Update:</span>
        </md-toolbar>
        <md-toolbar :md-elevation="1">
          <span class="md-subheading">Migrate to vue-material 3.3.9</span>
        </md-toolbar>
      </div>

      <br />
      <div class="viewport">
        <md-toolbar :md-elevation="1">
          <span class="md-title">Links:</span>
        </md-toolbar>

        <md-list>
          <md-list-item>
            <md-icon>bookmark</md-icon>
            <span class="md-list-item-text">
              <a
                href="https://medium.com/swlh/how-to-use-async-and-await-with-vue-js-apps-33132aa0838b"
              >Original article</a>
            </span>
          </md-list-item>
          <md-list-item>
            <md-icon>backup</md-icon>
            <span class="md-list-item-text">
              <a href="https://ksawl.github.io/learn.vue.veevalidate/">Local-mirror of article</a>
            </span>
          </md-list-item>
          <md-list-item>
            <md-icon>move_to_inbox</md-icon>
            <span class="md-list-item-text">
              <a href="https://github.com/ksawl/learn.vue.veevalidate">Source-code on GitHub</a>
            </span>
          </md-list-item>
        </md-list>
      </div>

      <br />
      <div class="viewport">
        <md-toolbar :md-elevation="1">
          <span class="md-title">Start project view:</span>
        </md-toolbar>

        <md-list>
          <md-list-item>
            <md-subheader>Project setup</md-subheader>
            <span class="md-list-item-text">npm install</span>
          </md-list-item>
          <md-list-item>
            <md-subheader>Compiles and hot-reloads for development</md-subheader>
            <span class="md-list-item-text">npm run serve</span>
          </md-list-item>
          <md-list-item>
            <md-subheader>Compiles and minifies for production</md-subheader>
            <span class="md-list-item-text">npm run build</span>
          </md-list-item>
          <md-list-item>
            <md-subheader>Lints and fixes files</md-subheader>
            <span class="md-list-item-text">npm run lint</span>
          </md-list-item>
          <md-list-item>
            <md-subheader>Run json-server</md-subheader>
            <span class="md-list-item-text">npm run rest</span>
          </md-list-item>
        </md-list>
      </div>
    </div>
  </div>
</template>
