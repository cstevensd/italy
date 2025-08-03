
import { CuratedGuideContent } from '../types';

export const curatedGuides: Record<string, CuratedGuideContent> = {
  "Florence": {
    name: "Florence Guide",
    overviewText: "Florence is filled with incredible sights. It is hard to see everything so we put together a list to guide you in exploring Florence. Florence is a fascinating place so don't just rush to see the sights. Feel the life in Florence!",
    sections: [
      {
        title: "Fun Facts",
        content: [
          { name: "Art Treasures", description: "According to UNESCO, almost a third of the world's art treasures reside in Florence. Main galleries include the Uffizi, Bargello, and the Academy." },
          { name: "Cuisine", description: "Specialties include tripe and bistecca alla Fiorentina (a large, char-grilled t-bone steak)." },
          { name: "History", description: "Florence became the first city in Europe with paved streets in 1339." },
          { name: "Language", description: "Dante Aligheri, a native Florentine, is credited with creating the standard Italian language." },
          { name: "Ponte Vecchio", description: "The Ponte Vecchio is the only bridge in Florence that survived World War II. Hitler said it was too beautiful to destroy." },
        ],
      },
      {
        title: "Top Attractions",
        content: [
          { name: "Il Duomo - Cathedral of Santa Maria del Fiore", description: "Florence's most popular site, a huge Gothic duomo started in 1296. You can buy a ticket to climb the 463 steps to the top of Brunelleschi's Dome.", address: "Piazza del Duomo, 50122 Firenze FI, Italy" },
          { name: "Ponte Vecchio", description: "The 'old bridge' built in 1345, lined with shops selling gold and silver jewelry.", address: "Ponte Vecchio, 50125 Firenze FI, Italy" },
          { name: "Uffizi Gallery", description: "Holds the world's most important collection of Renaissance art. Buy tickets ahead to avoid long lines.", address: "Piazzale degli Uffizi, 6, 50122 Firenze FI, Italy" },
          { name: "Galleria dell' Accademia", description: "Home to Michelangelo's David. It's recommended to go early, late, or buy tickets in advance.", address: "Via Ricasoli, 58/60, 50122 Firenze FI, Italy" },
          { name: "Boboli Garden and Pitti Palace", description: "A huge hillside garden behind the Pitti Palace, offering beautiful views.", address: "Piazza de' Pitti, 1, 50125 Firenze FI, Italy" },
          { name: "Piazzale Michelangelo", description: "Hike the steps for a beautiful view of Florence, especially at sunset.", address: "Piazzale Michelangelo, 50125 Firenze FI, Italy" },
          { name: "Mercato Centrale", description: "A covered Tuscan market with everything from cheeses to truffles and food stalls.", address: "Piazza del Mercato Centrale, Via dell'Ariento, 50123 Firenze FI, Italy" },
        ],
      },
      {
        title: "Recommended Restaurants",
        content: [
          { name: "Trattoria CasaLinga", description: "Very inexpensive.", address: "Via dei Michelozzi, 9r, 50125 Firenze FI, Italy" },
          { name: "Trattoria da Mario", description: "No credit cards. A noisy, busy legend.", address: "Via Rosina, 2, 50123 Firenze FI, Italy" },
          { name: "Acqua al 2", description: "Offers 'assaggi di primi' (tastings of first courses). Reservations suggested.", address: "Via della Vigna Vecchia, 40/r, 50122 Firenze FI, Italy" },
          { name: "Osteria del Gatto e la Volpe", description: "Cozy place with reasonable food and prices.", address: "Via Ghibellina, 151r, 50122 Firenze FI, Italy" },
        ],
      },
      {
        title: "Top Gelaterias",
        content: [
          { name: "Gelateria dei Neri", address: "Via dei Neri, 9/10r, 50122 Firenze FI, Italy" },
          { name: "Grom", address: "Via del Campanile, 2, 50122 Firenze FI, Italy" },
          { name: "Gelateria Carrozze", address: "Piazza del Pesce, 3, 50122 Firenze FI, Italy" },
        ],
      },
      {
        title: "Tips & Suggestions",
        content: [
            { name: "Leather Markets", description: "Walk through the leather markets - make sure you bargain!" },
            { name: "Validate Train Tickets", description: "If you take a side trip by train, MAKE SURE YOU VALIDATE YOUR TICKET in the yellow machine before getting on the train." },
            { name: "Groceries", description: "Grocery stores in the center tend to be small and expensive. Try to locate a bigger store outside the center for more affordable prices." },
        ]
      }
    ],
  },
  "Rome": {
    name: "Rome 5-Day Guide",
    overviewText: "A pre-planned step-by-step timeline and city guide for Rome. Follow it and get the best of the city.",
    sections: [
      {
        title: "Day 1: Ancient Rome",
        content: [
          { name: "09:00-10:30 - Colosseum", description: "Iconic symbol of Imperial Rome. A 12€ combo-ticket includes Palatine Hill and Roman Forum.", address: "Piazza del Colosseo, 1, 00184 Roma RM, Italy" },
          { name: "10:35-10:45 - Arch of Constantine", description: "Triumphal arch next to the Colosseum.", address: "Via di San Gregorio, 00186 Roma RM, Italy" },
          { name: "10:50-13:20 - Roman Forum and Palatine Hill", description: "The center of the ancient world.", address: "Via della Salara Vecchia, 5/6, 00186 Roma RM, Italy" },
          { name: "15:30-15:50 - Piazza Venezia", description: "Focal point of modern Rome.", address: "Piazza Venezia, 00187 Roma RM, Italy" },
          { name: "15:50-16:20 - Vittorio Emanuele II Monument", description: "Spectacular view of Rome. Take the glass elevator to the rooftop.", address: "Piazza Venezia, 00186 Roma RM, Italy" },
          { name: "16:35-17:05 - Pantheon", description: "The world's largest unreinforced concrete dome.", address: "Piazza della Rotonda, 00186 Roma RM, Italy" },
          { name: "17:20-17:50 - Trevi Fountain", description: "Throw a coin to ensure your return to Rome.", address: "Piazza di Trevi, 00187 Roma RM, Italy" },
          { name: "18:10-18:40 - Spanish Steps", description: "Rome's most beloved Rococo monument.", address: "Piazza di Spagna, 00187 Roma RM, Italy" },
        ]
      },
      {
        title: "Day 2: Vatican & More",
        content: [
            { name: "09:00-10:10 - St. Peter's Basilica", description: "Largest Christian church in the world. Dress code enforced.", address: "Piazza San Pietro, 00120 Città del Vaticano, Vatican City" },
            { name: "11:00-13:30 - Vatican Museums", description: "Includes the Sistine Chapel. Book tickets online to avoid long queues.", address: "Viale Vaticano, 00165 Roma RM, Italy" },
            { name: "15:30-15:50 - Castel Sant' Angelo", description: "Magnificent historical monument and fortress.", address: "Lungotevere Castello, 50, 00193 Roma RM, Italy" },
            { name: "16:00-16:30 - Piazza Navona", description: "One of the most beautiful squares in Rome, with Bernini's Fountain of Four Rivers.", address: "Piazza Navona, 00186 Roma RM, Italy" },
            { name: "16:45-17:15 - Campo de' Fiori", description: "Lively square with a famous morning market.", address: "Piazza Campo de' Fiori, 00186 Roma RM, Italy" },
        ]
      }
    ]
  },
  "Tuscany": {
      name: "Tuscany Guide",
      overviewText: "Explore the heart of Tuscany with our guide to vineyards, wellness, local markets, and activities for the whole family.",
      sections: [
          {
              title: "Vineyards (Bolgheri Area)",
              content: [
                  { name: "Ornellaia Vineyard", description: "A world-renowned producer of 'Super Tuscan' wines. High interest, so arrange visits in advance.", address: "Località Ornellaia, 191, Frazione Bolgheri, 57022 Castagneto Carducci LI, Italy" },
                  { name: "Tenuta San Guido (Sassicaia)", description: "Known as the first producer of the popular Sassicaia wine. The vineyard itself cannot be visited but there is a restaurant and wine shop.", address: "Località Le Capanne, 27, 57022 Bolgheri LI, Italy" },
              ]
          },
          {
              title: "Wellness & Hot Springs",
              content: [
                  { name: "Cascate del Mulino, Saturnia", description: "Famous natural hot springs, free and open to the public. A series of terraced limestone pools.", address: "Via della Follonata, 58014 Saturnia, Manciano GR, Italy" },
                  { name: "Terme di San Filippo", description: "Known for its five hot springs and the 'Fosso Bianco', a series of stunning white calcareous rock formations and pools.", address: "Bagni San Filippo, 53023 Castiglione d'Orcia, SI, Italy" },
              ]
          },
          {
              title: "Local Markets & Groceries",
              content: [
                { name: "Food Market in Saline di Volterra", description: "Every Tuesday morning on the parking place on the way to Pomarance. Find fresh fruits and vegetables." },
                { name: "Food Market in Volterra (Piazza dei Priori)", description: "Every Saturday morning." },
                { name: "Mercato di Sant'Ambrogio (Florence)", description: "A bustling indoor/outdoor market with fresh produce, meats, cheese, and a great local atmosphere.", address: "Piazza Lorenzo Ghiberti, 50122 Firenze FI, Italy"}
              ]
          },
          {
              title: "Kid-Friendly Activities",
              content: [
                  { name: "Cooking Classes at Osteria Etrusca", description: "Hands-on classes for the whole family. Recipes may include fresh pasta, real pizza, focaccia, and fruit salads." },
                  { name: "Acqua Village Cecina", description: "A large water park, great for a fun day out.", address: "Via Tevere, 25, 57023 Cecina LI, Italy" },
                  { name: "Explore Medieval Towns", description: "Towns like San Gimignano and Volterra were used as sets for filming Twilight and are great for exploring, with towers to climb and medieval armor to see." },
              ]
          }
      ]
  }
};
