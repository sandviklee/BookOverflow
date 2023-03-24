Krav til "B25 - legge inn data" (#42):

Legge inn data skal

1.	ta inn data for en bok, forfatter eller review (eller annen data) som skal legge inn i databasen og hvilken collection dataene skal legges i
2.  Sjekke at collection den fikk inn finnes i databasen
3.  Sjekke at data som kommer inn inneholder alle de riktige fieldsene til den gitte collection
4.  sjekke at dataene i fieldsene er gyldig og har riktig datatype
5.  Hvis alt over 
    - er riktig skal den returnere 1
    - ikke er riktig skal den returnere 0 og en feilmelding om hva som ikke er riktig eller mangler