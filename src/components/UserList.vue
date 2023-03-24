<template>
  <header>
    <div class="card">
      <div class="card-content">
        <div class="content">
          <div class="col-md-10">
          <div class="card mb-6">
            <span class="icon-text">
              <div class="card-header-title pl-5">
                <span class="icon">
                  <i class="pi pi-star"></i>
                </span>
                <h3>Favorites</h3>
              </div>
            </span>
            <div class="card-body">
              <Book
                class="books"
                v-for="book in books"
                :bookInfo="book.image_url + ';' + book.id + ';' + book.rating"
              />
            </div>
          </div>
        </div>
          <h1> 
            My Bookshelf <br>
            Coming soon! </h1>
        </div>
      </div>
    </div>

  </header>
</template>


<style>

</style>