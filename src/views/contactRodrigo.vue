<template>
  <div class="introduccion">
    <navbar/>
    <div class="introduccionWrapper">
      <h1> Hello MR. BIJL</h1>
      <h5>If you have any problems at all <br> don't doubt to contact me!</h5>
      <div class="soluciones">
        
      <p>This is my Email:</p>
     
      <a href="mailto:headstylecolorred@gmail.com"> <p>headstylecolorred@gmail.com</p></a>
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

a{
  text-decoration: none;
}


</style>
