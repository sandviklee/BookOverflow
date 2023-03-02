<template>
    <div>
        Script to get author ID then show info from database
    </div>
</template>
  
<script>


export default {
    props: ['authorId'],
    data() {
        return {
            author: null,
        }
    },
    created() {
        // call Firebase Cloud Function to get author details based on this.authorId
        // update this.author with the author details
    },
}
</script>