<template>
    <div class="navbar">
        <div class="logo">
            <a href="./">
                <img src="/src/assets/BookOverflow/logo.png" alt="BookOverflow Logo">
            </a>
        </div>
        <div class="search-bar">
            <form>
                <i class="pi pi-search"></i>
                <input type="text" v-model="searchTerm" placeholder="Search BookOverflow...">
                <button type="submit" @click.prevent="search">{{ 'All' }}</button>
            </form>
        </div>
        <div class="user-lists">
            <a href="./UserList.vue">
                <img src="" alt="User Lists">
            </a>
        </div>
        <div class="signup-login">
            <Button label="Sign In" icon="pi pi-user" class="p-button-text" />
        </div>
        
</div>
</template>

<script>
export default {
    data() {
        return {
            searchTerm: "",
            buttonText: ""
        };
    },
    methods: {
        search() {
            this.$emit("search", this.searchTerm);
        }
    }
};
</script>

<style>
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 70px;
    padding: 0 30px;
    background-color: rgba(216, 195, 165, 1);
    border-bottom: 1px solid #ddd;
}

.logo img {
    height: 75%;
    width: 75%;
}

.search-bar {
    display: flex;
    padding-left: 28vh;
    align-items: center;
    position: relative;
    flex-grow: 1;
}

i {
    position: absolute;
    padding: 1.5vh 1.5vh;
}

.search-bar input[type="text"] {
    height: 45px;
    width: 50vh;
    padding: 0 40px;
    border: none;
    border-radius: 5px;
    box-shadow: 2px 2px 0px #E98074;
    background-color: #EDEAE5;
    font-size: 16px;
    flex-grow: 1;
}

.search-bar button {
    height: 45px;
    padding-right: 2vh;
    width: 50px;
    border: none;
    border-radius: 5px;
    box-shadow: 2px 2px 0px #E98074;
    background-color: #EDEAE5;
    color: #8E8D8A;
    font-size: 16px;
}

.user-lists img {
    height: 40px;
    cursor: pointer;
}

</style>

