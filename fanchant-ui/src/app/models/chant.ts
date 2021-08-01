interface Chant {
  id?: number;
  title: string;
  content: string;
  timelapse: number;
  isSelected?: boolean; // Client Only
}

interface ChantEvent {
  id?: number;
  chant: Chant;
  state: string;
  scheduled_for?: string;
}
