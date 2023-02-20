<template>
    <div>
        Script to get book ID then show info from database
</div>
</template>
  
<script>
export default {
    components: {
    
    },
    props: ['bookId'],
    data() {
        return {
            book: null,
        }
    },
    created() {
        // call Firebase Cloud Function to get book details based on this.bookId
        // update this.book with the book details
    },
}
</script>