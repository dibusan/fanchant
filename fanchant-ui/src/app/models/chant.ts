interface Chant {
  id?: number;
  title: string;
  content: string;
}

interface ChantEvent {
  id?: number;
  chant: Chant,
  scheduled_for: string
}
