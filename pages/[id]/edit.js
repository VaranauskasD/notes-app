import React, { createContext, useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import fetch from 'isomorphic-unfetch'
import styled from 'styled-components'

const ContentContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledHeading = styled.h1`
  margin: 0;
  font-size: 24px;
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

const StyledForm = styled.form`
  flex: 1;
  display: flex;
  flex-direction: column;
`

const StyledLabel = styled.label`
  font-size: 12px;
`

const StyledInput = styled.input`
  font-size: 10px;
  margin: 4px 0;
  padding: 4px;
  outline: 1.5px solid transparent;
  transition: 0.02s all ease;

  :focus,
  :hover {
    outline: 1.5px solid gray;
    outline-offset: -1.5px;
  }
`

const StyledTextArea = styled.textarea`
  margin: 4px 0;
  resize: vertical;
  font-size: 10px;
  padding: 4px;
  outline: 1.5px solid transparent;
  transition: 0.02s all ease;

  :focus,
  :hover {
    outline: 1.5px solid gray;
    outline-offset: -1.5px;
    border-radius: 4px;
  }
`

const StyledError = styled.span`
  color: #ff4242;
`

const StyledButton = styled.button`
  margin: 4px 0;
  padding: 4px;
  border: none;
  border-radius: 4px;
  outline: 1.5px solid transparent;
  transition: 0.08s all ease-in;
  background: #beecff;

  :focus,
  :hover {
    outline: 1.5px solid gray;
    outline-offset: -1.5px;
  }
`

export const Edit = ({ note }) => {
  const [form, setForm] = useState({ title: '', description: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState({})
  const router = useRouter()

  useEffect(() => {
    if (isSubmitting) {
      if (Object.keys(errors).length === 0) {
        updateNote()
      } else {
        setIsSubmitting(false)
      }
    }
  }, [errors])

  const updateNote = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/notes/${router.query.id}`,
        {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(form),
        }
      )
      router.push('/')
    } catch (error) {
      console.error(error)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let errors = validate()
    setErrors(errors)
    setIsSubmitting(true)
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const validate = () => {
    const err = {}

    if (!form.title) {
      err.title = 'Title is required'
    }

    if (!form.description) {
      err.description = 'Description is required'
    }
    return err
  }

  return (
    <React.Fragment>
      <StyledHeading>Edit Note</StyledHeading>
      <ContentContainer>
        {isSubmitting ? (
          <StyledLoader />
        ) : (
          <StyledForm onSubmit={handleSubmit}>
            <StyledLabel htmlFor="note-input">
              Title
              <StyledError>
                {errors.title ? ` - ${errors.title}` : ''}
              </StyledError>
            </StyledLabel>
            <StyledInput
              id="note-input"
              onChange={handleChange}
              name="title"
              placeholder={note && note.title}
            />
            <StyledLabel htmlFor="note-description">
              Description
              <StyledError>
                {errors.description ? ` - ${errors.description}` : ''}
              </StyledError>
            </StyledLabel>
            <StyledTextArea
              id="note-description"
              name="description"
              onChange={handleChange}
              placeholder={note && note.description}
            />
            <StyledButton
              type="submit"
              aria-label={`update ${note && note.title}`}
            >
              Update
            </StyledButton>
          </StyledForm>
        )}
      </ContentContainer>
    </React.Fragment>
  )
}

Edit.getInitialProps = async ({ query: { id } }) => {
  const res = await fetch(`http://localhost:3000/api/notes/${id}`)
  const { data } = await res.json()
  return { note: data }
}

export default Edit
