<template>
  <div class="home">
    <div class="homeWrapper" v-if="loaded">
      <div class="topPart">
        <h1 class="dadsName" v-on:click="secretInput()">dr. Jelle Bijl</h1>
        <div class="imageAndBio">
          <div class="biografia">
            <p
              class="TextoBiografia"
              :style="{height:laAltura, transition:'300ms ease-in'}"
            >{{biographyText}}</p>
            <b class="botonMovil pointeando" v-on:click="showBiography()">...{{meerOrminder}}</b>
            <b class="botonIpad pointeando" v-on:click="showBiographyIpad()">...{{meerOrminder}}</b>
          </div>
          <img :src="profilePic" />
        </div>
      </div>
      <div class="mainPart" v-if="loaded">
        <div class="booksPart">
          <h2>boeken</h2>
          <div class="listOfBooks">
            <div v-for="(libro, index) in dataLibros" :key="index" class="bookThumbnail">
              <div class="imageDiv">
                <img :src="libro.foto" alt />

                <a class="botonCompraCustom" target="_blank" :href="`${libro.direccionCompra}`">
                  <p class="botonbestellen">bestellen</p>
                </a>
              </div>
              <div class="bookInfo">
                <h4>{{libro.titulo}}</h4>
                <p
                  class="textExplanation"
                  :style="{height:libro.altura, transition:'300ms ease-in'}"
                >{{libro.texto}}</p>
                <b
                  class="showmeerBook pointeando"
                  v-on:click="showTextBook(libro)"
                >...{{meerOrminder}}</b>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="contactFormal">
        <h2>contacteer mij:</h2>
        <input type="text" placeholder="Email" v-model="email" />
        <textarea placeholder="Typ een bericht..." name="comment" id cols="30" v-model="text"></textarea>
        <div class="botonEnviarComentario">
          <p v-on:click="verifyEmail()" class="pointeando">Verzenden</p>
        </div>
      </div>
    </div>
    <div class="divLoader" v-if="!loaded">
      <div class="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "../main.js";
import axios from "axios";
export default {
  data() {
    return {
      dataLibros: new Array(),
      email: "",
      text: "",
      dialog: false,
      laAltura: "80px",
      bioCounter: 0,
      meerOrminder: "meer",
      secretCounter: 0,
      laAlturaTexto1: "12rem",
      textCounter1: 0,
      biographyText: null,
      profilePic: null,
      loaded: false
    };
  },
  mounted() {
    this.retrieveBio();
    this.retrieveDataBooks();
    this.retrievePdf();
  },
  methods: {
    showBiography() {
      if (this.bioCounter % 2 == 0) {
        this.bioCounter++;
        this.laAltura = "450px";
        this.meerOrminder = "minder";
      } else {
        this.laAltura = "80px";
        this.bioCounter++;
        this.meerOrminder = "meer";
      }
    },
    showBiographyIpad() {
      if (this.bioCounter % 2 == 0) {
        this.bioCounter++;
        this.laAltura = "150px";
        this.meerOrminder = "minder";
      } else {
        this.laAltura = "80px";
        this.bioCounter++;
        this.meerOrminder = "meer";
      }
    },
    verifyEmail() {
      if (this.text == "" || this.email == "") {
        alert("Please fill in all fields");
      } else if (!this.email.includes("@")) {
        alert("That's not a valid email.");
        console.log("bien");
      } else if (!this.email.includes(".com")) {
        alert("That's not a valid email.");
      } else {
        this.sendEmail();
      }
    },
    sendEmail() {
      let email_object = {
        user_email: this.email,
        user_subject: "Your message mr. Bijl ",
        text: this.text,
        dest_email: "jpbijl1206@gmail.com"
      };
      axios
        .post("https://mymailingtool.herokuapp.com/", email_object)
        .then(res => {
          if (res.data == "Ok") alert("Message Sent");
          else alert("Email not operative currently");
        });
      this.text = "";
      this.email = "";
    },
    showTextBook(event) {
      if (event.counter % 2 == 0) {
        event.counter++;
        event.altura = "auto";
      } else {
        event.altura = "12rem";
        event.counter++;
      }
    },
    secretInput() {
      console.log(this.secretCounter);
      if (this.secretCounter >= 10) {
        this.$router.push("/introduccion");
      } else {
        this.secretCounter++;
      }
      this.timeOutOn();
    },
    timeOutOn() {
      setTimeout(() => {
        this.secretCounter = 0;
      }, 5000);
    },
    retrieveDataBooks() {
      let retrievingData = db
        .collection("libros")
        .get()
        .then(snapshot => {
          let i = 4;
          let dataArray = new Object();
          snapshot.forEach(doc => {
            dataArray[i--] = doc.data();
          });

          let libros_array = new Array();
          libros_array.push(dataArray[1]);
          libros_array.push(dataArray[3]);
          libros_array.push(dataArray[4]);
          libros_array.push(dataArray[2]);
          this.dataLibros = libros_array;
          this.loaded = true;
        });
    },
    retrieveBio() {
      let retrievingData = db
        .collection("autor")
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            //console.log(doc.data());
            this.biographyText = doc.data().texto;
            this.profilePic = doc.data().foto;
          });
          this.$store.commit("setBiography", this.biographyText);
        });
    },
    retrievePdf() {
      //var storage = firebase.storage();
      //var pathReference = storage.ref("images/stars.jpg");
    }
  },
  components: {}
};
</script>

<style scoped>
.pointeando {
  cursor: pointer;
}

.imageDiv {
  display: grid;
  max-height: 40vh;
}

.bookThumbnail img {
  height: 15rem;
}

.bookInfo h4 {
  margin-bottom: 0.5rem;
}

.home {
  min-height: 100vh;
}
@media only screen and (min-device-width: 320px) and (max-device-width: 568px) {
  .home {
    font-family: "Lekton", sans-serif;
    background-color: rgb(230, 230, 230);
    padding: 2rem;
  }

  .topPart {
    position: relative;
    margin-bottom: 6rem;
    margin: 2rem;
  }

  .imageAndBio {
    display: grid;
    grid-template-columns: 9fr 1fr;
    grid-gap: 1rem;
  }

  .topPart img {
    filter: grayscale(0.1);
    height: 8rem;
    border-radius: 2px;
  }

  .dadsName {
    text-align: center;
    font-weight: 300;
    font-size: 2.6rem;
    margin-bottom: 3rem;
  }

  .mainPart {
    margin: 2rem 0;
  }

  .mainPart h2 {
    margin-bottom: 3rem;
  }

  .listOfBooks {
    display: grid;
    grid-template-rows: auto;
    grid-gap: 6rem;
  }

  .bookThumbnail {
    display: grid;
    grid-template-columns: 1fr auto;
    grid-gap: 3rem;
  }

  .imageDiv {
    display: grid;
    max-height: 40vh;
  }

  .bookThumbnail img {
    height: 10rem;
  }

  .bookInfo {
    display: grid;
  }

  .bookInfo p {
    text-align: left;
  }

  .textExplanation {
    overflow: hidden;
    height: 12rem;
  }

  .botonCompra {
    justify-self: center;
  }

  .botonCompraCustom {
    justify-self: center;
    color: black;
    border: 1px solid black;
    height: 30px;
    width: 100%;
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

  .TextoBiografia {
    height: 80px;
    overflow: hidden;
    transition: 300ms ease-in;
  }

  .contactFormal {
    display: grid;
    grid-gap: 1rem;
    margin: 10vh 2rem;
    margin-top: 20vh;
  }

  .contactFormal input {
    border: 1px solid black;
    padding: 0.3rem 1rem;
  }

  input,
  textarea {
    outline: none;
  }

  .contactFormal textarea {
    border: 1px solid black;
    padding: 0.5rem 1rem;
    height: 10rem;
  }

  .botonEnviarComentario {
    display: grid;
  }

  .botonEnviarComentario p {
    justify-self: center;
    background-color: rgb(82, 82, 82);
    color: whitesmoke;
    padding: 0.5rem 2rem;
  }

  .botonEnviarComentario p:active {
    color: black;
    background-color: rgb(230, 230, 230);
    border: 1px solid black;
  }
  .botonIpad {
    display: none;
  }
}

@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) {
  .home {
    font-family: "Lekton", sans-serif;
    background-color: rgb(230, 230, 230);
  }

  .homeWrapper {
    margin: 0 5rem;
  }

  .topPart {
    position: relative;
    margin-bottom: 6rem;
    margin: 2rem;
  }

  .imageAndBio {
    display: grid;
    grid-template-columns: 9fr 1fr;
    grid-gap: 1rem;
  }

  .topPart img {
    filter: grayscale(0.1);
    height: 8rem;
    border-radius: 2px;
  }

  .dadsName {
    text-align: center;
    font-weight: 300;
    font-size: 2.6rem;
    margin-bottom: 3rem;
  }

  .mainPart {
    margin: 2rem;
  }
  .mainPart h2 {
    margin-bottom: 3rem;
  }

  .listOfBooks {
    display: grid;
    grid-template-rows: auto;
    grid-gap: 10rem;
  }

  .bookThumbnail {
    display: grid;
    grid-template-columns: 1fr auto;
    grid-gap: 3rem;
  }

  .bookThumbnail img {
    height: 10rem;
  }

  .bookInfo {
    display: grid;
  }

  .bookInfo p {
    text-align: left;
  }

  .textExplanation {
    overflow: hidden;
    height: 12rem;
  }

  .showmeerBook {
    margin-top: -1rem;
  }

  .botonCompra {
    justify-self: center;
  }

  .botonCompraCustom {
    justify-self: center;
    color: black;
    border: 1px solid black;
    height: 30px;
    width: 70px;
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

  .TextoBiografia {
    height: 80px;
    overflow: hidden;
    transition: 300ms ease-in;
  }

  .contactFormal {
    display: grid;
    grid-gap: 1rem;
    margin: 10vh 2rem;
  }

  .contactFormal input {
    border: 1px solid black;
    padding: 0.3rem 1rem;
  }

  input,
  textarea {
    outline: none;
  }

  .contactFormal textarea {
    border: 1px solid black;
    padding: 0.5rem 1rem;
    height: 10rem;
  }

  .botonEnviarComentario {
    display: grid;
  }

  .botonEnviarComentario p {
    justify-self: center;
    background-color: rgb(82, 82, 82);
    color: whitesmoke;
    padding: 0.5rem 2rem;
  }

  .botonEnviarComentario p:active {
    color: black;
    background-color: rgb(230, 230, 230);
    border: 1px solid black;
  }

  .botonMovil {
    display: none;
  }
}

@media only screen and (min-device-width: 500px) and (max-width: 1000px) {
  .home {
    font-family: "Lekton", sans-serif;
    background-color: rgb(230, 230, 230);
  }

  .homeWrapper {
    margin: 0 5rem;
  }

  .topPart {
    position: relative;
    margin-bottom: 6rem;
    margin: 2rem;
  }

  .imageAndBio {
    display: grid;
    grid-template-columns: 9fr 1fr;
    grid-gap: 1rem;
  }

  .topPart img {
    filter: grayscale(0.1);
    height: 8rem;
    border-radius: 2px;
  }

  .dadsName {
    text-align: center;
    font-weight: 300;
    font-size: 2.6rem;
    margin-bottom: 3rem;
  }

  .mainPart {
    margin: 2rem;
  }
  .mainPart h2 {
    margin-bottom: 3rem;
  }

  .listOfBooks {
    display: grid;
    grid-template-rows: auto;
    grid-gap: 10rem;
  }

  .bookThumbnail {
    display: grid;
    grid-template-columns: 1fr auto;
    grid-gap: 3rem;
  }

  .bookInfo {
    display: grid;
  }

  .bookInfo p {
    text-align: left;
  }

  .textExplanation {
    overflow: hidden;
    height: 12rem;
  }

  .botonCompra {
    justify-self: center;
  }

  .botonCompraCustom {
    justify-self: center;
    color: black;
    border: 1px solid black;
    height: 30px;
    width: 100%;
    position: relative;
    background-color: rgb(230, 230, 230);
    transition: 200ms ease-in-out;
    margin-top: 1rem;
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

  .TextoBiografia {
    height: 80px;
    overflow: hidden;
    transition: 300ms ease-in;
  }

  .contactFormal {
    display: grid;
    grid-gap: 1rem;
    margin: 10vh 2rem;
    margin-top: 20vh;
  }

  .contactFormal input {
    border: 1px solid black;
    padding: 0.3rem 1rem;
  }

  input,
  textarea {
    outline: none;
  }

  .contactFormal textarea {
    border: 1px solid black;
    padding: 0.5rem 1rem;
    height: 10rem;
  }

  .botonEnviarComentario {
    display: grid;
  }

  .botonEnviarComentario p {
    justify-self: center;
    background-color: rgb(82, 82, 82);
    color: whitesmoke;
    padding: 0.5rem 2rem;
  }

  .botonEnviarComentario p:active {
    color: black;
    background-color: rgb(230, 230, 230);
    border: 1px solid black;
  }

  .botonMovil {
    display: none;
  }
}

/*-------------- FULL SCREEN ----------------*/
@media only screen and (min-width: 1001px) {
  .home {
    font-family: "Lekton", sans-serif;
    background-color: rgb(230, 230, 230);
  }

  .homeWrapper {
    margin: 0 23vw;
  }

  .topPart {
    position: relative;
    margin-bottom: 6rem;
    margin: 2rem;
  }

  .imageAndBio {
    display: grid;
    grid-template-columns: 9fr 1fr;
    grid-gap: 1rem;
  }

  .topPart img {
    filter: grayscale(0.1);
    height: 8rem;
    border-radius: 2px;
  }

  .dadsName {
    text-align: center;
    font-weight: 300;
    font-size: 2.6rem;
    margin-bottom: 3rem;
  }

  .mainPart {
    margin: 2rem;
  }
  .mainPart h2 {
    margin-bottom: 3rem;
  }

  .listOfBooks {
    display: grid;
    grid-template-rows: auto;
    grid-gap: 10rem;
  }

  .bookThumbnail {
    display: grid;
    grid-template-columns: 1fr auto;
    grid-gap: 3rem;
  }

  .bookInfo {
    display: grid;
  }

  .bookInfo p {
    text-align: left;
  }

  .textExplanation {
    overflow: hidden;
    height: 12rem;
  }

  .showmeerBook {
    margin-top: -1rem;
  }

  .botonCompraCustom {
    justify-self: center;
    color: black;
    border: 1px solid black;
    height: 30px;
    width: 100%;
    position: relative;
    background-color: rgb(230, 230, 230);
    transition: 200ms ease-in-out;
    margin-top: 1rem;
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

  .TextoBiografia {
    height: 80px;
    overflow: hidden;
    transition: 300ms ease-in;
  }

  .contactFormal {
    display: grid;
    grid-gap: 1rem;
    margin: 10vh 2rem;
    margin-top: 20vh;
  }

  .contactFormal input {
    border: 1px solid black;
    padding: 0.3rem 1rem;
  }

  input,
  textarea {
    outline: none;
  }

  .contactFormal textarea {
    border: 1px solid black;
    padding: 0.5rem 1rem;
    height: 10rem;
  }

  .botonEnviarComentario {
    display: grid;
  }

  .botonEnviarComentario p {
    justify-self: center;
    background-color: rgb(82, 82, 82);
    color: whitesmoke;
    padding: 0.5rem 2rem;
  }

  .botonEnviarComentario p:active {
    color: black;
    background-color: rgb(230, 230, 230);
    border: 1px solid black;
  }

  .botonMovil {
    display: none;
  }
}

/* L O A D E R*/

.divLoader {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.lds-roller {
  display: inline-block;
  position: relative;
  width: 64px;
  height: 64px;
}
.lds-roller div {
  animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  transform-origin: 32px 32px;
}
.lds-roller div:after {
  content: " ";
  display: block;
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgb(58, 58, 58);
  margin: -3px 0 0 -3px;
}
.lds-roller div:nth-child(1) {
  animation-delay: -0.036s;
}
.lds-roller div:nth-child(1):after {
  top: 50px;
  left: 50px;
}
.lds-roller div:nth-child(2) {
  animation-delay: -0.072s;
}
.lds-roller div:nth-child(2):after {
  top: 54px;
  left: 45px;
}
.lds-roller div:nth-child(3) {
  animation-delay: -0.108s;
}
.lds-roller div:nth-child(3):after {
  top: 57px;
  left: 39px;
}
.lds-roller div:nth-child(4) {
  animation-delay: -0.144s;
}
.lds-roller div:nth-child(4):after {
  top: 58px;
  left: 32px;
}
.lds-roller div:nth-child(5) {
  animation-delay: -0.18s;
}
.lds-roller div:nth-child(5):after {
  top: 57px;
  left: 25px;
}
.lds-roller div:nth-child(6) {
  animation-delay: -0.216s;
}
.lds-roller div:nth-child(6):after {
  top: 54px;
  left: 19px;
}
.lds-roller div:nth-child(7) {
  animation-delay: -0.252s;
}
.lds-roller div:nth-child(7):after {
  top: 50px;
  left: 14px;
}
.lds-roller div:nth-child(8) {
  animation-delay: -0.288s;
}
.lds-roller div:nth-child(8):after {
  top: 45px;
  left: 10px;
}
@keyframes lds-roller {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
