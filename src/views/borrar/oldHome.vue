<template>
  <div class="home">
    <div class="homeWrapper">
      <div class="topPart">
        <h1 class="dadsName" v-on:click="secretInput()">dr. Jelle Bijl</h1>
        <div class="imageAndBio">
          <div class="biografia">
            <p class="TextoBiografia" :style="{height:laAltura, transition:'300ms ease-in'}">
              dr. J.P. Bijl is docent geschiedenis en filosofie in het voortgezet en hoger onderwijs.
              Zijn geschiedenisstudie rondde hij af aan de Vrije Universiteit te Amsterdam (doctoraalexamen en promotieonderzoek) en zijn filosofiestudie aan de Erasmus Universiteit Rotterdam (bachelor) en aan de Universiteit Leiden (master).
            </p>
            <b class="botonMovil pointeando" v-on:click="showBiography()">...{{meerOrminder}}</b>
            <b class="botonIpad pointeando" v-on:click="showBiographyIpad()">...{{meerOrminder}}</b>
          </div>
          <img src="../assets/Fotos/ProfilePic.jpg">
        </div>
      </div>
      <div class="mainPart">
        <div class="booksPart">
          <h2>boeken</h2>
          <div class="listOfBooks">
            <div v-for="(libro, index) in data.libros" :key="index" class="bookThumbnail">
              <div class="imageDiv">
                <img :src="libro.foto" alt>

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
        <input type="text" placeholder="Email" v-model="email">
        <textarea placeholder="Typ een bericht..." name="comment" id cols="30" v-model="text"></textarea>
        <div class="botonEnviarComentario">
          <p v-on:click="verifyEmail()" class="pointeando">Verzenden</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dataLibros from "../assets/database/data.json";
export default {
  data() {
    return {
      data: new Object(),
      email: "",
      text: "",
      dialog: false,
      laAltura: "80px",
      bioCounter: 0,
      meerOrminder: "meer",
      secretCounter: 0,
      laAlturaTexto1: "12rem",
      textCounter1: 0
    };
  },
  mounted() {
    this.data = dataLibros;
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
      Email.send({
        Host: "smtp.elasticemail.com",
        Username: "tangerincoder@gmail.com",
        Password: "e47f2ec7-db29-4bfe-b9d6-402bea7ddb13",
        To: "rodrigopple@gmail.com", //here goes mattsFahter email
        From: "tangerincoder@gmail.com",
        Subject: `Message from ${this.email}`,
        Body: this.text
      })
        .then(
          (this.text = ""),
          (this.email = ""),
          alert("Your message has been sent!")
        )
        .catch(err => alert(err));
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
        this.$router.push("/introduccion")
      } else {
        this.secretCounter++;
      }
      this.timeOutOn();
    },
    timeOutOn() {
      setTimeout(() => {
        this.secretCounter = 0;
      }, 5000);
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
</style>
