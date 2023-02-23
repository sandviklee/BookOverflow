<template>
  <header>
    <div class="card">
      <div class="card-content">
        <div class="content">
          <h1>{{ bookName }} </h1>
          <h1>by: {{ authorName }}</h1>
          <br>
          <h6>
            {{ bookBlurb }}
          </h6>
        </div>
      </div>
    </div>

  </header>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { ref, onMounted} from 'vue'
import { db } from '../firebase/firebase';
import { doc, getDoc } from "firebase/firestore";

const route=useRoute()
const bookName = ref()
const authorName = ref()
const bookBlurb = ref()

let book = ''
book = route.params.id;

onMounted(async () => {
  const docRef = await doc(db, 'books', book);
  const docSnap = await getDoc(docRef);

  let bname = docSnap.data().title
  let aname = docSnap.data().author.name
  let blurb = docSnap.data().blurb
  if (docSnap.exists()) {
  console.log("Document data:", docSnap.data());
} else {
  // doc.data() will be undefined in this case
  console.log("No such document!");
}
bookName.value = bname.replace(/\_/g, ' ');
authorName.value = aname.replace(/\_/g, ' ');
bookBlurb.value = blurb;
})

</script>

<style>
@import url('https://fonts.cdnfonts.com/css/lato');
* {
  font-family: "lato";
}

header {
  padding-top: 5vh;
  text-align: center;
  font-weight:700;
  text-shadow: 1px 0.5px 0px #E98074;

}

</style>