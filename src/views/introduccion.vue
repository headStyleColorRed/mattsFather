<template>
  <div class="introduccion">
    <navbar/>
    <div class="introduccionWrapper">
      <h1> WELCOME MR. BIJL</h1>
      <h4>What would you like to change?</h4>
      <div class="soluciones">
        
      <p>Rembember that you can always change:</p>
      <ul>
        <li>Your picture</li>
        <li>The biography text</li>
        <li>A certain book</li>
        <li>Add a new book</li>
        <li>Or send me an email :)</li>
      </ul>
      </div>

    </div>
  </div>
</template>

<script>
import navbar from "../components/navbar.vue";
import PictureInput from "vue-picture-input";
import { db } from "../main.js";
export default {
  data() {
    return {
      
    };
  },
  mounted() {},
  methods: {
    onChange(image) {
      console.log("New picture selected!");
      if (image) {
        console.log("Picture loaded.");
        this.book.foto = image;
      } else {
        console.log("FileReader API not supported: use the <form>, Luke!");
      }
    },
    
    youSure() {
    },
    uploadDoc() {
      console.log("pues ya estaría :)");

      let newRegistro = db
        .collection("libros")
        .doc(this.book.titulo)
        .set(this.book)
        .then(res => {
          console.log("Enviado");
          location.reload();
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  components: {
    PictureInput,
    navbar
  }
};
</script>

<style scoped>

.introduccion{
  height: 100vh;
  background-color: rgb(228, 228, 228);
}
.introduccionWrapper {
  margin-top: 20vh;
  text-align: center;
  font-size: 2rem;
  letter-spacing: 5px;
  display: grid;
}
.soluciones{
  width: 40vw;
  font-size: 1.2rem;
  justify-self: center;
  margin-top: 3rem;
  text-align: left;
}


</style>
