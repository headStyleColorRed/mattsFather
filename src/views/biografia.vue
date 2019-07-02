<template>
  <div class="introduccion">
    <navbar/>
    <div class="introduccionWrapper">
      <div class="presentacion">
        <div class="saluten" v-if="presentacion">
          <h1>Hello dr. Jelle!</h1>
          <h3>Let's change the Biography</h3>
        </div>
      </div>

      <!-- I M A G E -->
      <div class="imagenUpload tituloDelLibro" v-if="firstStep">
        <h1>Picture of the book:</h1>
        <div class="inputs">
          <h3 class="imagenTExto">Foto:</h3>
          <div class="hello">
            <picture-input
              ref="pictureInput"
              width="200"
              height="200"
              margin="16"
              accept="image/jpeg, image/png"
              size="10"
              button-class="btn"
              :custom-strings="{
        upload: '<h1>Bummer!</h1>',
        drag: 'Drag a Picture'
      }"
              @change="onChange"
            ></picture-input>

            <v-btn color="success" class="next" v-on:click="hideFirstStep()">Next</v-btn>
          </div>
        </div>
      </div>

      <!-- D E S C R I P T I O N-->
      <div class="textoDelLibro tituloDelLibro" v-if="secondStep">
        <h1>Write your Biography</h1>
        <div class="mainPartBio">
          <div class="leftSideBio">
            <h3>Original Biography</h3>
            <p>{{$store.getters.biography}}</p>
          </div>
          <div class="rightSideBio">
            <textarea
              v-model="biografiaTexto"
              class="textareaBook"
              placeholder="Write new Biography"
            ></textarea>
          </div>
        </div>

        <br>
        <v-btn color="success" class="next" v-on:click="hideSecondStep()">Next Step</v-btn>
      </div>

      
      <!-- P R E V I E W-->
      <div class="preview tituloDelLibro" v-if="preview">
        <h1>This is how it looks</h1>
        <div class="thumbnailBio">
            <p>{{biografiaTexto}}</p>
            <img :src="foto" alt="">
        </div>

        <br>
        <v-btn color="success" class="next" v-on:click="showConfirmation()">Next Step</v-btn>
      </div>



      <!--  C O N F I R M -->
      <div class="textoDelLibro tituloDelLibro" v-if="confirm">
        <h1>Are you sure?</h1>
        <v-btn color="success" class="next" v-on:click="uploadDoc()">Yes</v-btn>
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
      firstStep: true,
      preview: false,
      thirdStep: false,
      secondStep: false,
      confirm: false,
      foto: null,
      biografiaTexto: null,
      presentacion: false,
    };
  },
  mounted() {},
  methods: {
    onChange(image) {
      console.log("New picture selected!");
      if (image) {
        console.log("Picture loaded.");
        this.foto = image;
      } else {
        console.log("FileReader API not supported: use the <form>, Luke!");
      }
    },
    hideFirstStep() {
      this.firstStep = false;
      this.secondStep = true;
    },
    hideSecondStep(){
      this.secondStep = false;
      this.preview = true;
    },
    showConfirmation() {
      this.preview = false;
      this.confirm = true;
    },
    uploadDoc() {
      console.log("pues ya estaría :)");

      let newtext = db
        .collection("autor")
        .doc("biografia")
        .set({
            texto: this.biografiaTexto,
            foto: this.foto,
        })
        .then(res => {
          console.log("Enviado texto");
          this.$router.push("/introduccion");
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
.introduccionWrapper {
  margin-top: 20vh;
}

.presentacion {
  display: grid;
}

.saluten {
  text-align: center;
}

.beginNewBook {
  justify-self: center;
  margin-top: 20vh;
}

.tituloDelLibro {
  text-align: center;
}

.inputeando {
  margin-top: 20vh;
  border: 1px solid black;
  padding: 1rem;
}

input {
  outline: none;
  width: 80vh;
}

.next {
  margin-top: 10vh;
}

.imagenTExto {
  padding-bottom: 2vh;
}

.textareaBook {
  border: 1px solid black;
  outline: none;
  margin-top: 3rem;
  height: 40vh;
  width: 40vw;
  padding: 1rem;
}

/* ////////////  T H U M B N A I L  /////////////*/
.preview {
  display: grid;
}
.bookThumbnail {
  margin-top: 10vh;
  justify-self: center;
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 40vw;
}

.leftSide {
  display: grid;
  width: 10vw;
  justify-self: right;
}

.leftSide img {
  margin-left: 2rem;
  height: 20vh;
}

.botonCompraCustom {
  margin-top: 1rem;
  justify-self: center;
  color: black;
  border: 1px solid black;
  height: 30px;
  width: 80%;
  position: relative;
  background-color: rgb(230, 230, 230);
  transition: 200ms ease-in-out;
}

.botonbestellen {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.botonCompraCustom:active {
  background-color: rgb(177, 176, 176);
}

a {
  text-decoration: none;
}

.rightSide {
  text-align: left;
}

.last {
  justify-self: center;
  margin-top: 4rem;
  width: 5vw;
}






.mainPartBio{
    display: grid;
    grid-template-columns: 1fr 1fr;
}

.leftSideBio{
    padding-left: 1rem;
    text-align: left;
}

.leftSideBio h3{
    margin-bottom: 1.5rem;
    text-align: center;
}


.thumbnailBio{
    margin-left: 10vh;
    justify-self: center;
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 60vw;
    grid-gap: 2rem;
    text-align: left;
    margin-top: 10vh;
}

.thumbnailBio img{
    height: 40vh;
}

</style>
