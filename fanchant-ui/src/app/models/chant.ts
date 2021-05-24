interface Chant {
  id?: number;
  title: string;
  content: string;
  timelapse: number;
}

interface ChantEvent {
  id?: number;
  chant: Chant;
  scheduled_for: string;
  state: string;
}
