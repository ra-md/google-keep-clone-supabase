import React, { useState, useEffect } from 'react'
import Modal from '~/components/Modal'
import Input from '~/components/Input'
import Button from '~/components/Button'
import Spinner from '~/components/Spinner'
import { Check, Edit2, X, Tag, Trash2 } from 'react-feather'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getLabels, createLabel, updateLabel, deleteLabel } from '../api'
import { Label } from '../types'
import { toast } from 'react-toastify'

const iconSize = 18

interface EditLabelProps {
  visible: boolean
  toggle: () => void
}

export default function EditLabel({ visible, toggle }: EditLabelProps) {
  const {data, isLoading} = useQuery('labels', getLabels, {
    staleTime: Infinity
  })
  const [labelName, setLabelName] = useState('')
  const queryClient = useQueryClient()
  const labelMutation = useMutation(() => createLabel(labelName), {
    onSuccess() {
      queryClient.invalidateQueries('labels')
    }
  })

  function handleCreateNote() {
    if(labelName !== '') {
      labelMutation.mutate()
      setLabelName('')
    }
  }

  return (
    <Modal visible={visible} toggle={toggle} width='w-96'>
      {isLoading && <Spinner/> }
      { data != null && <div className='max-h-lg overflow-y-auto'>
          <div className='p-3'>
            <span className='font-semibold'>Edit labels</span>
            <div className='flex items-center'>
              <Button icon={true} onClick={() => setLabelName('')}>
                <X size={iconSize} />
              </Button>
              <Input
                placeholder='Create new label'
                className='border-b border-secondary py-1 mx-3'
                value={labelName}
                onChange={(event) => setLabelName(event.target.value)}
                onKeyDown={(event) => {
                  if(event.key === 'Enter') {
                    handleCreateNote()
                  }
                }}
              />
              <Button icon={true} isLoading={labelMutation.isLoading} onClick={handleCreateNote}>
                <Check size={iconSize} />
              </Button>
            </div>
            <EditLabelList labels={data} />
          </div>
          <div
            className='border-t border-secondary rounded-b-lg sticky bg-primary bottom-0 left-0 right-0 flex justify-end p-3'
            onClick={toggle}
          >
            <Button>Close</Button>
          </div>
        </div>
      }
    </Modal>
  )
}

function EditLabelList(props: { labels: Label[] }) {
  return (
    <ul>
      {
        props.labels.map((label) => <EditLabelItem key={label.id} label={label} />)
      }
    </ul>
  )
}

function EditLabelItem(props: { label: Label }) {
  const [openDeleteBtn, setopenDeleteBtn] = useState(false)
  const [openUpdateInput, setOpenUpdateInput] = useState(false)
  const [labelName, setLabelName] = useState('')
  const queryClient = useQueryClient()
  const updateLabelMutation = useMutation(() => updateLabel({labelName, id: props.label.id}), {
    onSuccess() {
      queryClient.invalidateQueries('labels')
    }
  })
  const deleteLabelMutation = useMutation(() => deleteLabel(props.label.id), {
    onSuccess() {
      queryClient.invalidateQueries('labels')
      toast.dark('Label deleted')
    }
  })

  function handleUpdateNote() {
    if(labelName !== props.label.label_name) {
      updateLabelMutation.mutate()
    }
    setOpenUpdateInput(false)
  }

  useEffect(() => {
    setLabelName(props.label.label_name)
  }, [props.label.label_name])

  return (
    <li
      className='flex items-center justify-between my-3'
      onMouseEnter={() => setopenDeleteBtn(true)}
      onMouseLeave={() => setopenDeleteBtn(false)}
    >
      {
        openDeleteBtn
          ? <Button
              icon={true}
              onClick={() => {
                deleteLabelMutation.mutate()
              }}
              isLoading={deleteLabelMutation.isLoading}
            >
              <Trash2 size={iconSize} />
            </Button>
          : <Button
              icon={true}
              isLoading={deleteLabelMutation.isLoading}
            >
              <Tag size={iconSize} />
            </Button>
      }
      {
        openUpdateInput
          ? <Input
              className='border-b border-secondary py-1 mx-3'
              value={labelName}
              onChange={(event) => setLabelName(event.target.value)}
              onKeyDown={(event) => {
                if(event.key === 'Enter') {
                  handleUpdateNote()
                }
              }}
            />
          : <span>{props.label.label_name}</span>
      }
      {
        openUpdateInput
          ? <Button
              icon={true}
              onClick={handleUpdateNote}
            >
              <Check size={iconSize} />
            </Button>
          : <Button
              icon={true}
              onClick={() => setOpenUpdateInput(true)}
              isLoading={updateLabelMutation.isLoading}
            >
            <Edit2 size={iconSize} />
          </Button>
      }
    </li>
  )
}
