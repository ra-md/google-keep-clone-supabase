import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getNotesByLabel } from "../api";
import NoteList from "../../Note/components/NoteList";
import { Tag } from "react-feather";
import Spinner from "~/components/Spinner";

export default function NotesLabel() {
  const params = useParams<{ labelName: string }>();
  const { data, isLoading, refetch } = useQuery(
    `/label/${params.labelName}`,
    () => getNotesByLabel(params.labelName),
    {
      staleTime: Infinity,
    }
  );

  useEffect(() => {
    refetch();
  }, [params.labelName]);

  if (isLoading) {
    return (
      <div className="mt-8">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      {data != null && data.length > 0 && data[0].notes.length > 0 ? (
        <NoteList notes={data[0].notes} />
      ) : (
        <div className="text-secondary flex flex-col items-center text-center h-80 justify-end">
          <Tag size={70} />
          <h1 className="mt-8">No notes with this label yet</h1>
        </div>
      )}
    </>
  );
}
