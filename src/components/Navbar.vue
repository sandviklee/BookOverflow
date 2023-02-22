<template>
    <div class="navbar">
        <div class="logo">
            <a href="./HomePage.vue">
                <img src="/src/assets/BookOverflow/logo.png" alt="BookOverflow Logo">
            </a>
        </div>
        <div class="search-bar">
            <form>
                <input type="text" v-model="searchTerm" placeholder="Search...">
                <button type="submit" @click.prevent="search">{{ buttonText }}</button>
            </form>
        </div>
        <div class="user-lists">
            <a href="./UserList.vue">
                <img src="" alt="User Lists">
            </a>
        </div>
        <div class="signup-login">
            <button>Sign Up/In</button>
        </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            searchTerm: "",
            buttonText: "Search"
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
    height: 80px;
    padding: 0 20px;
    background-color: rgba(216, 195, 165, 1);
    border-bottom: 1px solid #ddd;
}

.logo img {
    height: 60px;
}

.search-bar {
    display: flex;
    align-items: center;
    flex-grow: 1;
}

.search-bar input[type="text"] {
    height: 40px;
    padding: 0 10px;
    border: none;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    font-size: 16px;
    flex-grow: 1;
}

.search-bar button {
    height: 40px;
    padding: 0 20px;
    border: none;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background-color: #0074d9;
    color: #fff;
    font-size: 16px;
    margin-left: 10px;
}

.user-lists img {
    height: 40px;
    cursor: pointer;
}

.signup-login button {
    height: 40px;
    padding: 0 20px;
    border: none;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background-color: #0074d9;
    color: #fff;
    font-size: 16px;
}
</style>