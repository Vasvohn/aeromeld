export const GUIDE_CLUSTERS = {
  lisbonne: {
    id: "lisbonne",
    name: "Lisbonne",
    blurb: "Vol, aéroport, quartiers et budget : le cocon sémantique Lisbonne.",
  },
  porto: {
    id: "porto",
    name: "Porto",
    blurb: "Paris–Porto, bagages low-cost et meilleur moment pour réserver.",
  },
  guadeloupe: {
    id: "guadeloupe",
    name: "Guadeloupe",
    blurb: "Décembre, Orly–Pointe-à-Pitre et budget séjour Caraïbes.",
  },
  marrakech: {
    id: "marrakech",
    name: "Marrakech",
    blurb: "Vols, médina, Transavia et location depuis Menara.",
  },
  astuces: {
    id: "astuces",
    name: "Astuces billets",
    blurb: "Requêtes précises pour payer moins cher, sans viser « billet Maroc ».",
  },
} as const;

export type GuideClusterId = keyof typeof GUIDE_CLUSTERS;

export type Guide = {
  slug: string;
  cluster: GuideClusterId;
  title: string;
  metaTitle: string;
  metaDescription: string;
  query: string;
  intro: string[];
  from: string;
  to: string;
  showFlight: boolean;
  showHotels: boolean;
  showCars: boolean;
  showBudget: boolean;
  flightHeading: string;
  hotelHeading: string;
  carHeading: string;
  budgetHeading: string;
  body: { heading: string; paragraphs: string[] }[];
  budget: { label: string; amount: string }[];
  budgetNote: string;
  related: string[];
  published: string;
  pinImage?: string;
};

const DAY = "2026-09-12";

export const GUIDES: Guide[] = [
  {
    slug: "guide-vol-sejour-lisbonne",
    cluster: "lisbonne",
    title: "Guide complet : vol et séjour à Lisbonne au meilleur prix",
    metaTitle: "Guide Lisbonne : vol, hôtel, voiture et budget",
    metaDescription:
      "Quand acheter son billet pour Lisbonne, où dormir par quartier, faut-il louer une voiture à l’aéroport, et quel budget prévoir sur place.",
    query: "guide vol séjour Lisbonne meilleur prix",
    intro: [
      "Ce guide répond aux questions que l’on se pose juste avant d’acheter : dates, bagages, transfert aéroport, quartier et budget quotidien.",
      "Le comparateur de vols est placé dès la première section : les voyageurs qui tapent une requête précise convertissent mieux qu’une recherche générique « billet d’avion Portugal ».",
    ],
    from: "CDG",
    to: "LIS",
    showFlight: true,
    showHotels: true,
    showCars: true,
    showBudget: true,
    flightHeading: "1. Quel est le meilleur moment pour acheter son billet ?",
    hotelHeading: "2. Où dormir sur place ? Sélection par quartier",
    carHeading: "3. Se déplacer : faut-il louer une voiture à l’aéroport ?",
    budgetHeading: "4. Budget moyen à prévoir sur place",
    body: [
      {
        heading: "Fenêtre d’achat réaliste",
        paragraphs: [
          "Pour un Paris–Lisbonne en low-cost, les tarifs les plus stables se trouvent souvent 4 à 8 semaines avant le départ en hors-saison, et 8 à 12 semaines pour les ponts et l’été.",
          "Comparez un mardi et un mercredi contre un vendredi soir : l’écart de 30 à 80 € n’est pas rare. Vérifiez aussi Lyon (LYS) et Bordeaux (BOD) si Paris est saturé.",
        ],
      },
    ],
    budget: [
      { label: "Vol A/R low-cost (hors bagage soute)", amount: "60–180 €" },
      { label: "Hébergement centre / Alfama (nuit)", amount: "70–140 €" },
      { label: "Repas + transports en commun / jour", amount: "35–55 €" },
      { label: "Transfert aéroport → centre (metro/bus)", amount: "2–10 €" },
    ],
    budgetNote:
      "Fourchettes indicatives 2026, hors événements. Le prix final du vol s’affiche chez le partenaire au moment de la réservation.",
    related: [
      "aeroport-lisbonne-centre-ville",
      "ou-dormir-lisbonne-quartiers",
      "louer-voiture-aeroport-lisbonne",
      "quand-acheter-billet-lisbonne",
    ],
    published: DAY,
  },
  {
    slug: "aeroport-lisbonne-centre-ville",
    cluster: "lisbonne",
    title: "Comment aller de l’aéroport de Lisbonne au centre-ville",
    metaTitle: "Aéroport Lisbonne → centre-ville : metro, bus, taxi",
    metaDescription:
      "Metro linha vermelha, Aerobus, taxi et VTC : temps, prix et astuces pour rejoindre Baixa, Chiado ou Alfama depuis LIS.",
    query: "Comment aller de l'aéroport de Lisbonne au centre-ville",
    intro: [
      "L’aéroport Humberto Delgado (LIS) est à environ 7 km du centre. La question n’est pas « comment visiter le Portugal », mais « comment arriver ce soir sans se tromper de ligne ».",
      "Après le transfert, comparez un vol retour et un hôtel près de votre arrêt de metro : c’est là que l’intention d’achat est la plus forte.",
    ],
    from: "ORY",
    to: "LIS",
    showFlight: true,
    showHotels: true,
    showCars: true,
    showBudget: true,
    flightHeading: "1. Quel est le meilleur moment pour acheter son billet ?",
    hotelHeading: "2. Où dormir près d’un arrêt pratique",
    carHeading: "3. Faut-il louer une voiture dès l’aéroport ?",
    budgetHeading: "4. Budget transfert et première journée",
    body: [
      {
        heading: "Metro (souvent le plus simple)",
        paragraphs: [
          "La linha vermelha relie l’aéroport à Saldanha, Alameda puis São Sebastião. Comptez 25 à 40 minutes selon votre correspondance vers Baixa-Chiado (ligne bleue) ou Santa Apolónia.",
          "Achetez un carton Viva Viagem / Navegante occasionnel aux automates. Évitez les taxis non officiels dans le hall : le compteur et l’aéroport ont des règles claires.",
        ],
      },
      {
        heading: "Bus, taxi, VTC",
        paragraphs: [
          "L’Aerobus et certains Carris desservent le centre sans correspondance, utiles avec un gros bagage cabine. Taxi et VTC : 15–25 € hors heure de pointe, plus si vous visez Cascais.",
          "Si vous arrivez après 23 h, le metro se raréfie : prévoyez VTC ou hôtel à 10 minutes de LIS pour le premier soir.",
        ],
      },
    ],
    budget: [
      { label: "Metro / bus aéroport → centre", amount: "2–5 €" },
      { label: "Taxi / VTC", amount: "15–25 €" },
      { label: "Nuit près d’un hub metro", amount: "65–130 €" },
    ],
    budgetNote: "Les navettes hôtelières privées sont rarement rentables pour un couple, davantage pour une famille avec sièges auto.",
    related: [
      "guide-vol-sejour-lisbonne",
      "louer-voiture-aeroport-lisbonne",
      "ou-dormir-lisbonne-quartiers",
    ],
    published: DAY,
  },
  {
    slug: "louer-voiture-aeroport-lisbonne",
    cluster: "lisbonne",
    title: "Faut-il louer une voiture à l’aéroport de Lisbonne ?",
    metaTitle: "Location voiture aéroport Lisbonne : oui ou non",
    metaDescription:
      "Centre historique, Sintra et Cascais : quand la location à LIS est utile, ce qu’elle coûte, et les pièges de stationnement.",
    query: "louer une voiture à l’aéroport de Lisbonne",
    intro: [
      "Alfama, Chiado et Baixa se font à pied et en tram. Une voiture dès le T1 n’est utile que si vous sortez de Lisbonne dès le jour 2 (Sintra, Arrábida, Alentejo).",
    ],
    from: "LYS",
    to: "LIS",
    showFlight: true,
    showHotels: true,
    showCars: true,
    showBudget: true,
    flightHeading: "1. Quel est le meilleur moment pour acheter son billet ?",
    hotelHeading: "2. Où dormir si vous prenez (ou non) une voiture",
    carHeading: "3. Se déplacer : comparer une location à LIS",
    budgetHeading: "4. Budget voiture vs transports",
    body: [
      {
        heading: "Sans voiture",
        paragraphs: [
          "Tram 28, metro et trains Comboios de Portugal suffisent pour Sintra (gare Rossio) et Cascais (ligne de Cascais depuis Cais do Sodré).",
        ],
      },
      {
        heading: "Avec voiture",
        paragraphs: [
          "Réservez le véhicule pour le lendemain de l’arrivée : vous évitez la fatigue + le GPS dans les ruelles. Privilégiez une agence dans le terminal, franchise claire, et un GPS hors-ligne.",
          "Le stationnement au centre dépasse souvent 20–30 € / jour. Dormez alors à Parque das Nações ou près de LIS, pas à Alfama.",
        ],
      },
    ],
    budget: [
      { label: "Citadine / jour (hors plein)", amount: "25–55 €" },
      { label: "Parking centre / jour", amount: "18–30 €" },
      { label: "Train Rossio → Sintra A/R", amount: "environ 5 €" },
    ],
    budgetNote: "Comparez Discover Cars / Kayak / Expedia dans le widget : le même modèle varie selon l’assurance affichée.",
    related: ["guide-vol-sejour-lisbonne", "aeroport-lisbonne-centre-ville", "vol-lyon-lisbonne-pas-cher"],
    published: DAY,
  },
  {
    slug: "ou-dormir-lisbonne-quartiers",
    cluster: "lisbonne",
    title: "Où dormir à Lisbonne : sélection par quartier",
    metaTitle: "Où dormir à Lisbonne : Alfama, Chiado, Baixa, LX",
    metaDescription:
      "Quel quartier choisir selon votre vol, votre budget et vos horaires d’aéroport. Liens hôtels affiliés Booking / Kayak.",
    query: "où dormir Lisbonne quartier",
    intro: [
      "Le bon quartier dépend de votre heure d’atterrissage plus que d’Instagram. Alfama est magique et pentue ; Parque das Nações est plat et proche de LIS.",
    ],
    from: "CDG",
    to: "LIS",
    showFlight: true,
    showHotels: true,
    showCars: false,
    showBudget: true,
    flightHeading: "1. Quel est le meilleur moment pour acheter son billet ?",
    hotelHeading: "2. Où dormir sur place ? Sélection par quartier",
    carHeading: "3. Se déplacer",
    budgetHeading: "4. Budget hébergement",
    body: [
      {
        heading: "Alfama & Mouraria",
        paragraphs: [
          "Calme le soir, ruelles, fado. Inconfortable avec valise soute et 23 h d’arrivée. Idéal 3 nuits sans voiture.",
        ],
      },
      {
        heading: "Baixa, Chiado, Bairro Alto",
        paragraphs: [
          "Le plus pratique pour un premier séjour : commerces, metro, restaurants. Plus bruyant le week-end côté Bairro Alto.",
        ],
      },
      {
        heading: "Parque das Nações & aéroport",
        paragraphs: [
          "Vol tôt le matin ou late check-in : dormez ici, puis une nuit au centre. C’est le combo qui évite le taxi à 4 h.",
        ],
      },
    ],
    budget: [
      { label: "Chambre Baixa / Chiado", amount: "90–160 €" },
      { label: "Alfama petit hôtel / Airbnb", amount: "70–140 €" },
      { label: "Parque das Nações", amount: "80–150 €" },
    ],
    budgetNote: "Les prix explosent pendant les concerts au Estádio da Luz et les longs week-ends de mai.",
    related: ["guide-vol-sejour-lisbonne", "aeroport-lisbonne-centre-ville", "quand-acheter-billet-lisbonne"],
    published: DAY,
  },
  {
    slug: "quand-acheter-billet-lisbonne",
    cluster: "lisbonne",
    title: "Quand acheter son billet d’avion pour Lisbonne",
    metaTitle: "Quand réserver un vol pour Lisbonne depuis Paris ou Lyon",
    metaDescription:
      "Meilleures fenêtres d’achat, mois à éviter, et comparaison low-cost vs bagage cabine inclus vers LIS.",
    query: "quand acheter billet Lisbonne",
    intro: [
      "La requête « quand réserver Lisbonne » convertit mieux que « vol Lisbonne pas cher » : la personne a déjà une période en tête.",
    ],
    from: "CDG",
    to: "LIS",
    showFlight: true,
    showHotels: true,
    showCars: false,
    showBudget: true,
    flightHeading: "1. Quel est le meilleur moment pour acheter son billet ?",
    hotelHeading: "2. Bloquer l’hôtel dès le vol trouvé",
    carHeading: "3. Voiture",
    budgetHeading: "4. Budget vol selon la saison",
    body: [
      {
        heading: "Calendrier",
        paragraphs: [
          "Janvier–mars et novembre (hors Toussaint) : les bases les plus basses. Avril–juin : doux, prix médians. Juillet–août et Nouvel An : réservez 2 à 3 mois à l’avance.",
          "Si vous êtes flexible de ±3 jours, lancez la recherche ci-dessous puis retestez un départ mardi. Ajoutez le bagage cabine dans le total : un « 29 € » devient souvent 55 €.",
        ],
      },
    ],
    budget: [
      { label: "Hors-saison A/R", amount: "50–120 €" },
      { label: "Été / ponts A/R", amount: "140–280 €" },
      { label: "Bagage cabine low-cost A/R", amount: "+20–70 €" },
    ],
    budgetNote: "Les alertes prix des partenaires restent utiles ; le widget sert à convertir tout de suite.",
    related: ["guide-vol-sejour-lisbonne", "vol-lyon-lisbonne-pas-cher", "10-astuces-payer-billet-avion-moins-cher"],
    published: DAY,
  },
  {
    slug: "vol-lyon-lisbonne-pas-cher",
    cluster: "lisbonne",
    title: "Vol Lyon–Lisbonne pas cher : horaires, compagnies et bagages",
    metaTitle: "Vol Lyon Lisbonne pas cher : comparer LYS–LIS",
    metaDescription:
      "Transavia, easyJet, TAP : comment comparer un Lyon–Lisbonne en incluant le bagage cabine, pas seulement le tarif d’appel.",
    query: "vol Lyon Lisbonne pas cher",
    intro: [
      "LYS–LIS est moins saturé que CDG–LIS. C’est une requête de longue traîne : moins de blogs génériques, plus d’intention de départ depuis Rhône-Alpes.",
    ],
    from: "LYS",
    to: "LIS",
    showFlight: true,
    showHotels: true,
    showCars: true,
    showBudget: true,
    flightHeading: "1. Quel est le meilleur moment pour acheter son billet ?",
    hotelHeading: "2. Où dormir à l’arrivée",
    carHeading: "3. Voiture à LIS ou train vers Sintra",
    budgetHeading: "4. Budget depuis Lyon",
    body: [
      {
        heading: "Lire le tarif jusqu’au bout",
        paragraphs: [
          "Un aller simple à 35 € sans cabine prioritaire peut coûter plus cher qu’un TAP avec sac cabine inclus. Cochez la même cabine (éco) et le même bagage avant de juger.",
        ],
      },
    ],
    budget: [
      { label: "LYS–LIS A/R hors soute", amount: "70–190 €" },
      { label: "Navette Rhônexpress si besoin", amount: "variable" },
    ],
    budgetNote: "Ajoutez le Rhônexpress ou le parking LYS dans le vrai coût du week-end.",
    related: ["guide-vol-sejour-lisbonne", "quand-acheter-billet-lisbonne", "aeroport-lisbonne-centre-ville"],
    published: DAY,
  },
  {
    slug: "guide-vol-sejour-porto",
    cluster: "porto",
    title: "Guide complet : vol et séjour à Porto au meilleur prix",
    metaTitle: "Guide Porto : vol Paris, hôtel, voiture et budget",
    metaDescription:
      "Paris–Porto, bagages Volotea / Ryanair, Ribeira ou Cedofeita, et budget vin du Porto inclus.",
    query: "guide vol séjour Porto",
    intro: [
      "Porto se visite à pied. Le piège, ce n’est pas l’hôtel : c’est le bagage cabine low-cost et l’aéroport OPO, à 15 km du centre.",
    ],
    from: "ORY",
    to: "OPO",
    showFlight: true,
    showHotels: true,
    showCars: true,
    showBudget: true,
    flightHeading: "1. Quel est le meilleur moment pour acheter son billet ?",
    hotelHeading: "2. Où dormir sur place ? Sélection par quartier",
    carHeading: "3. Se déplacer : faut-il louer une voiture à OPO ?",
    budgetHeading: "4. Budget moyen à prévoir sur place",
    body: [
      {
        heading: "Quand partir",
        paragraphs: [
          "Mai, juin et septembre : lumière et terrasses sans la cohue d’août. Pour un city-break, réservez 5 à 7 semaines avant, davantage à Noël.",
        ],
      },
    ],
    budget: [
      { label: "Vol A/R low-cost", amount: "40–160 €" },
      { label: "Hôtel Ribeira / centre", amount: "75–150 €" },
      { label: "Journée (repas + metro)", amount: "40–60 €" },
    ],
    budgetNote: "Une cave à Vila Nova de Gaia : 15–40 € de dégustation selon la maison.",
    related: [
      "prix-bagage-cabine-volotea-paris-porto",
      "quand-reserver-vol-paris-porto",
      "aeroport-porto-centre-ville",
    ],
    published: DAY,
  },
  {
    slug: "prix-bagage-cabine-volotea-paris-porto",
    cluster: "porto",
    title: "Prix du bagage cabine Volotea : vol Paris–Porto",
    metaTitle: "Prix bagage cabine Volotea vol Paris Porto",
    metaDescription:
      "Combien coûte le bagage cabine Volotea sur un Paris–Porto, ce qui passe sous le siège, et comment comparer le vrai prix du billet.",
    query: "Prix bagage cabine Volotea vol Paris Porto",
    intro: [
      "Le tarif d’appel Volotea n’inclut souvent qu’un petit sac sous le siège. Le « bagage cabine » en soute ou en cabine prioritaire se paie à part — parfois plus cher à l’aéroport qu’en ligne.",
      "Ajoutez ce supplément avant de comparer à Transavia, Ryanair ou TAP. Le widget ci-dessous lance la recherche Paris–Porto pour figer le total.",
    ],
    from: "ORY",
    to: "OPO",
    showFlight: true,
    showHotels: true,
    showCars: false,
    showBudget: true,
    flightHeading: "1. Quel est le meilleur moment pour acheter son billet ?",
    hotelHeading: "2. Où dormir à Porto après un Volotea tardif",
    carHeading: "3. Voiture",
    budgetHeading: "4. Budget bagages à intégrer",
    body: [
      {
        heading: "Lire la franchise Volotea",
        paragraphs: [
          "Vérifiez sur la page compagnie le poids et les cm du sac cabine du moment (les grilles changent). Un sac à dos + un cabine 10 kg n’est pas le même produit qu’un simple underseat.",
          "Règle pratique : achetez le cabine en même temps que le siège. Le paiement à la porte est le scénario le plus cher, surtout sur un week-end Paris–Porto chargé.",
        ],
      },
      {
        heading: "Comparer le vrai prix",
        paragraphs: [
          "Alignez : même dates, même nombre de cabines, même inclusion bagage. Un TAP à 90 € avec cabine peut battre un Volotea à 39 € + 45 € de bagages A/R.",
        ],
      },
    ],
    budget: [
      { label: "Siège + underseat (indicatif)", amount: "tarif d’appel" },
      { label: "Cabine / prioritaire A/R (ordre de grandeur)", amount: "30–80 €" },
      { label: "Soute 20–23 kg A/R", amount: "40–120 €" },
    ],
    budgetNote:
      "Montants variables selon la date et la promo. Le prix contractuel est celui du partenaire au paiement.",
    related: ["guide-vol-sejour-porto", "quand-reserver-vol-paris-porto", "10-astuces-payer-billet-avion-moins-cher"],
    published: DAY,
  },
  {
    slug: "quand-reserver-vol-paris-porto",
    cluster: "porto",
    title: "Quand réserver son vol Paris–Porto",
    metaTitle: "Quand réserver un vol Paris Porto",
    metaDescription:
      "Combien de semaines à l’avance réserver ORY/CDG–OPO, quels jours partent moins cher, et piège bagages.",
    query: "quand réserver vol Paris Porto",
    intro: [
      "Sur une ligne low-cost courte, attendre la dernière semaine coûte souvent plus cher que sur un long-courrier. Six semaines est un bon point de départ, trois mois pour un pont de mai.",
    ],
    from: "ORY",
    to: "OPO",
    showFlight: true,
    showHotels: true,
    showCars: false,
    showBudget: true,
    flightHeading: "1. Quel est le meilleur moment pour acheter son billet ?",
    hotelHeading: "2. Coupler vol + hôtel dès que le mardi est trouvé",
    carHeading: "3. Voiture",
    budgetHeading: "4. Budget selon le lead time",
    body: [
      {
        heading: "Jours de la semaine",
        paragraphs: [
          "Les départs dimanche soir Paris → Porto et les retours dimanche soir Porto → Paris sont demandés. Testez jeudi ou samedi matin.",
        ],
      },
    ],
    budget: [
      { label: "Réservé 6–8 semaines avant", amount: "souvent le plus calme" },
      { label: "J−7 en high season", amount: "+40–120 € vs médiane" },
    ],
    budgetNote: "Une alerte n’empêche pas d’acheter un tarif déjà bon : les « encore plus bas » ne reviennent pas toujours.",
    related: ["prix-bagage-cabine-volotea-paris-porto", "guide-vol-sejour-porto", "aeroport-porto-centre-ville"],
    published: DAY,
  },
  {
    slug: "aeroport-porto-centre-ville",
    cluster: "porto",
    title: "Aéroport de Porto : comment rejoindre le centre-ville",
    metaTitle: "Aéroport Porto OPO → centre : metro, bus, taxi",
    metaDescription:
      "Metro ligne E violeta, temps de trajet et prix pour Ribeira, Bolhão ou Cedofeita depuis Francisco Sá Carneiro.",
    query: "aéroport Porto centre-ville",
    intro: [
      "La ligne E (violeta) du metro relie OPO à Trindade en environ 30 minutes. C’est la réponse ultra-spécifique que tapent les voyageurs encore dans l’avion.",
    ],
    from: "CDG",
    to: "OPO",
    showFlight: true,
    showHotels: true,
    showCars: true,
    showBudget: true,
    flightHeading: "1. Quel est le meilleur moment pour acheter son billet ?",
    hotelHeading: "2. Où dormir près du metro",
    carHeading: "3. Louer à OPO seulement pour le Douro",
    budgetHeading: "4. Budget transfert",
    body: [
      {
        heading: "Metro ligne E",
        paragraphs: [
          "Direction Estádio do Dragão, descendue Trindade puis correspondance. Achetez le titre Andante aux automates. Les valises passent hors heure de pointe.",
        ],
      },
    ],
    budget: [
      { label: "Metro Andante aéroport", amount: "environ 2–4 €" },
      { label: "Taxi / VTC vers Ribeira", amount: "25–40 €" },
    ],
    budgetNote: "La location auto n’est pas nécessaire pour un city-break Ribeira / Gaia.",
    related: ["guide-vol-sejour-porto", "prix-bagage-cabine-volotea-paris-porto", "ou-dormir-lisbonne-quartiers"],
    published: DAY,
  },
  {
    slug: "guide-vol-sejour-guadeloupe",
    cluster: "guadeloupe",
    title: "Guide complet : vol et séjour en Guadeloupe au meilleur prix",
    metaTitle: "Guide Guadeloupe : vol, hôtel, voiture et budget",
    metaDescription:
      "Quand réserver pour décembre, Orly–Pointe-à-Pitre, location de voiture indispensable, et budget quotidien.",
    query: "guide vol séjour Guadeloupe",
    intro: [
      "En Guadeloupe, la voiture n’est pas un luxe : c’est le réseau. Le vol Orly–PTP se réserve des mois à l’avance pour Noël. Ce guide suit la structure qui convertit : billet, hôtel, voiture, budget.",
    ],
    from: "ORY",
    to: "PTP",
    showFlight: true,
    showHotels: true,
    showCars: true,
    showBudget: true,
    flightHeading: "1. Quel est le meilleur moment pour acheter son billet ?",
    hotelHeading: "2. Où dormir : Grande-Terre vs Basse-Terre",
    carHeading: "3. Se déplacer : louer une voiture à l’aéroport PTP",
    budgetHeading: "4. Budget moyen à prévoir sur place",
    body: [
      {
        heading: "Deux îles, deux rythmes",
        paragraphs: [
          "Grande-Terre (Saint-François, Le Gosier) : plages et services. Basse-Terre : randonnée, cascade, route de la Traversée. Beaucoup de séjours mixent 4 nuits / 4 nuits.",
        ],
      },
    ],
    budget: [
      { label: "Vol A/R métropole (hors Noël)", amount: "450–800 €" },
      { label: "Vol A/R période Noël / Nouvel An", amount: "800–1400 €" },
      { label: "Voiture / semaine", amount: "250–450 €" },
      { label: "Courses + restaurants / jour / pers.", amount: "45–80 €" },
    ],
    budgetNote: "Les locations saisonnières se figent tôt pour décembre : bloquez hébergement dès le vol.",
    related: [
      "quand-reserver-vol-guadeloupe-decembre",
      "vol-orly-pointe-a-pitre",
      "10-astuces-payer-billet-avion-moins-cher",
    ],
    published: DAY,
  },
  {
    slug: "quand-reserver-vol-guadeloupe-decembre",
    cluster: "guadeloupe",
    title: "Quand réserver son vol pour la Guadeloupe en décembre",
    metaTitle: "Quand réserver son vol pour la Guadeloupe en décembre",
    metaDescription:
      "Calendrier d’achat pour un Orly ou CDG → Pointe-à-Pitre en décembre : vacances scolaires, Nouvel An, et pièges last minute.",
    query: "Quand réserver son vol pour la Guadeloupe en décembre",
    intro: [
      "Décembre en Guadeloupe, ce n’est pas une ligne low-cost de 39 €. Les sièges Air Caraïbes, Air France et Corsair se remplissent dès la rentrée, parfois dès juin pour les vacances de Noël.",
      "La requête exacte « quand réserver … en décembre » est typique d’un acheteur prêt à sortir la carte : le widget de recherche est donc au-dessus de la ligne de flottaison.",
    ],
    from: "ORY",
    to: "PTP",
    showFlight: true,
    showHotels: true,
    showCars: true,
    showBudget: true,
    flightHeading: "1. Quel est le meilleur moment pour acheter son billet ?",
    hotelHeading: "2. Où dormir sur place en haute saison",
    carHeading: "3. Réserver la voiture en même temps que le vol",
    budgetHeading: "4. Budget décembre",
    body: [
      {
        heading: "Calendrier recommandé",
        paragraphs: [
          "Vacances de Noël scolaires : visez une réservation entre mai et septembre. Octobre–novembre : il reste des places, plus chères. La dernière semaine, les tarifs last minute sont rarement une affaire sur PTP.",
          "Nouvel An (vols 28 déc. – 5 janv.) : traitez-le comme un événement, pas comme un city-break. Comparez ORY et CDG, et un aller Air Caraïbes / retour Air France si le combiné est plus bas.",
        ],
      },
      {
        heading: "Flexibilité qui paie",
        paragraphs: [
          "Partir le 13 décembre plutôt que le 20 peut faire plusieurs centaines d’euros. Un séjour qui chevauche moins les deux semaines de pointe scolaire reste plus calme à l’hôtel aussi.",
        ],
      },
    ],
    budget: [
      { label: "Vol A/R début décembre (hors vacances)", amount: "550–900 €" },
      { label: "Vol A/R cœur de vacances", amount: "850–1500 €" },
      { label: "Voiture 10 jours haute saison", amount: "400–700 €" },
    ],
    budgetNote: "Les « erronés » à 399 € disparaissent au paiement : comparez jusqu’à la page partenaire.",
    related: ["guide-vol-sejour-guadeloupe", "vol-orly-pointe-a-pitre", "10-astuces-payer-billet-avion-moins-cher"],
    published: DAY,
  },
  {
    slug: "vol-orly-pointe-a-pitre",
    cluster: "guadeloupe",
    title: "Vol Orly–Pointe-à-Pitre : direct, durée et compagnies",
    metaTitle: "Vol Orly Pointe-à-Pitre PTP : comparer les directs",
    metaDescription:
      "Durée de vol ORY–PTP, compagnies, bagages et correspondance : ce qu’il faut vérifier avant de réserver.",
    query: "vol Orly Pointe-à-Pitre direct",
    intro: [
      "Le direct Orly–Pointe-à-Pitre dure environ 8 h 30. Une escale Madrid ou Amsterdam peut sembler moins chère : ajoutez 4 à 8 h et un risque de bagage. Pour un congé court, le direct gagne presque toujours.",
    ],
    from: "ORY",
    to: "PTP",
    showFlight: true,
    showHotels: true,
    showCars: true,
    showBudget: true,
    flightHeading: "1. Quel est le meilleur moment pour acheter son billet ?",
    hotelHeading: "2. Première nuit près de PTP ou déjà au Gosier",
    carHeading: "3. Prendre la voiture au terminal",
    budgetHeading: "4. Budget vol + bagages",
    body: [
      {
        heading: "Compagnies fréquentes",
        paragraphs: [
          "Air Caraïbes (ORY), Air France et Corsair selon saison. Vérifiez la franchise bagages : un forfait « caïman » n’égale pas un Light d’une autre compagnie.",
        ],
      },
    ],
    budget: [
      { label: "Direct A/R hors pointe", amount: "500–850 €" },
      { label: "Soute 23 kg A/R si non incluse", amount: "80–200 €" },
    ],
    budgetNote: "Un vol de nuit économise une nuit d’hôtel à Paris, pas toujours une nuit sur place (arrivée le matin).",
    related: ["quand-reserver-vol-guadeloupe-decembre", "guide-vol-sejour-guadeloupe"],
    published: DAY,
  },
  {
    slug: "guide-vol-sejour-marrakech",
    cluster: "marrakech",
    title: "Guide complet : vol et séjour à Marrakech au meilleur prix",
    metaTitle: "Guide Marrakech : vol, riad, voiture et budget",
    metaDescription:
      "Quand acheter Paris–Marrakech, riad en médina vs Gueliz, transfert Menara, et budget quotidien.",
    query: "guide vol séjour Marrakech",
    intro: [
      "On ne se positionne pas sur « billet d’avion Maroc » (trop concurrentiel). On répond à : quel riad, quel transfert RAK, Transavia bagage, budget tajines et taxis.",
    ],
    from: "ORY",
    to: "RAK",
    showFlight: true,
    showHotels: true,
    showCars: true,
    showBudget: true,
    flightHeading: "1. Quel est le meilleur moment pour acheter son billet ?",
    hotelHeading: "2. Où dormir : médina, Gueliz ou hivernage",
    carHeading: "3. Se déplacer : voiture à Menara ou taxis",
    budgetHeading: "4. Budget moyen à prévoir sur place",
    body: [
      {
        heading: "Saisons",
        paragraphs: [
          "Mars–avril et octobre–novembre : les plus agréables. Été très chaud. Noël et ponts : tarifs vols + riads en hausse, réservez tôt.",
        ],
      },
    ],
    budget: [
      { label: "Vol A/R low-cost", amount: "50–180 €" },
      { label: "Riad médina / nuit", amount: "60–150 €" },
      { label: "Journée repas + petits taxis", amount: "30–50 €" },
    ],
    budgetNote: "Négociez le taxi aéroport avant de monter, ou prenez un transfert affiché à l’avance.",
    related: [
      "aeroport-marrakech-medina",
      "bagage-cabine-transavia-paris-marrakech",
      "quand-reserver-vol-marrakech-hiver",
    ],
    published: DAY,
  },
  {
    slug: "aeroport-marrakech-medina",
    cluster: "marrakech",
    title: "Aéroport de Marrakech : comment rejoindre la médina",
    metaTitle: "Aéroport Marrakech Menara → médina : taxi, bus",
    metaDescription:
      "Temps, prix et arnaques à éviter entre RAK et Jemaa el-Fna / votre riad dans la médina.",
    query: "aéroport Marrakech médina",
    intro: [
      "Menara (RAK) est proche : 15 à 25 minutes hors embouteillages. Le sujet, c’est le tarif taxi et l’accès ruelle du riad (souvent à pied sur les 200 derniers mètres).",
    ],
    from: "ORY",
    to: "RAK",
    showFlight: true,
    showHotels: true,
    showCars: true,
    showBudget: true,
    flightHeading: "1. Quel est le meilleur moment pour acheter son billet ?",
    hotelHeading: "2. Choisir un riad joignable le soir",
    carHeading: "3. Une voiture dès l’aéroport ?",
    budgetHeading: "4. Budget transfert",
    body: [
      {
        heading: "Taxi et bus",
        paragraphs: [
          "Taxi officiel au compteur ou forfait affiché : restez dans cet ordre de grandeur, 70–150 MAD selon l’heure (vérifiez le taux du jour). Le bus L19 / aéroport dessert Gueliz plus facilement que le cœur de médina.",
          "Prévenez le riad de votre heure d’arrivée : beaucoup envoient un groom à un point GPS, pas devant la porte cachée.",
        ],
      },
    ],
    budget: [
      { label: "Taxi RAK → médina", amount: "environ 8–20 €" },
      { label: "Bus", amount: "quelques dirhams" },
    ],
    budgetNote: "Une voiture de location le premier soir dans la médina n’a aucun intérêt.",
    related: ["guide-vol-sejour-marrakech", "bagage-cabine-transavia-paris-marrakech", "quand-reserver-vol-marrakech-hiver"],
    published: DAY,
  },
  {
    slug: "bagage-cabine-transavia-paris-marrakech",
    cluster: "marrakech",
    title: "Bagage cabine Transavia : vol Paris–Marrakech",
    metaTitle: "Bagage cabine Transavia Paris Marrakech : prix et taille",
    metaDescription:
      "Franchise Transavia sur ORY/CDG–RAK : petit sac, cabine 10 kg, soute, et comparaison du vrai prix du billet.",
    query: "bagage cabine Transavia Paris Marrakech",
    intro: [
      "Comme Volotea sur Porto, Transavia vend souvent un tarif Light : sac sous le siège seulement. Le cabine 10 kg se coche à la réservation. C’est une requête ultra-spécifique, donc un article qui convertit.",
    ],
    from: "ORY",
    to: "RAK",
    showFlight: true,
    showHotels: true,
    showCars: false,
    showBudget: true,
    flightHeading: "1. Quel est le meilleur moment pour acheter son billet ?",
    hotelHeading: "2. Riad avec coffre : utile si vous prenez la soute",
    carHeading: "3. Voiture",
    budgetHeading: "4. Budget bagages à additionner",
    body: [
      {
        heading: "Ne comparez pas le Light au Smart",
        paragraphs: [
          "Un Light + cabine A/R doit être comparé à un Smart / Flex qui l’inclut déjà. Sur Marrakech, l’écart se joue souvent sur 20 à 60 €, pas sur 200 €.",
        ],
      },
    ],
    budget: [
      { label: "Light A/R hors cabine", amount: "tarif d’appel" },
      { label: "Option cabine A/R (ordre de grandeur)", amount: "25–70 €" },
    ],
    budgetNote: "Les dimensions exactes sont celles du site Transavia au jour J ; elles priment sur tout article.",
    related: ["guide-vol-sejour-marrakech", "prix-bagage-cabine-volotea-paris-porto", "10-astuces-payer-billet-avion-moins-cher"],
    published: DAY,
  },
  {
    slug: "quand-reserver-vol-marrakech-hiver",
    cluster: "marrakech",
    title: "Quand réserver son vol pour Marrakech en hiver",
    metaTitle: "Quand réserver un vol Marrakech en hiver",
    metaDescription:
      "Noël, février, vacances d’hiver : fenêtres d’achat Paris–Marrakech et budget riad associé.",
    query: "quand réserver vol Marrakech hiver",
    intro: [
      "L’hiver marocain attire ceux qui fuient la grisaille. Les vacances de février se remplissent 6 à 10 semaines avant ; Noël encore plus tôt.",
    ],
    from: "CDG",
    to: "RAK",
    showFlight: true,
    showHotels: true,
    showCars: true,
    showBudget: true,
    flightHeading: "1. Quel est le meilleur moment pour acheter son billet ?",
    hotelHeading: "2. Où dormir en haute saison hivernale",
    carHeading: "3. Atlas : oui à la voiture ; médina : non",
    budgetHeading: "4. Budget hiver",
    body: [
      {
        heading: "Janvier vs février",
        paragraphs: [
          "Début janvier (après le 7) est souvent plus calme que les zones A/B/C de février. Si vous êtes télétravail, visez ces dates creuses.",
        ],
      },
    ],
    budget: [
      { label: "Vol A/R janvier creux", amount: "60–160 €" },
      { label: "Vol A/R vacances d’hiver", amount: "150–320 €" },
    ],
    budgetNote: "Les riads de charme se vendent plus vite que les sièges d’avion : cherchez les deux le même jour.",
    related: ["guide-vol-sejour-marrakech", "aeroport-marrakech-medina", "quand-reserver-vol-guadeloupe-decembre"],
    published: DAY,
  },
  {
    slug: "10-astuces-payer-billet-avion-moins-cher",
    cluster: "astuces",
    title: "10 astuces pour payer son billet d’avion moins cher",
    metaTitle: "10 astuces pour payer son billet d’avion moins cher",
    metaDescription:
      "Dates flexibles, bagages, aéroports secondaires, alertes : 10 leviers concrets, plus un visuel Pinterest à épingler.",
    query: "10 astuces pour payer son billet d'avion moins cher",
    intro: [
      "Ces astuces nourrissent Pinterest et le blog : un visuel clair, une liste actionnable, puis le comparateur. Ce n’est pas « vol pas cher monde entier », ce sont 10 gestes avant le paiement.",
    ],
    from: "CDG",
    to: "LIS",
    showFlight: true,
    showHotels: false,
    showCars: false,
    showBudget: true,
    flightHeading: "1. Testez tout de suite sur un trajet réel",
    hotelHeading: "2. Hôtels",
    carHeading: "3. Voiture",
    budgetHeading: "4. Ce que ces astuces font gagner",
    body: [
      {
        heading: "Les 10 leviers",
        paragraphs: [
          "1. Comparez le mardi et le mercredi, pas seulement le week-end. 2. Incluez le bagage cabine dans le prix, jamais le tarif Light seul. 3. Testez ORY et CDG, parfois BVA. 4. Élargissez ±3 jours. 5. Un aéroport d’arrivée secondaire (OPO vs LIS, FAO) si le train local est simple.",
          "6. Réservez les lignes Caraïbes / Noël des mois à l’avance. 7. Évitez le last minute sur les îles. 8. Une alerte ne remplace pas un tarif déjà correct. 9. Même cabine (éco vs business) pour juger. 10. Ouvrez le partenaire officiel : confirmez le tarif chez l’agence ou la compagnie, le réflexe de comparaison reste le bon.",
        ],
      },
      {
        heading: "Pinterest",
        paragraphs: [
          "Épinglez le visuel de cet article (compte Pinterest Pro relié au site). Les épingles « 10 astuces billet moins cher » ramènent un trafic régulier, surtout depuis mobile. Ajoutez le lien canonique de cette page dans la description de l’épingle.",
        ],
      },
    ],
    budget: [
      { label: "Bagage oublié à l’aéroport", amount: "souvent 40–80 €" },
      { label: "Mauvais jour de la semaine", amount: "20–100 €" },
      { label: "Noël Caraïbes réservé trop tard", amount: "200–600 €" },
    ],
    budgetNote: "Le plus gros levier reste la date, pas le code promo Instagram.",
    related: [
      "prix-bagage-cabine-volotea-paris-porto",
      "quand-reserver-vol-guadeloupe-decembre",
      "quand-acheter-billet-lisbonne",
    ],
    published: DAY,
    pinImage: "/pinterest-10-astuces.png",
  },
];

export function getGuide(slug: string) {
  return GUIDES.find((g) => g.slug === slug);
}

export function guidesByCluster(cluster: GuideClusterId) {
  return GUIDES.filter((g) => g.cluster === cluster);
}

export function relatedGuides(guide: Guide) {
  return guide.related
    .map((slug) => getGuide(slug))
    .filter((g): g is Guide => Boolean(g));
}
