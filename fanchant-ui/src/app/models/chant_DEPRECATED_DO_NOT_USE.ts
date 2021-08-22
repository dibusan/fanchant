interface Chant_DEPRECATED_DO_NOT_USE {
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
  next_line: number;
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
  time: string;
  words: ChantWord[];
}

interface ChantWord {
  timestamp: number;
  text: string;
  active?: boolean; // Client Only. Whether to highlight the word.
}
