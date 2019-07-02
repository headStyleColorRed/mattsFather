<template>
  <div>
    <v-toolbar dense flat dark class="toolbar">
      <v-toolbar-side-icon v-on:click="drawer = !drawer" class="appMenu hidden-md-and-up"></v-toolbar-side-icon>
      <v-spacer></v-spacer>
      <v-list-tile-title v-on:click="home()" style="textAlign:center" class="menus hidden-md-and-up">Jelly Bijl</v-list-tile-title>

      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn to="/" class="menus" flat>Home</v-btn>
        <v-btn to="/biografia" class="menus" flat>Biography</v-btn>
        <v-btn to="/changeBooks" class="menus" flat>Books</v-btn>
        <v-btn to="/newBook" class="menus" flat>New Book</v-btn>
        <v-btn to="/contactRodrigo" class="menus" flat>Contact Rodrigo</v-btn>
      </v-toolbar-items>
      <v-spacer></v-spacer>
    </v-toolbar>

    <v-navigation-drawer v-model="drawer" fixed dark disable-resize-watcher>

      <v-list class="pt-0" dense>
        <v-divider></v-divider>

        <v-list-tile
          v-on:click="enviar(item.title)"
          class="mt-3 pointerss"
          v-for="item in items"
          :key="item.title"
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      items: [
        { title: "Reviews", icon: "chrome_reader_mode" },
        { title: "Comparativas", icon: "compare_arrows" },
        { title: "Tutoriales", icon: "fa-graduation-cap" },
        { title: "Biografías", icon: "fa-gopuram" }
      ],
      right: null
    };
  },
  methods: {
    home() {
      this.$router.push("/");
    },
    enviar(event) {
      if (event == "Reviews") {
        this.$router.push("/reviews");
      } else if (event == "Comparativas") {
        this.$router.push("/comparativas");
      } else if (event == "Tutoriales") {
        this.$router.push("/tutoriales");
      } else if (event == "Biografías") {
        this.$router.push("/biografias");
      }
    }
  }
};
</script>




<style scoped>
.toolbar {
  position: fixed;
  z-index: 5;
  color: rgb(245, 245, 245);
  font-family: lato;
  letter-spacing: 1px;
}

.menus {
  font-family: lato;
}

.menus img {
  height: 20px;
}

.appMenu {
  color: beige;
}

.pointerss {
  cursor: pointer;
}
</style>
