// All invitation content lives here. Edit this file only; markup and motion read from it.
// Hindi translations of the text live in content.hi.js.
// Every value marked TODO is a sample placeholder — replace it with the real detail.
export default {
  bride: 'Pragya', // TODO
  groom: 'Nitin', // TODO
  heroDateText: 'Thursday, 10 December 2026', // TODO
  city: 'Ghaziabad, U.P.', // TODO
  countdownTarget: '2026-12-10T19:00:00+05:30', // Wedding day, Baraat 7 PM IST
  invocation: 'ॐ श्री गणेशाय नमः',

  overlay: {
    invite: 'You are cordially invited',
    afterNames: 'Wedding',
    button: 'Open Invitation',
  },
  hero: { tagline: '' },

  families: {
    invocation: '॥ श्री गणेशाय नमः ॥',
    blessingLine: 'With the blessings of our elders and the grace of the almighty,',
    bride: { label: 'Daughter of', parents: 'Mrs. Archana & Mr. Rajeev Nandan Prasad', grandparents: 'granddaughter of late Smt. Chintamani & late Shri Vasudev Bhagat' }, // TODO
    groom: { label: 'Son of', parents: 'Mrs. Babita & Mr. Karamveer Singh', grandparents: 'grandson of late Smt. Pitam Kaur & late Shri Baburam' }, // TODO
    request: 'Request the honour of your gracious presence as their children wed',
    closing: 'Your blessings are the most treasured gift.',
  },

  celebrations: {
    eyebrow: 'Save the dates',
    title: 'The Celebrations',
    subtitle: 'Two days of colour, music and blessings',
  },

  // Order and count of the timeline events come from this array.
  // mapUrl: paste the "Share → Copy link" URL from Google Maps. address is optional (used in the Venues list).
  events: [
    {
      key: 'mehendi', name: 'Mehendi', date: 'Tuesday, 8 December', time: '7:00 PM onwards', // TODO
      venue: 'Abharam Retreats', area: 'Ghaziabad, U.P.', address: 'Fly Over Bridge 70, Ghaziabad 201002', // TODO
      mapUrl: 'https://www.google.com/maps/place/Abharam+Retreats/@28.6392486,77.4628645,17z/data=!3m1!4b1!4m9!3m8!1s0x390cefbf7f2fc6c1:0xc15c06d529f721e9!5m2!4m1!1i2!8m2!3d28.6392486!4d77.4628645!16s%2Fg%2F11y01b4wc4?entry=ttu&g_ep=EgoyMDI2MTAxMy4wIKXMDSoASAFQAw%3D%3D', // TODO
      dress: 'Shades of green', note: 'Henna, folk songs and a long lazy lunch.', art: 'scene-mehndi', // TODO note
    },
    {
      key: 'haldi', name: 'Haldi', date: 'Wednesday, 9 December', time: '10:00 AM onwards', // TODO
      venue: 'Abharam Retreats', area: 'Ghaziabad, U.P.', address: 'Fly Over Bridge 70, Ghaziabad 201002', // TODO
      mapUrl: 'https://www.google.com/maps/place/Abharam+Retreats/@28.6392486,77.4628645,17z/data=!3m1!4b1!4m9!3m8!1s0x390cefbf7f2fc6c1:0xc15c06d529f721e9!5m2!4m1!1i2!8m2!3d28.6392486!4d77.4628645!16s%2Fg%2F11y01b4wc4?entry=ttu&g_ep=EgoyMDI2MTAxMy4wIKXMDSoASAFQAw%3D%3D', // TODO
      dress: 'Yellow', note: 'Expect turmeric everywhere — white is a brave choice.', art: 'scene-haldi', // TODO note
    },
    {
      key: 'engagement', name: 'Engagement', date: 'Wednesday, 9 December', time: '7:00 PM onwards', // TODO
      venue: 'Abharam Retreats', area: 'Ghaziabad, U.P.', address: 'Fly Over Bridge 70, Ghaziabad 201002', // TODO
      mapUrl: 'https://www.google.com/maps/place/Abharam+Retreats/@28.6392486,77.4628645,17z/data=!3m1!4b1!4m9!3m8!1s0x390cefbf7f2fc6c1:0xc15c06d529f721e9!5m2!4m1!1i2!8m2!3d28.6392486!4d77.4628645!16s%2Fg%2F11y01b4wc4?entry=ttu&g_ep=EgoyMDI2MTAxMy4wIKXMDSoASAFQAw%3D%3D', // TODO
      dress: 'Festive evening wear', note: 'Rings and dancing under the lamps.', art: 'scene-sangeet', // TODO note
    },
    {
      key: 'wedding', name: 'Wedding', date: 'Thursday, 10 December', time: 'Baraat 7 PM · Pheras Midnight', // TODO
      venue: 'Queens Lawn, Vedanta Farm', area: 'Delhi-Meerut Expy, near AKG College', address: 'Vedanta Farm, Ghaziabad 201015', // TODO
      mapUrl: 'https://www.google.com/maps/place/Vedanta+Farm/@28.6766587,77.4993392,17z/data=!3m1!4b1!4m6!3m5!1s0x390cf2423ce756dd:0xba4460ec3bcb99b9!8m2!3d28.6766587!4d77.4993392!16s%2Fg%2F124sxwn8v?entry=ttu&g_ep=EgoyMDI2MTAxMy4wIKXMDSoASAFQAw%3D%3D', // TODO
      dress: 'Your regal best', note: 'The baraat arrives at dusk; vows around the sacred fire.', art: 'scene-mandap', // TODO note
    },
  ],

  story: {
    enabled: true,
    eyebrow: 'A journey of two hearts',
    title: 'Our Story',
    subtitle: 'How two families became one',
    // Each item uses `asset` (a photo in src/assets/), `art` (a painting in public/art/) or `img` (a photo in public/photos/).
    // Optional `position` (CSS object-position, e.g. '50% 70%') moves the crop inside the circle;
    // optional `transform` (CSS transform) straightens/zooms a tilted photo.
    items: [ // TODO: replace the sample years, text and pictures with your own story
      { year: '2016', title: 'First met', text: 'Batchmates in the same school corridors — shared notes, lunch-break laughter and a friendship that quietly grew into something more.', asset: 'Media (5).jpg', transform: 'translateY(5%) scale(1.15)' },
      { year: '2023', title: 'Growing Up, Growing Together', text: 'Separate cities, distinct chapters, yet we stayed connected through every milestone, always sharing our lives no matter the miles.', asset: 'Media (4).jpg', position: '50% 70%', transform: 'translate(8.5%, -3%) rotate(12deg) scale(1.3)' },
      { year: '2026', title: 'Two families, one blessing', text: 'The Prasads and the Singhs met over chai and laddoos — and set a date for December.', asset: 'Media (11).jpg' },
    ],
  },

  details: {
    enabled: true,
    eyebrow: 'For our guests',
    title: 'Things to Know',
    hashtag: '#PragyaWedsNitin', // TODO or null
    hashtagNote: 'Tag your photos and stories so we never miss a moment.',
    items: [ // TODO
      { icon: 'cloud-sun', title: 'Weather', text: 'December in Ghaziabad is sunny by day and chilly after dark. Carry a shawl for the evenings.' },
      { icon: 'bed-double', title: 'Where to Stay', text: 'Rooms are held near the venues for outstation guests. Contact the family members for details.' },
      { icon: 'car', title: 'Getting There', text: 'Every event card has a Google Maps link. Valet parking is available at all venues.' },
      { icon: 'shirt', title: 'Dress Code', text: 'Indian festive. Greens for Mehendi, yellows for Haldi and your regal best for the Wedding.' },
    ],
  },

  venues: {
    enabled: true,
    eyebrow: 'Finding your way',
    title: 'The Venues',
    // Venue name (as in `events`) → photo file in src/assets/, or { file, aspect } to change the frame shape.
    photos: {
      'Abharam Retreats': 'abharam2.jpg',
      'Queens Lawn, Vedanta Farm': { file: 'queenslawn.avif', aspect: '2 / 1' },
    },
  },

  countdown: {
    title: 'The countdown begins',
    doneText: 'Just married',
  },

  music: { enabled: true, src: 'audio/song.mp3' }, // file goes in public/audio/

  footer: {
    families: 'The Prasad & Singh Families', // TODO
    line: 'With love, laughter and the blessings of our elders',
  },

  meta: {
    title: 'PragyaWedsNitin', // TODO
    description: 'You are cordially invited — 10 December 2026 · Ghaziabad.', // TODO
    siteUrl: 'https://kvnitin31.github.io/demoV/', // must end with /
    ogImage: 'og.jpg',
  },

  // Small labels used around the page. {name}-style placeholders are filled in automatically.
  ui: {
    weds: 'weds',
    dress: 'Dress',
    openMaps: 'Open in Google Maps',
    mapsSr: 'for {name} at {venue} (opens in a new tab)',
    venueMapsSr: 'for {venue} (opens in a new tab)',
    days: 'Days',
    hours: 'Hours',
    minutes: 'Minutes',
    seconds: 'Seconds',
    invitationLabel: 'Invitation',
    coupleAlt: 'Illustration of {bride} and {groom}',
    musicPlay: 'Play background music',
    musicPause: 'Pause background music',
  },
};
