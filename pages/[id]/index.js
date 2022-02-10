import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import fetch from 'isomorphic-unfetch'
import styled from 'styled-components'

const StyledHeading = styled.h1`
  margin: 0;
  font-size: 24px;
`

const NotesList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin: 4px 0;
  padding: 0;
  list-style-type: none;
`

const StyledLoader = styled.div`
  margin: 24px 0;
  border: 4px solid #f3f3f3;
  border-radius: 50%;
  border-top: 4px solid #000;
  width: 24px;
  height: 24px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;

  /* Safari */
  @-webkit-keyframes spin {
    0% {
      -webkit-transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

const StyledDescription = styled.p``

const StyledButton = styled.button`
  margin: 4px 0;
  padding: 4px;
  border: none;
  border-radius: 4px;
  outline: 1.5px solid transparent;
  transition: 0.08s all ease-in;
  background: #ffabab;

  :focus,
  :hover {
    outline: 1.5px solid gray;
    outline-offset: -1.5px;
  }
`

export const Note = ({ note }) => {
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (isDeleting) {
      deleteNote()
    }
  }, [isDeleting])

  const deleteNote = async () => {
    const noteId = router.query.id

    try {
      const deleted = await fetch(`http://localhost:3000/api/notes/${noteId}`, {
        method: 'Delete',
      })
      router.push('/')
    } catch (error) {
      console.error(error)
    }
  }

  const handleDelete = async () => {
    setIsDeleting(true)
  }

  return (
    <React.Fragment>
      <StyledHeading>{note && note.title}</StyledHeading>
      {isDeleting ? (
        <StyledLoader />
      ) : (
        <React.Fragment>
          <StyledDescription>{note && note.description}</StyledDescription>
          <StyledButton
            aria-label={`Delete ${note && note.title}`}
            onClick={handleDelete}
          >
            Delete
          </StyledButton>
        </React.Fragment>
      )}
    </React.Fragment>
  )
}

Note.getInitialProps = async ({ query: { id } }) => {
  const res = await fetch(`http://localhost:3000/api/notes/${id}`)
  const { data } = await res.json()

  return { note: data }
}

export default Note
