import { test, expect, describe } from 'vitest'
import { mount } from '@vue/test-utils';
import AddAuthorPage from '../components/AddAuthorPage.vue'
import { defineComponent } from 'vue';

const name = 'Test Tester';
const born = '2000-01-01';
const about = 'Dette er en test!'
const imgURL = 'https://images.gr-assets.com/authors/1573928938p5/13905555.jpg'

describe('teste AddAuthor', () => {
    test('importere vue component', async () => {
        expect(AddAuthorPage).toBeTruthy();
        const addAuthorCmp = await import('../components/AddAuthorPage.vue');
        expect(addAuthorCmp).toBeDefined();
    })
    
    test('teste checkfields', () => {
        //sjekke at checkfield function sjekker alle parametrene riktig
        
        document.getElementById("invalid-text").innerHTML !== ""
    })
})