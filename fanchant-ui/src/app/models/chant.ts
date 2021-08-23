
interface ChantEvent {
  id?: number;
  chant: Chant;
  state: string;
  scheduled_for: number;
  next_line: number;
  center_line?: number;
}

interface Chant {
  id?: number;
  title: string;
  content: string;
  parsed_content: ChantLine[];
  timelapse: number;
  isSelected?: boolean; // Client Only
}

interface ChantLine {
  time: number;
  words: ChantWord[];
}

interface ChantWord {
  timestamp: number;
  text: string;
  active?: boolean; // Client Only. Whether to highlight the word.
}
