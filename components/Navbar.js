import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'

const StyledNav = styled.nav`
  width: 100%;
  background: #fff;
  padding: 4px;
`

const StyledList = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  list-style-type: none;
`

const StyledLink = styled.a`
  margin: 4px;
  padding: 4px;
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

export const Navbar = ({ children }) => {
  return (
    <StyledNav>
      <StyledList aria-label="Navigation">
        <li key={'home'}>
          <Link href="/" passHref={true}>
            <StyledLink>Home</StyledLink>
          </Link>
        </li>
        <li key={'add'}>
          <Link href="/add" passHref={true}>
            <StyledLink>Add</StyledLink>
          </Link>
        </li>
      </StyledList>
    </StyledNav>
  )
}

export default Navbar
