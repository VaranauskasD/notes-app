import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import fetch from 'isomorphic-unfetch'
import styled from 'styled-components'

import { Note } from '../components'

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

export const Home = ({ notes }) => {
  return (
    <React.Fragment>
      <StyledHeading>Notes</StyledHeading>
      <NotesList aria-label="Notes">
        {notes && notes.map((note, index) => <Note key={index} {...note} />)}
      </NotesList>
    </React.Fragment>
  )
}

Home.getInitialProps = async () => {
  const res = await fetch('http://localhost:3000/api/notes')
  const { data } = await res.json()
  return { notes: data }
}

export default Home
