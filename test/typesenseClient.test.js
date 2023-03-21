import { describe, it, expect } from "vitest";
import {
  useBookList,
  useBookTopList,
  useClientCheckHealth,
} from "../src/typesense/typesenseClient";
// import { typesenseClient } from "../src/typesense/typesense_client";

const dummyBook = {
  author: {
    name: "Author Authorson",
    id: "1",
  },
  avgRating: 4.44,
  genres: ["Spooky", "Funny"],
  id: "HBsfrcLfePjRZCYLvCN3",
  image_url: "https://images.gr-assets.com/books/1474154022m/3.jpg",
  published: { seconds: 10000, nanoseconds: 100000000 },
  title: "Harry Potter and the Philosopher's Stone",
};

describe("Typesense client test", () => {
  it("Health check", async () => {
    const health = await useClientCheckHealth();
    expect(health);
  });
  it("Should return a list of books", async () => {
    const output = await useBookTopList(10);
    console.log(output);
    expect(output).toBeDefined();
    console.log(output[0])
    expect(output);
  });
});
