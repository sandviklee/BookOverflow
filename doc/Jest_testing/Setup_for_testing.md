For testing ved bruk av Jest (som er det som er mest brukt for JavaScript)

Installerer først Jest:
-     npm install --save-dev jest

Kan installere denne for å slippe å skrive import for alle jest typene i testfilene
-     npm install --save-dev @types/jest

Legger så til dette i package.json filen:
-     "scripts": {
        "test": "jest --watchAll --verbose"
      }
Nå kan du kjøre testene dine ved å kjøre dette i terminalen:
-     npm test

Man får da oversikt over hvilke tester som er failed eller passed og du får opp et test vindu der du kan for eksempel kjøre testene flere ganger eller bare kjøre tester for filer som er endret
Når man kjører denne vil den se etter filer som heter følgende
-       something.test.js

Kan også være lurt å innstallere følgende utvidelse i VS Code
-     wallaby.js
Denne skal visst kunne gi tilbakemelding om testene dine er bestått direkte i editoren, men det har jeg ikke testet så dere kan velge selv om dere vil sette dere inn i dette.



Skrive tester:

For å skrive beskrivelse for testen 
-          describe('My Stack')

Inni denne kan man definere man ulike tester ved test eller it (de gjør det samme)

Eksempel 1 på en test:
 -       describe('My Stack', () => {
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

Eksempel 2 på en test:
-       const sum = require('./sum');

        test('adds 1 + 2 to equal 3', () => {
            expect(sum(1, 2)).toBe(3);
        });

