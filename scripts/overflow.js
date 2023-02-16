
import { doc, setDoc } from "firebase/firestore"; 

// Add a new document in collection "cities"
await setDoc(doc(db, "cities", "LA"), {
  name: "Los Angeles",
  state: "CA",
  country: "USA"
});

BookOverflow.prototype.addBook = function(data) {
    var collection = firebase.firestore().collection('books');
    return collection.add(data);
}

BookOverflow.prototype.addAuthor = function(data) {
    var collection = firebase.firestore().collection('authors');
    return collection.add(data);
}

BookOverflow.prototype.getBooksInQuery = function(query) {

}