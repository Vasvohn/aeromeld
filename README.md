# Aeromeld

Comparateur affilié de vols. Recherche, comparaison, puis redirection vers le partenaire avec identifiant d’affiliation.

**Site :** https://vasvohn.github.io/aeromeld  
**Code :** https://github.com/Vasvohn/aeromeld

## Démarrer en local

```bash
npm install
cp .env.example .env.local
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000).

## Fonctionnalités

- Formulaire (départ, arrivée, dates, passagers, aller-retour / aller simple / multi-destinations)
- Autocomplétion d’aéroports (IATA)
- Liste comparative (prix, durée, escales)
- Bouton **Réserver** vers le partenaire (lien d’affiliation)
- Pages destinations (SEO), guides longue traîne, mentions, confidentialité, cookies, divulgation d’affiliation

Les liens d’affiliation utilisent `FLYUS_AFFILIATE_MARKER` / Travelpayouts.

## Partenaires

1. Compte [Travelpayouts](https://www.travelpayouts.com/) : renseignez le `marker`.
2. Option vols live : [Amadeus for Developers](https://developers.amadeus.com/), Kiwi Tequila ou Duffel.
3. Placez les clés dans `.env.local`.
