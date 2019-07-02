<template>
  <div class="introduccion">
    <navbar/>
    <div class="introduccionWrapper">
      <div class="presentacion" v-if="firstStep">
        <div class="saluten">
          <h1>Hello dr. Jelle!</h1>
          <h3>Let's add a new Book</h3>
        </div>
        <div class="beginNewBook">
          <v-btn large color="success" v-on:click="hideFirstStep()">New Book</v-btn>
        </div>
      </div>

      <!-- T I T L E-->
      <div class="tituloDelLibro" v-if="secondStep">
        <h1>Name of the book:</h1>
        <input v-model="book.titulo" type="text" class="inputeando" placeholder="Name of the book">
        <br>
        <v-btn color="success" class="next" v-on:click="showThirdStep()">Next</v-btn>
      </div>

      <!-- I M A G E -->
      <div class="imagenUpload tituloDelLibro" v-if="thirdStep">
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

            <v-btn color="success" class="next" v-on:click="showFourthStep()">Next</v-btn>
          </div>
        </div>
      </div>

      <!-- D E S C R I P T I O N-->
      <div class="textoDelLibro tituloDelLibro" v-if="fourthStep">
        <h1>Description of the Book:</h1>
        <textarea v-model="book.texto" class="textareaBook" placeholder="Write your Description"></textarea>
        <br>
        <v-btn color="success" class="next" v-on:click="showFifhtStep()">Next</v-btn>
      </div>

      <!-- L I N K  P U R C H A S E-->
      <div class="linkDeCompra tituloDelLibro" v-if="fifthStep">
        <h1>Link to Purchase:</h1>
        <input
          v-model="book.direccionCompra"
          type="text"
          class="inputeando"
          placeholder="Link of buy"
        >
        <br>
        <v-btn color="success" class="next" v-on:click="showFinalStep()">Next</v-btn>
      </div>

      <!-- P R E V I E W -->
      <div class="preview tituloDelLibro" v-if="finalStep">
        <h1>Preview of Upload</h1>
        <div class="bookThumbnail">
          <div class="leftSide">
            <img :src="book.foto" alt>
            <a class="botonCompraCustom">
              <p class="botonbestellen">bestellen</p>
            </a>
          </div>
          <div class="rightSide">
            <h4>{{book.titulo}}</h4>
            <p>{{book.texto}}</p>
          </div>
        </div>

        <v-btn color="success" class="last" v-on:click="youSure()">Next</v-btn>
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
      secondStep: false,
      thirdStep: false,
      fourthStep: false,
      fifthStep: false,
      finalStep: false,
      confirm: false,
      book: {
        titulo: null,
        texto: null,
        altura: "12rem",
        counter: 0,
        key: null,
        foto: null,
        direccionCompra: null
      }
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
    hideFirstStep() {
      this.firstStep = false;
      this.secondStep = true;
    },
    showThirdStep() {
      this.secondStep = false;
      this.thirdStep = true;
    },
    showFourthStep() {
      this.thirdStep = false;
      this.fourthStep = true;
    },
    showFifhtStep() {
      this.fourthStep = false;
      this.fifthStep = true;
    },
    showFinalStep() {
      this.fifthStep = false;
      this.finalStep = true;
      console.log(this.book);
    },
    youSure() {
      this.finalStep = false;
      this.confirm = true;
      this.book.key = this.book.titulo;
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
  width: 80vw;
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
</style>
