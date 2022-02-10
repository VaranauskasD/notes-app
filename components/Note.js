import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'

const StyledNote = styled.li`
  flex: 0.3;
  background: #beecff;
  margin: 4px;
  padding: 8px;
  border-radius: 4px;
  outline: 1.5px solid transparent;
  transition: 0.08s all ease-in;

  :focus,
  :hover {
    outline: 1.5px solid gray;
    outline-offset: -1.5px;
    border-radius: 4px;
    border: none;
  }
`

const NoteTitle = styled.h2`
  font-size: 14px;
  margin-bottom: 0px;
`

const NoteDescription = styled.span`
  font-size: 10px;
`

const NoteControls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const StyledLink = styled.a`
  margin: 0 4px;
  padding: 4px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  outline: 1.5px solid transparent;
  transition: 0.08s all ease-in;
  background: ${(props) => (props.background ? props.background : '#fff')};

  :first-of-type {
    margin-left: 0px;
  }

  :focus,
  :hover {
    outline: 1.5px solid gray;
    outline-offset: -1.5px;
  }
`

const StyledButton = styled.button`
  margin: 0 4px;
  padding: 7px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  outline: 1.5px solid transparent;
  transition: 0.08s all ease-in;
  background: ${(props) => (props.background ? props.background : '#fff')};

  :focus,
  :hover {
    outline: 1.5px solid gray;
    outline-offset: -1.5px;
  }
`

export const Note = ({ _id, title, description }) => {
  return (
    <StyledNote tabIndex={0}>
      <NoteTitle>{title}</NoteTitle>
      <NoteDescription>{description}</NoteDescription>
      <NoteControls>
        <Link href={`/${_id}`} passHref={true}>
          <StyledLink background={'#BFFF9D'} aria-label={`View ${title}`}>
            View
          </StyledLink>
        </Link>
        <Link href={`/${_id}/edit`} passHref={true}>
          <StyledLink background={'#FFF296'} aria-label={`Edit ${title}`}>
            Edit
          </StyledLink>
        </Link>
      </NoteControls>
    </StyledNote>
  )
}

export default Note
