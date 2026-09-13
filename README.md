# flyUs

Comparateur affilié de vols (MVP). Recherche → comparaison → redirection vers le partenaire avec identifiant d’affiliation.

**Site :** https://vasvohn.github.io/aeromeld  
**Code :** https://github.com/Vasvohn/aeromeld

## Démarrer en local

```bash
npm install
cp .env.example .env.local
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000).

## Ce que contient le MVP

- Formulaire (départ, arrivée, dates, passagers, aller-retour / aller simple)
- Autocomplétion d’aéroports (IATA)
- Liste comparative (prix, durée, escales)
- Bouton **Réserver** vers le partenaire (lien d’affiliation)
- Pages destinations (SEO), mentions, confidentialité, cookies, divulgation d’affiliation

Les tarifs du prototype sont **simulés** (déterministes selon l’itinéraire) pour avancer sans clés API. Les liens pointent déjà vers les moteurs partenaires avec `FLYUS_AFFILIATE_MARKER`.

## Brancher de vraies API

1. Créez un compte [Travelpayouts](https://www.travelpayouts.com/) et récupérez votre `marker`.
2. Option vols live : [Amadeus for Developers](https://developers.amadeus.com/), Kiwi Tequila ou Duffel.
3. Placez les clés dans `.env.local`.

## Niche retenue pour v1

Comparateur **vols** (pas encore hôtels / voitures), avec transparence totale sur la redirection partenaire.
