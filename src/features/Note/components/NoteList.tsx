import React from "react";
import Masonry from "react-masonry-component";
import NoteItem from "./NoteItem";
import { Note } from "../types";

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  if (notes.length === 0) {
    return <h1 className="text-center mt-8">Notes you add appear here</h1>;
  }

  return (
    <Masonry
      className={"note-list"}
      elementType={"ul"}
      options={{
        columnWidth: 60,
        gutter: 5,
        fitWidth: true,
      }}
    >
      {notes.map((note: Note) => {
        return <NoteItem key={note.id} {...note} />;
      })}
    </Masonry>
  );
}
