Krav til "B24 - Redaktør kan legge til forfatter" (#49):

"Redaktør kan legge til bøker" skal

1.	ta inn data for en forfatter som skal legges inn i databasen
2.  bruke valideringsfunksjonen som lages i "B25 - legge inn data" (#42) brukerhistorien for å sjekke at data for forfatteren er gyldig 
3.  Hvis valideringsfuknsjonen returnerer
        - 1, skal forfatteren legges til i databasen og gi tilbakemelding til redaktør om at den er lagt til.
        - 0, skal forfatteren ikke legges til i databasen og feilmeldingen skal komme opp på nettsiden for redaktøren.