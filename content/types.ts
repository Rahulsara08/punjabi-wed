export type Ceremony = 'anandKaraj' | 'phere';
export type AccentScript = 'gurmukhi' | 'devanagari' | 'none';
export type Theme = 'phulkari' | 'sarson' | 'noor';
export type Side = 'bride' | 'groom' | 'venue';

export type IconName =
  | 'diya'
  | 'bell'
  | 'mehndi-cone'
  | 'dholki'
  | 'vatna-bowl'
  | 'gagar'
  | 'bangles'
  | 'sehra'
  | 'garlands'
  | 'four-loops'
  | 'sacred-fire'
  | 'juttis'
  | 'doli'
  | 'lights';

export type VenueArtwork = 'farmhouse' | 'gurdwara' | 'ballroom' | 'home' | 'mandap';

/** A fixed decorative phrase shown small above an English heading. */
export interface Accent {
  pa: string; // Gurmukhi
  hi: string; // Devanagari
  roman: string; // transliteration
  en: string; // meaning
}

export interface Chapter {
  photo: string;
  number: string;
  title: string;
  year: string;
  place?: string;
  /** Optional description; hidden neatly when empty. */
  story?: string;
}

/** Travel & stay block: a hotel/transport name plus a message for guests. */
export interface TravelStay {
  name: string;
  message: string;
  phone?: string;
  mapQuery?: string;
  image?: { src: string; alt: string };
}

export interface FamilySide {
  grandLabel: string; // "Grand-daughter of"
  grandparents?: string;
  parentLabel: string; // "Daughter of"
  parents: string;
  line: string;
}

export interface DressCode {
  colors: string[];
  note: string;
}

export interface WeddingEvent {
  id: string;
  name: string;
  gurmukhiName: string;
  devanagariName?: string;
  icon: IconName;
  whatHappens: string;
  about?: string;
  startTime: string; // ISO with +05:30 offset
  endTime?: string;
  venueId: string;
  dressCode?: DressCode;
  private?: boolean;
  /** Only rendered when it matches wedding.ceremony. Omit for events common to both. */
  ceremony?: Ceremony;
  /** Offered as a checkbox chip in the RSVP form. */
  rsvp?: boolean;
}

export interface DayGroup {
  dateLabel: string;
  events: WeddingEvent[];
}

export interface GalleryImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface Venue {
  id: string;
  name: string;
  shortName: string;
  address: string;
  description: string;
  hours?: string;
  /** Free-text destination for the universal Google Maps URL. */
  mapQuery: string;
  insiderTip?: string;
  artwork: VenueArtwork;
  travel?: { air?: string; train?: string; road?: string };
  /** Private homes stay out of the Venue section. */
  listed?: boolean;
}

export interface Contact {
  name: string;
  relation: string;
  side: Side;
  askAbout: string;
  phone: string; // E.164, assembled client-side on tap
  whatsapp?: string;
  languages?: string[];
  hours?: string;
}

export interface SeedBlessing {
  name: string;
  place?: string;
  message: string;
}

export interface GlossaryEntry {
  rasam: string;
  when: string;
  meaning: string;
}

export interface WeddingContent {
  ceremony: Ceremony;
  accentScript: AccentScript;
  theme: Theme;
  siteName: string;
  couple: { bride: string; groom: string; initials: string };
  hashtag?: string;
  mainCeremonyDateTime: string;
  city: string;
  tagline: string;
  heroImage: { src: string; alt: string; width: number; height: number };
  invitation: {
    invocation: Record<Ceremony, { text: string; lang: 'pa' | 'hi' }>;
    blessingLine: Record<Ceremony, string>;
    dateLine: string;
  };
  families: {
    blessingLine: { pa: string; roman: string; en: string };
    bride: FamilySide;
    groom: FamilySide;
    closingLine: string;
  };
  chapters: Chapter[];
  days: DayGroup[];
  glossary: GlossaryEntry[];
  venues: Venue[];
  /** One set of photos of the couple together; each item is one photo + one caption (`alt`). */
  gallery: GalleryImage[];
  rsvp: {
    deadline?: string;
    defaultPartySize: number;
    maxPartySize: number;
    foodOptions: string[];
  };
  blessings: {
    requireApproval: boolean;
    seed: SeedBlessing[];
  };
  contacts: Contact[];
  travelStay?: TravelStay;
  hospitality?: { name: string; phone: string; note?: string };
  bestTimeToCall?: string;
  closingMessage: string;
  signOffMessage: string;
  showRivers: boolean;
  share: { title: string; description: string };
  labels: Record<
    | 'invitation'
    | 'hero'
    | 'countdown'
    | 'story'
    | 'family'
    | 'events'
    | 'gallery'
    | 'rsvp'
    | 'blessings'
    | 'venue'
    | 'contact'
    | 'closing'
    | 'loveNote',
    Accent
  >;
}
