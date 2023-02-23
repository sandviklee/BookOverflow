<template>
    <div class="navbar">
        <div class="logo">
            <router-link to="/">
                <img src="/src/assets/BookOverflow/logo.png" alt="BookOverflow Logo">
            </router-link>
        </div>
        <div class="search-bar">
            <form>
                <span class="search-icon">
                    <i class="pi pi-search"></i>
                </span>
                
                <input type="text" v-model="searchTerm" placeholder="Search BookOverflow...">
                <button type="submit" @click.prevent="search">{{ 'All' }}</button>
            </form>
        </div>
        <div class="vl"></div>
        <div class="my-bookshelf">
            <router-link to="/userlist/:id">
                <button class="button is-text is-ghost is-medium"><i class="pi pi-book" style="font-size: 1.5rem"></i>&ensp;My Bookshelf</button>
            </router-link>
        </div>
        <div class="signup-login">
            <router-link to="/signup">
            <button class="button is-text is-ghost is-medium"><i class="pi pi-user" style="font-size: 1.5rem"></i>&ensp;Sign In</button>
            </router-link>
        </div>
        <div class="menu">
            <button class="button is-text is-ghost is-medium"><i class="pi pi-bars" style="font-size: 2rem"></i></button>
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
    padding-left: 10vh;
    padding-top: 1vh;
    width: 85%;
}

.search-bar {
    display: flex;
    padding-left: 10vh;
    align-items: center;
    position: relative;
    flex-grow: 1;
}

.vl {
  border-left: 2.5px solid rgb(0, 0, 0);
  height: 45px;
  padding-right: 10px;

}

.search-icon {
    position: absolute;
    padding: 1.3vh 1.5vh;
}

.search-bar input[type="text"] {
    height: 48px;
    width: 65vh;
    padding: 0 40px;
    border: none;
    border-radius: 5px;
    box-shadow: 2px 2px 0px #E98074;
    background-color: #EDEAE5;
    font-size: 16px;
    flex-grow: 1;
}

.search-bar button {
    height: 48px;
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

