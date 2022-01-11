import React, { useState, useEffect, Fragment } from "react";
import TextareaAutoSize from "react-textarea-autosize";
import { useMutation, useQueryClient } from "react-query";
import { Dialog } from "@headlessui/react";
import Input from "~/components/Input";
import Modal from "~/components/Modal";
import Button from "~/components/Button";
import { updateNote } from "../api";
import NoteLabels from "./NoteLabels";
import { Label } from "../../Label/types";

interface UpdateNoteProps {
  visible: boolean;
  toggle: () => void;
  title: string;
  note: string;
  id: string;
  labels: Label[];
}

export default function UpdateNote(props: UpdateNoteProps) {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const updateMutation = useMutation(
    () =>
      updateNote({
        noteData: {
          note_name: title,
          note_text: note,
        },
        id: props.id,
      }),
    {
      onSuccess() {
        queryClient.invalidateQueries("notes");
      },
    }
  );

  useEffect(() => {
    setTitle(props.title);
    setNote(props.note);
  }, [props.title, props.note]);

  function handleUpdate() {
    props.toggle();
    if (title !== props.title || note !== props.note) {
      updateMutation.mutate();
    }
  }

  return (
    <Modal visible={props.visible} toggle={props.toggle}>
      <Input
        onChange={(event) => setTitle(event.target.value)}
        value={title}
        placeholder="Title"
      />
      <TextareaAutoSize
        onChange={(event) => setNote(event.target.value)}
        value={note}
        className="textarea max-h-96"
        placeholder="Take a note..."
      />

      <div className="flex items-center mt-2">
        <NoteLabels noteLabels={props.labels} noteId={props.id} full={true} />
        <Button
          className="ml-auto"
          size="small"
          aria-label="close update note dialog"
          onClick={handleUpdate}
        >
          Close
        </Button>
      </div>
    </Modal>
  );
}
