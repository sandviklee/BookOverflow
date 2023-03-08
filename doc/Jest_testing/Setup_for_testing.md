<<<<<<< HEAD
# For testing ved bruk av Jest 
Jest er det som er mest brukt for JavaScript enhetstesting

## Installere Jest:

    npm install --save-dev jest

Kan installere denne for å slippe å skrive import for alle jest typene i testfilene

    npm install --save-dev @types/jest

Legger så til dette i `package.json` filen:
    
    "scripts": {
        "test": "jest --watchAll --verbose"
    }
Nå kan du kjøre testene dine ved å kjøre dette i terminalen:
    
    npm test

- Man får da oversikt over hvilke tester som er failed eller passed og du får opp et test vindu der du kan for eksempel kjøre testene flere ganger eller bare kjøre tester for filer som er endret
Når man kjører denne vil den se etter filer som heter følgende

       something.test.js

**Hvis man ønsker** kan man installere følgende utvidelse i **VS Code**

    wallaby.js

- Denne skal visst kunne gi tilbakemelding om testene dine er bestått direkte i editoren, men det har jeg ikke testet så dere kan velge selv om dere vil sette dere inn i dette.


## Skrive tester:

For å skrive beskrivelse for testen 

    describe('My Stack')

Inni denne kan man definere man ulike tester ved test eller it (de gjør det samme)

### Eksempel 1 på en test:
        describe('My Stack', () => {
            test.todo('is created empty', () => {
                const stack = new Stack();
                except(stack.top).toBe(-1); //toBe is a matcher which 
                //checks the value to the correct value
            })

            test.todo('can push to the top', () => {
                //test
            })

            test.todo('can pop off', () => {
                //test
            })
        })

### Eksempel 2 på en test:
        const sum = require('./sum');

        test('adds 1 + 2 to equal 3', () => {
            expect(sum(1, 2)).toBe(3);
        });


### Eksempel 3 på en test

Fra AddBook.js:

        function dummyfunction() {
            return 0;
        }
        //exporterer dummyfunction slik at man kan bruke den i andre filer
        module.exports.dummyfunction = dummyfunction

Fra AddBook.test.js

        //henter ut alt som er exportert fra AddBook
        const AddBook = require('../javascripts/AddBook')

        test('teste', () => {
        expect('data').toMatch(/data/)
        expect(AddBook.dummyfunction()).toBe(0)
        })
=======
For testing ved bruk av Jest (som er det som er mest brukt for JavaScript):
- npm install --save-dev jest
Kan installere denne for å slippe å skrive import for alle jest typene
- npm install --save-dev @types/jest
Da vil jest se etter filer som heter følgende for tester:
- something.test.js
 
For å kjøre alle testene dine:
- npm run test
den vil da kjøre testene dine i test mappen og gi tilbakemeldig om de er bestått eller failed


Inni testmappen (hvis man ønsker en testmappe) kan man legge til en 
- test\jsconfig.json
med innhold:
-   {
        "typeAcquisistion": {
            "include": [
            "jest"
            ]
        }
    }
Som provier VS Code autocomplete for jest

Kan også være lurt å innstallere følgende utvidelse i VS Code
- wallaby.js
Den gir tilbakemelding om testene dine er bestått direkte i editoren. Dermed slipper du å kjøre testene hele tiden

Skrive tester
For å skrive beskrivelse for testen 
- describe('My Stack')
Inni denne kan man definere man ulike tester ved test/it (de gjør det samme)
-   describe('My Stack', () => {
        test.todo('is created empty', () => {
            const stack = new Stack();
            except(stack.top).toBe(-1); //toBe is a matcher which checks the value to the correct value
        });

        test.todo('can push to the top');

        test.todo('can pop off');
    })


For testing ved bruk av Mocha JS og Chai
nettside for chai: https://www.chaijs.com/
nettside for mocha
I prosjektet laster man ned Mocha og Chai. Bruker --save-dev for å lagre dependencies for mocha og chai slik jeg forsto det
- npm install mocha chai --save-dev
I package.json vil det legges inn for mochatest og under denne kan man skrive for å kunne bruke "npm run test" 
- "test": "mocha"
Mocha vil se etter en mappe som heter test når du kjører "npm run test".

>>>>>>> af2f02c (Teste testing med Jest: Ref#42)
