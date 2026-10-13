import type { WeddingContent } from './types';

/**
 * THE ONE FILE TO EDIT.
 * Every name, date, ritual, venue, contact and switch for the site lives here (PRD §10).
 * Flip `ceremony` to "phere" for a Hindu Punjabi wedding; the invocation, blessing line,
 * ceremony event and venue swap automatically.
 */
export const wedding: WeddingContent = {
  ceremony: 'anandKaraj',
  accentScript: 'gurmukhi',
  theme: 'phulkari',
  siteName: 'Phulkari',

  couple: { bride: 'Simran', groom: 'Arjun', initials: 'S ✦ A' },
  hashtag: '#SimArjKaViah',
  mainCeremonyDateTime: '2027-02-21T10:00:00+05:30',
  city: 'Amritsar',
  tagline: 'Two hearts, one thread.',

  heroImage: {
    src: '/images/hero-sarson.svg',
    alt: 'A mustard field at dawn, painted softly in watercolour',
    width: 1600,
    height: 1000,
  },

  invitation: {
    invocation: {
      anandKaraj: { text: 'ੴ ਸਤਿਗੁਰ ਪ੍ਰਸਾਦਿ', lang: 'pa' },
      phere: { text: '॥ श्री गणेशाय नमः ॥', lang: 'hi' },
    },
    blessingLine: {
      anandKaraj: 'With the blessings of Waheguru and our elders, you are warmly invited',
      phere: 'With the blessings of the Almighty and our elders, you are warmly invited',
    },
    dateLine: 'Sunday, 21 February 2027',
  },

  families: {
    blessingLine: {
      pa: 'ਵੱਡਿਆਂ ਦੀ ਅਸੀਸ ਨਾਲ',
      roman: 'Vaddeyan di asees naal',
      en: 'with the blessings of our elders',
    },
    bride: {
      grandLabel: 'Grand-daughter of',
      grandparents: 'Late S. Gurdev Singh & Sardarni Harbans Kaur',
      parentLabel: 'Daughter of',
      parents: 'S. Harpreet Singh & Sardarni Manjeet Kaur',
      line: 'Our Simran, our heartbeat.',
    },
    groom: {
      grandLabel: 'Grandson of',
      grandparents: 'Sh. Om Prakash Malhotra & Smt. Kamla Malhotra',
      parentLabel: 'Son of',
      parents: 'Sh. Rajiv Malhotra & Smt. Neelam Malhotra',
      line: 'Our Arjun, our pride.',
    },
    closingLine: '…request the pleasure of your company, saprivaar.',
  },

  chapters: [
    {
      photo: '/images/story-1.svg',
      number: 'I',
      title: 'Where It Began',
      year: '2019',
      place: 'Chandigarh',
      story: 'A borrowed umbrella outside Sector 17, and a coffee that turned into three hours.',
    },
    {
      photo: '/images/story-2.svg',
      number: 'II',
      title: 'The First Lohri Together',
      year: '2021',
      story: 'He learnt the boliyan. Badly. Her family loved him anyway.',
    },
    {
      photo: '/images/story-3.svg',
      number: 'III',
      title: 'The Roka',
      year: '2025',
      story: 'Two families, one table full of mithai, and a lot of happy tears.',
    },
    {
      photo: '/images/story-4.svg',
      number: 'IV',
      title: 'Forever Begins',
      year: '2027',
      story: 'And now, with your blessings, we tie the knot.',
    },
  ],

  days: [
    {
      dateLabel: 'Day I · Friday, 19 February 2027',
      events: [
        {
          id: 'path',
          ceremony: 'anandKaraj',
          name: 'Sukhmani Sahib Path',
          gurmukhiName: 'ਸੁਖਮਨੀ ਸਾਹਿਬ ਪਾਠ',
          icon: 'diya',
          whatHappens: 'A prayer at home to seek blessings before the festivities begin, followed by langar.',
          about:
            'Sukhmani Sahib, the "Psalm of Peace", is recited by the family and the sangat. Everyone is welcome; please cover your head and sit on the floor if you are able. Langar (a simple vegetarian meal) is served after.',
          startTime: '2027-02-19T09:00:00+05:30',
          venueId: 'bride-home',
          dressCode: { colors: ['#F3E3B5', '#FCF9F3'], note: 'Modest, head covered' },
        },
        {
          id: 'chowki',
          ceremony: 'phere',
          name: 'Mata ki Chowki',
          gurmukhiName: 'ਮਾਤਾ ਦੀ ਚੌਕੀ',
          devanagariName: 'माता की चौकी',
          icon: 'bell',
          whatHappens: 'An evening of devotional songs at home to seek the Goddess’s blessings before the festivities begin.',
          about:
            'Bhajans and jagrata-style singing fill the house for a few hours. Prasad is served after; everyone is welcome to sit, sing and clap along.',
          startTime: '2027-02-19T09:00:00+05:30',
          venueId: 'bride-home',
          dressCode: { colors: ['#F3E3B5', '#FCF9F3'], note: 'Modest, traditional' },
        },
        {
          id: 'mehndi',
          name: 'Mehndi',
          gurmukhiName: 'ਮਹਿੰਦੀ',
          devanagariName: 'मेहंदी',
          icon: 'mehndi-cone',
          whatHappens: 'Henna for the bride and the ladies, with music and laughter all afternoon.',
          about:
            'The darker the mehndi, the more love (so they say). The groom’s initials are hidden somewhere in the bride’s design, and he has to find them. Guests are welcome to get a small design done too.',
          startTime: '2027-02-19T14:00:00+05:30',
          venueId: 'bride-home',
          dressCode: { colors: ['#5E7D3A', '#E2B93B'], note: 'Greens & yellows' },
          rsvp: true,
        },
        {
          id: 'sangeet',
          name: 'Ladies Sangeet',
          gurmukhiName: 'ਲੇਡੀਜ਼ ਸੰਗੀਤ',
          devanagariName: 'लेडीज़ संगीत',
          icon: 'dholki',
          whatHappens: 'Dholki, giddha and boliyan: the women of both families sing and tease.',
          about:
            'Traditionally a women-only evening of folk songs around a dholki (a small two-sided drum). Boliyan are short, witty couplets, usually at the expense of the in-laws. These days everyone joins in.',
          startTime: '2027-02-19T19:00:00+05:30',
          venueId: 'kesar-bagh',
          dressCode: { colors: ['#C2185B', '#E2B93B', '#3F7A8A'], note: 'Bright & festive' },
          rsvp: true,
        },
      ],
    },
    {
      dateLabel: 'Day II · Saturday, 20 February 2027',
      events: [
        {
          id: 'maiyan',
          name: 'Maiyan / Vatna',
          gurmukhiName: 'ਮਾਈਆਂ / ਵਟਣਾ',
          devanagariName: 'माइयां / वटना',
          icon: 'vatna-bowl',
          whatHappens:
            'Turmeric paste (vatna) is applied to bride and groom at their own homes for glow and good luck. On the groom’s side, his bhabhi fills a gharoli (pitcher) for his bath.',
          about:
            'After Maiyan the couple traditionally stays home until the wedding. Married women apply the paste with grass blades while singing; expect to get a little yellow yourself.',
          startTime: '2027-02-20T10:00:00+05:30',
          venueId: 'bride-home',
          dressCode: { colors: ['#E2B93B', '#F3E3B5'], note: 'Yellow, clothes you don’t mind staining' },
        },
        {
          id: 'jaggo',
          name: 'Jaggo',
          gurmukhiName: 'ਜਾਗੋ',
          devanagariName: 'जागो',
          icon: 'gagar',
          whatHappens:
            'The night-long "wake up!" party: a decorated gagar (pot) lit with diyas is carried on the head, everyone dances through the lanes with a khoonda (stick).',
          about:
            'Jaggo literally means "wake up". In the village the family would go door to door announcing the wedding; here we announce it to the whole farmhouse. The mami carries the gagar first, then it passes around.',
          startTime: '2027-02-20T21:00:00+05:30',
          venueId: 'kesar-bagh',
          dressCode: { colors: ['#7A1F1F', '#C08A2E', '#3F7A8A'], note: 'Punjabi suits, kurta-pajama, phulkari dupatta' },
          rsvp: true,
        },
      ],
    },
    {
      dateLabel: 'Day III · Sunday, 21 February 2027 · The Wedding',
      events: [
        {
          id: 'chooda',
          name: 'Chooda & Kaleere',
          gurmukhiName: 'ਚੂੜਾ ਤੇ ਕਲੀਰੇ',
          devanagariName: 'चूड़ा और कलीरे',
          icon: 'bangles',
          whatHappens:
            'The bride’s mama (maternal uncle) gives her the red-and-ivory chooda; golden kaleere are tied to it. Shaken over unmarried girls: whoever they fall on marries next!',
          about:
            'The chooda is purified overnight in milk and rose petals, and the bride does not see it until it is on her wrist. Kaleere are tied by sisters and friends, each with a wish.',
          startTime: '2027-02-21T06:30:00+05:30',
          venueId: 'bride-home',
          dressCode: { colors: ['#7A1F1F', '#FCF9F3'], note: 'Family only' },
          private: true,
        },
        {
          id: 'sehrabandi',
          name: 'Sehrabandi & Ghodi',
          gurmukhiName: 'ਸਿਹਰਾਬੰਦੀ ਤੇ ਘੋੜੀ',
          devanagariName: 'सेहराबंदी और घोड़ी',
          icon: 'sehra',
          whatHappens: 'The groom’s sehra is tied, his sister feeds the mare, and he rides out to bring his bride home.',
          about:
            'The sehra is a floral or beaded veil tied over the turban by the groom’s sister or bhabhi. His sister then feeds the ghodi (mare) and receives a gift for it. Baraatis gather here before leaving.',
          startTime: '2027-02-21T07:30:00+05:30',
          venueId: 'groom-home',
          dressCode: { colors: ['#C08A2E', '#F3E3B5', '#EFD9D3'], note: 'Festive' },
        },
        {
          id: 'milni',
          name: 'Baraat & Milni',
          gurmukhiName: 'ਬਰਾਤ ਤੇ ਮਿਲਣੀ',
          devanagariName: 'बारात और मिलनी',
          icon: 'garlands',
          whatHappens:
            'The baraat arrives with dhol; elders of both families embrace and exchange shagun, starting with the fathers.',
          about:
            'Milni means "meeting": matching relatives of both families (father with father, mama with mama) garland each other. Whoever lifts the other off the ground wins bragging rights for the year.',
          startTime: '2027-02-21T09:00:00+05:30',
          venueId: 'gurdwara',
          dressCode: { colors: ['#EFD9D3', '#F3E3B5', '#CFE0D8'], note: 'Pastels' },
        },
        {
          id: 'anand-karaj',
          ceremony: 'anandKaraj',
          name: 'Anand Karaj',
          gurmukhiName: 'ਅਨੰਦ ਕਾਰਜ',
          icon: 'four-loops',
          whatHappens: 'The holy union: four Laavan around Sri Guru Granth Sahib Ji, each with its own hymn.',
          about:
            'Anand Karaj means "blissful union". The couple walks around the Guru Granth Sahib four times while the four Laavan are sung, each describing a stage of love. Please keep your head covered for the whole ceremony, remove your shoes at the entrance, and avoid alcohol and tobacco on the premises.',
          startTime: '2027-02-21T10:00:00+05:30',
          endTime: '2027-02-21T12:00:00+05:30',
          venueId: 'gurdwara',
          dressCode: {
            colors: ['#FCF9F3', '#F3E3B5'],
            note: 'Head covered for all, shoes removed, modest attire, no alcohol or tobacco',
          },
          rsvp: true,
        },
        {
          id: 'phere',
          ceremony: 'phere',
          name: 'Phere',
          gurmukhiName: 'ਫੇਰੇ',
          devanagariName: 'फेरे',
          icon: 'sacred-fire',
          whatHappens: 'The sacred union: seven rounds around the holy fire, each with its own vow.',
          about:
            'The couple circles the Agni (sacred fire) seven times, one for each vow of married life, as the pandit recites the mantras. Modest attire; the ceremony may run late into the night.',
          startTime: '2027-02-21T10:00:00+05:30',
          endTime: '2027-02-21T12:00:00+05:30',
          venueId: 'mandap',
          dressCode: { colors: ['#FCF9F3', '#F3E3B5'], note: 'Modest attire; the ceremony may run late into the night' },
          rsvp: true,
        },
        {
          id: 'juta-chupai',
          name: 'Lunch & Juta Chupai',
          gurmukhiName: 'ਜੁੱਤੀ ਛੁਪਾਈ',
          devanagariName: 'जूता छुपाई',
          icon: 'juttis',
          whatHappens: 'Lunch, and the bride’s sisters hide the groom’s shoes. Negotiations get serious.',
          about:
            'The groom removes his shoes for the ceremony; the bride’s sisters steal them and demand a ransom to return them. The groom’s side tries to protect the shoes. The side with the better negotiator wins.',
          startTime: '2027-02-21T13:00:00+05:30',
          venueId: 'kesar-bagh',
        },
        {
          id: 'doli',
          name: 'Doli',
          gurmukhiName: 'ਡੋਲੀ',
          devanagariName: 'डोली',
          icon: 'doli',
          whatHappens:
            'The emotional farewell: the bride throws phulliyan (puffed rice) over her head toward her home, wishing it prosperity.',
          about:
            'Also called Vidaai. The bride leaves her parental home with her husband; her brothers push the car a few feet to see her off. Tissues will be provided.',
          startTime: '2027-02-21T16:00:00+05:30',
          venueId: 'kesar-bagh',
        },
        {
          id: 'reception',
          name: 'Reception',
          gurmukhiName: 'ਰਿਸੈਪਸ਼ਨ',
          devanagariName: 'रिसेप्शन',
          icon: 'lights',
          whatHappens: 'Dinner, bhangra, and the newlyweds’ first evening as one.',
          startTime: '2027-02-21T20:00:00+05:30',
          venueId: 'ballroom',
          dressCode: { colors: ['#2E2622', '#C08A2E', '#7A1F1F'], note: 'Formal / Indo-western' },
          rsvp: true,
        },
      ],
    },
  ],

  glossary: [
    { rasam: 'Roka', when: 'Months before', meaning: 'The families formally "stop" searching; the match is fixed with blessings and mithai' },
    { rasam: 'Thaka', when: 'Before engagement', meaning: 'The bride’s family visits the groom’s to formally accept him (often merged with Roka)' },
    { rasam: 'Chunni Chadana', when: 'Engagement', meaning: 'The groom’s mother drapes a red chunni over the bride’s head, welcoming her into the family' },
    { rasam: 'Kurmai / Mangni', when: 'Engagement', meaning: 'Ring ceremony; the groom’s family gives shagun and gifts' },
    { rasam: 'Path', when: 'Days before', meaning: 'Prayer at home: Akhand Path, Sukhmani Sahib, or Mata ki Chowki' },
    { rasam: 'Mehndi', when: '1–2 days before', meaning: 'Henna; the darker the colour, the more love (so they say)' },
    { rasam: 'Ladies Sangeet', when: 'Evening before', meaning: 'Dholki, giddha, boliyan, the family’s best dancers' },
    { rasam: 'Maiyan / Vatna', when: 'Day before', meaning: 'Turmeric paste ritual; the couple doesn’t leave home until the wedding after this' },
    { rasam: 'Gharoli', when: 'Day before', meaning: 'The groom’s bhabhi fills a pitcher from the gurdwara/well for his ceremonial bath' },
    { rasam: 'Jaggo', when: 'Night before', meaning: '"Wake up!": a lit gagar procession to announce the wedding to the neighbourhood' },
    { rasam: 'Chooda', when: 'Wedding morning', meaning: 'The mama gives the bride her chooda, purified in milk and rose petals' },
    { rasam: 'Kaleere', when: 'Wedding morning', meaning: 'Golden ornaments tied to the chooda by friends and sisters' },
    { rasam: 'Sehrabandi', when: 'Wedding morning', meaning: 'Tying the sehra (floral or beaded veil) on the groom’s turban' },
    { rasam: 'Ghodi Chadna', when: 'Wedding morning', meaning: 'The groom mounts the mare; his sister feeds it and receives a gift' },
    { rasam: 'Baraat', when: 'Wedding', meaning: 'The groom’s procession with dhol and bhangra' },
    { rasam: 'Milni', when: 'Wedding', meaning: 'Matching relatives of both families embrace and exchange gifts' },
    { rasam: 'Anand Karaj / Phere', when: 'Wedding', meaning: 'The ceremony itself: four Laavan (Sikh) or seven Phere (Hindu)' },
    { rasam: 'Juta Chupai', when: 'After ceremony', meaning: 'Shoe-stealing by the bride’s sisters for a "ransom"' },
    { rasam: 'Doli / Vidaai', when: 'After ceremony', meaning: 'The bride departs her parental home' },
    { rasam: 'Paani Vaarna', when: 'Arrival at groom’s home', meaning: 'The groom’s mother circles water over the couple’s heads and sips it, warding off evil (family only)' },
    { rasam: 'Phera Pauna', when: 'Day after', meaning: 'The couple visits the bride’s family for the first time as husband and wife (family only)' },
  ],

  venues: [
    {
      id: 'kesar-bagh',
      name: 'Kesar Bagh Farmhouse',
      shortName: 'Farmhouse',
      address: 'GT Road, Amritsar, Punjab',
      description: 'A quiet mustard-field farmhouse 20 minutes from the city.',
      hours: 'Sangeet 7 PM · Jaggo 9 PM · Lunch 1 PM',
      mapQuery: 'Kesar Bagh Farmhouse, GT Road, Amritsar',
      insiderTip: 'Park at Gate 2; the Jaggo starts from the back lawns.',
      artwork: 'farmhouse',
      travel: {
        air: 'Sri Guru Ram Dass Jee International Airport (ATQ), ~35 min drive',
        train: 'Amritsar Junction (ASR), ~25 min',
        road: '~4.5 hrs from Chandigarh via NH-3',
      },
      listed: true,
    },
    {
      id: 'gurdwara',
      name: 'Gurdwara Sahib, Ranjit Avenue',
      shortName: 'Gurdwara',
      address: 'Ranjit Avenue, Amritsar, Punjab',
      description: 'The Anand Karaj takes place in the main darbar hall; the Milni is at the gate.',
      hours: 'Milni 9 AM · Anand Karaj 10 AM',
      mapQuery: 'Gurdwara Sahib Ranjit Avenue Amritsar',
      insiderTip: 'Head coverings (rumaals) will be available at the entrance.',
      artwork: 'gurdwara',
      travel: {
        air: 'ATQ airport, ~20 min drive',
        train: 'Amritsar Junction, ~15 min',
        road: 'Shuttles leave the farmhouse at 8:15 AM',
      },
      listed: true,
    },
    {
      id: 'mandap',
      name: 'Kesar Bagh Mandap',
      shortName: 'Mandap',
      address: 'GT Road, Amritsar, Punjab',
      description: 'The Phere take place under the open-air mandap on the front lawn.',
      hours: 'Milni 9 AM · Phere 10 AM',
      mapQuery: 'Kesar Bagh Farmhouse, GT Road, Amritsar',
      insiderTip: 'Shawls are available near the mandap; mornings are cold in February.',
      artwork: 'mandap',
      travel: {
        air: 'ATQ airport, ~35 min drive',
        train: 'Amritsar Junction, ~25 min',
        road: '~4.5 hrs from Chandigarh via NH-3',
      },
      listed: false,
    },
    {
      id: 'ballroom',
      name: 'The Grand Ballroom',
      shortName: 'Ballroom',
      address: 'Mall Road, Amritsar, Punjab',
      description: 'Dinner and dancing under the chandeliers, a short drive from the farmhouse.',
      hours: 'Reception from 8 PM',
      mapQuery: 'The Grand Ballroom Mall Road Amritsar',
      insiderTip: 'Valet is at the main porch; the dance floor opens at 9:30.',
      artwork: 'ballroom',
      travel: {
        air: 'ATQ airport, ~25 min drive',
        train: 'Amritsar Junction, ~10 min',
        road: 'Shuttles from the farmhouse every 30 min from 7 PM',
      },
      listed: true,
    },
    {
      id: 'bride-home',
      name: 'Bride’s home',
      shortName: 'Bride’s home',
      address: 'Ranjit Avenue, Amritsar',
      description: '',
      mapQuery: 'Ranjit Avenue, Amritsar',
      artwork: 'home',
      listed: false,
    },
    {
      id: 'groom-home',
      name: 'Groom’s home',
      shortName: 'Groom’s home',
      address: 'Green Avenue, Amritsar',
      description: '',
      mapQuery: 'Green Avenue, Amritsar',
      artwork: 'home',
      listed: false,
    },
  ],

  // One photo + one caption each. Even 3 is fine; the section hides itself when this is empty.
  gallery: [
    { src: '/images/gallery/photo-1.svg', alt: 'Simran and Arjun under one umbrella', width: 800, height: 1000 },
    { src: '/images/gallery/photo-2.svg', alt: 'Simran and Arjun at the Roka', width: 800, height: 700 },
    { src: '/images/gallery/photo-3.svg', alt: 'Simran and Arjun in the mustard fields', width: 800, height: 900 },
    { src: '/images/gallery/photo-4.svg', alt: 'Simran and Arjun at Lohri', width: 800, height: 800 },
    { src: '/images/gallery/photo-5.svg', alt: 'Simran and Arjun on a rooftop in Amritsar', width: 800, height: 1050 },
    { src: '/images/gallery/photo-6.svg', alt: 'Simran and Arjun laughing', width: 800, height: 650 },
  ],

  rsvp: {
    deadline: '2027-01-31',
    defaultPartySize: 2,
    maxPartySize: 6,
    foodOptions: ['Veg', 'Jain', 'No onion-garlic', 'Non-veg', 'Other'],
  },

  blessings: {
    requireApproval: false,
    seed: [
      { name: 'Nani ji', message: 'Rabb tuhaanu sada khush rakhe. (May God keep you happy always)' },
      { name: 'Rohan', place: 'college', message: 'Arjun, she’s way out of your league. Hold on tight!' },
      { name: 'Kaur Aunty', place: 'Jalandhar', message: 'Jodi salamat rahe. (May the pair stay blessed)' },
      { name: 'Biji', place: 'Ludhiana', message: 'ਸਦਾ ਹੱਸਦੇ ਵੱਸਦੇ ਰਹੋ। Always laugh, always flourish.' },
      { name: 'Priya & Dev', place: 'Delhi', message: 'Can’t wait to dance at the Jaggo. Save us a khoonda!' },
    ],
  },

  contacts: [
    {
      name: 'Gurpreet Singh',
      relation: 'Bride’s Brother',
      side: 'bride',
      askAbout: 'Stay, airport pickup',
      phone: '+919800000001',
      languages: ['Punjabi', 'Hindi', 'English'],
    },
    {
      name: 'Jasleen Kaur',
      relation: 'Bride’s Cousin',
      side: 'bride',
      askAbout: 'Mehndi & Sangeet',
      phone: '+919800000002',
      languages: ['Punjabi', 'English'],
    },
    {
      name: 'Karan Malhotra',
      relation: 'Groom’s Brother',
      side: 'groom',
      askAbout: 'Baraat, transport, anything else',
      phone: '+919800000003',
      languages: ['Hindi', 'Punjabi', 'English'],
    },
  ],
  travelStay: {
    name: 'Hotel Ramgarhia, Ranjit Avenue',
    message:
      'Rooms are blocked for outstation guests from 18 to 22 February. Shuttles run to every venue, and if you tell Gurpreet your arrival time someone will be at the airport or station with your name on a board.',
    phone: '+911830000000',
    mapQuery: 'Hotel Ramgarhia Ranjit Avenue Amritsar',
  },
  bestTimeToCall: 'Best time to call: 10 AM – 9 PM',

  closingMessage: 'Your presence is the most precious shagun. Thank you for being part of our story.',
  signOffMessage: 'From two homes, two families, two hearts, now one. See you at the wedding.',
  showRivers: true,

  share: {
    title: 'Simran & Arjun · 21 Feb 2027',
    description: 'You’re invited to our wedding in Amritsar.',
  },

  labels: {
    invitation: { pa: 'ਜੀ ਆਇਆਂ ਨੂੰ', hi: 'जी आयां नूं', roman: 'Ji Aayan Nu', en: 'Welcome' },
    hero: { pa: 'ਸ਼ੁਭ ਵਿਆਹ', hi: 'शुभ विवाह', roman: 'Shubh Viah', en: 'Auspicious wedding' },
    countdown: { pa: 'ਬਸ ਕੁਝ ਦਿਨ ਹੋਰ', hi: 'बस कुछ दिन और', roman: 'Bas Kujh Din Hor', en: 'Just a few more days' },
    story: { pa: 'ਸਾਡੀ ਕਹਾਣੀ', hi: 'साडी कहाणी', roman: 'Saadi Kahaani', en: 'Our story' },
    family: { pa: 'ਸਾਡਾ ਪਰਿਵਾਰ', hi: 'साडा परिवार', roman: 'Saada Parivaar', en: 'Our family' },
    events: { pa: 'ਰਸਮਾਂ', hi: 'रस्मां', roman: 'Rasmaan', en: 'The rituals' },
    gallery: { pa: 'ਯਾਦਾਂ', hi: 'यादां', roman: 'Yaadan', en: 'Memories' },
    rsvp: { pa: 'ਤੁਸੀਂ ਆ ਰਹੇ ਹੋ?', hi: 'तुसी आ रहे हो?', roman: 'Tusi Aa Rahe Ho?', en: 'Are you coming?' },
    blessings: { pa: 'ਅਸੀਸ', hi: 'असीस', roman: 'Asees', en: 'Blessings' },
    venue: { pa: 'ਕਿੱਥੇ', hi: 'किथे', roman: 'Kithe', en: 'Where' },
    contact: { pa: 'ਗੱਲ ਕਰੋ', hi: 'गल करो', roman: 'Gall Karo', en: 'Talk to us' },
    closing: { pa: 'ਧੰਨਵਾਦ', hi: 'धन्नवाद', roman: 'Dhanvaad', en: 'Thank you' },
    loveNote: { pa: 'ਪਿਆਰ ਨਾਲ', hi: 'प्यार नाल', roman: 'Pyaar Naal', en: 'With love' },
  },
};

/** Events visible for the configured ceremony (private ones included; filter those at render time). */
export function eventsForCeremony(content: WeddingContent = wedding) {
  return content.days.map((day) => ({
    ...day,
    events: day.events.filter((e) => !e.ceremony || e.ceremony === content.ceremony),
  }));
}

export function venueById(id: string, content: WeddingContent = wedding) {
  return content.venues.find((v) => v.id === id);
}

export function mainCeremonyEvent(content: WeddingContent = wedding) {
  return eventsForCeremony(content)
    .flatMap((d) => d.events)
    .find((e) => e.startTime === content.mainCeremonyDateTime && !e.private);
}
