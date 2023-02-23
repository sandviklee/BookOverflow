<template>
    <v-container>
        <h1>Book</h1>
        <v-simple-table>
            <template v-slot:default>
                <div class="card-header">
                    <a @click="goToAuthor"> author </a>
                    <div class="card-body">
                    </div>
                </div>
                <thead>
                    <tr>
                        <th class="text-left">Catogorie</th>
                        <th class="text-left">Product</th>
                    </tr>
                </thead>
                <tbody>
                    
                </tbody>
            </template>
        </v-simple-table>
    </v-container>
</template>

<!-- <template>
    <section class="ViewBook">
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <div class="card mb-3">
                        <div class="card-header">
                            <h5>Book</h5>
                            <h6>Products</h6>
                            <a @click="goToAuthor"> author </a>
                            <a>In this exhilarating novel by the best-selling author of The Storied Life of A. J. Fikry two friends--often in love, but never lovers--come together as creative partners in the world of video game design, where success brings them fame, joy, tragedy, duplicity, and, ultimately, a kind of immortality.  On a bitter-cold day, in the December of his junior year at Harvard, Sam Masur exits a subway car and sees, amid the hordes of people waiting on the platform, Sadie Green. He calls her name. For a moment, she pretends she hasn't heard him, but then, she turns, and a game begins: a legendary collaboration that will launch them to stardom. These friends, intimates since childhood, borrow money, beg favors, and, before even graduating college, they have created their first blockbuster, Ichigo. Overnight, the world is theirs. Not even twenty-five years old, Sam and Sadie are brilliant, successful, and rich, but these qualities won't protect them from their own creative ambitions or the betrayals of their hearts.  Spanning thirty years, from Cambridge, Massachusetts, to Venice Beach, California, and lands in between and far beyond, Gabrielle Zevin's Tomorrow, and Tomorrow, and Tomorrow is a dazzling and intricately imagined novel that examines the multifarious nature of identity, disability, failure, the redemptive possibilities in play, and above all, our need to connect: to be loved and to love. Yes, it is a love story, but it is not one you have read before.</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template> -->

  
<script>
import { db } from './firebase'



// export default {
//     firestore: {
//         Product
//         //Products: db.collection('books')
//     },
//     data() {
//         return {
//             Products: []
//         }
//     },
//     methods: {
//         back() {
//             location.reload();
//             console.log(firebase.auth().currentUser)
//         }
//     },
//     created() {
//         console.log(this.Products)
//     }
// }

// export default {
//     components: {
    
//     },
//     props: ['bookId'],
//     data() {
//         return {
//             book: null,
//         }
//     },
//     created() {
//         // call Firebase Cloud Function to get book details based on this.bookId
//         // update this.book with the book details
//     },
// }
</script>