import React, { useState, useEffect } from "react";
import { Check, Edit2, X, Tag, Trash2 } from "react-feather";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useLocation } from "react-router-dom";
import { Dialog } from "@headlessui/react";
import { toast } from "react-toastify";
import Modal from "~/components/Modal";
import Input from "~/components/Input";
import Button from "~/components/Button";
import Spinner from "~/components/Spinner";
import { getLabels, createLabel, updateLabel, deleteLabel } from "../api";
import { Label } from "../types";

const iconSize = 18;

interface EditLabelProps {
  visible: boolean;
  toggle: () => void;
}

export default function EditLabel({ visible, toggle }: EditLabelProps) {
  const { data, isLoading } = useQuery("labels", getLabels, {
    staleTime: Infinity,
  });
  const [labelName, setLabelName] = useState("");
  const queryClient = useQueryClient();
  const labelMutation = useMutation(() => createLabel(labelName), {
    onSuccess() {
      queryClient.invalidateQueries("labels");
    },
  });

  function handleCreateNote() {
    if (labelName !== "") {
      labelMutation.mutate();
      setLabelName("");
    }
  }

  return (
    <Modal visible={visible} toggle={toggle}>
      {isLoading && <Spinner />}
      {data != null && (
        <div className="max-h-lg overflow-y-auto">
          <div className="p-3">
            <Dialog.Title className="font-semibold">Edit labels</Dialog.Title>
            <div className="flex items-center">
              <Button
                icon={<X size={iconSize} />}
                onClick={() => setLabelName("")}
                aria-label="clear edit label input"
              />
              <Input
                placeholder="Create new label"
                className="border-b border-secondary py-1 mx-3"
                value={labelName}
                onChange={(event) => setLabelName(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handleCreateNote();
                  }
                }}
              />
              <Button
                icon={<Check size={iconSize} />}
                isLoading={labelMutation.isLoading}
                onClick={handleCreateNote}
                aria-label="save label"
              />
            </div>
            <EditLabelList labels={data} />
          </div>
          <div className="rounded-b-lg sticky bg-primary bottom-0 left-0 right-0 flex justify-end">
            <Button aria-label="close" onClick={toggle}>
              Close
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
}

function EditLabelList(props: { labels: Label[] }) {
  return (
    <ul>
      {props.labels.map((label) => (
        <EditLabelItem key={label.id} label={label} />
      ))}
    </ul>
  );
}

function EditLabelItem(props: { label: Label }) {
  const [openDeleteBtn, setopenDeleteBtn] = useState(false);
  const [openUpdateInput, setOpenUpdateInput] = useState(false);
  const [labelName, setLabelName] = useState("");
  const queryClient = useQueryClient();
  const { pathname } = useLocation();

  const onSuccess = () => {
    queryClient.invalidateQueries({
      predicate: (query) =>
        query.queryKey === "labels" ||
        query.queryKey === "notes" ||
        query.queryKey === pathname,
    });
  };

  const updateLabelMutation = useMutation(
    () => updateLabel({ labelName, id: props.label.id }),
    { onSuccess }
  );

  const deleteLabelMutation = useMutation(() => deleteLabel(props.label.id), {
    onSuccess,
  });

  function handleUpdateNote() {
    if (labelName !== props.label.label_name) {
      updateLabelMutation.mutate();
    }
    setOpenUpdateInput(false);
  }

  useEffect(() => {
    setLabelName(props.label.label_name);
  }, [props.label.label_name]);

  return (
    <li
      className="flex items-center justify-between my-3"
      onMouseEnter={() => setopenDeleteBtn(true)}
      onMouseLeave={() => setopenDeleteBtn(false)}
    >
      {openDeleteBtn ? (
        <Button
          icon={<Trash2 size={iconSize} />}
          onClick={() => {
            deleteLabelMutation.mutate();
          }}
          isLoading={deleteLabelMutation.isLoading}
          aria-label="delete label"
        />
      ) : (
        <Button
          icon={<Tag size={iconSize} />}
          isLoading={deleteLabelMutation.isLoading}
          aria-label="delete label"
        />
      )}
      {openUpdateInput ? (
        <Input
          className="border-b border-secondary py-1 mx-3"
          value={labelName}
          onChange={(event) => setLabelName(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleUpdateNote();
            }
          }}
        />
      ) : (
        <span>{props.label.label_name}</span>
      )}
      {openUpdateInput ? (
        <Button
          icon={<Check size={iconSize} />}
          onClick={handleUpdateNote}
          aria-label="save label"
        />
      ) : (
        <Button
          icon={<Edit2 size={iconSize} />}
          onClick={() => setOpenUpdateInput(true)}
          isLoading={updateLabelMutation.isLoading}
          aria-label="edit label"
        />
      )}
    </li>
  );
}
