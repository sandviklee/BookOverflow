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

