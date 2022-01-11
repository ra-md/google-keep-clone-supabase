import { Label } from "../../Label/types";

export interface Note {
  id: string;
  note_name?: string;
  note_text?: string;
  creator_id: string;
  inserted_at: Date;
  updated_at: Date;
  labels: Label[];
}

export interface CreateNoteData {
  note_name: string;
  note_text: string;
}
