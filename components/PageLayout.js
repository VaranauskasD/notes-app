import React from 'react'
import Head from 'next/head'
import Navbar from './Navbar'
import styled from 'styled-components'

const PageContainer = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
  background: #f2f2f2;
  align-items: center;
`

const StyledHeader = styled.header`
  width: 100%;
`

const ContentContainer = styled.main`
  width: 80%;
  margin: 16px;
  padding: 16px;
  border-radius: 8px;
  background: #fff;

  ul li:first-child {
    margin-left: 0px;
  }
`

export const PageLayout = ({ children }) => {
  return (
    <React.Fragment>
      <Head>
        <title>Note App</title>
        <meta name="description" content="Created for learning purposes" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageContainer>
        <StyledHeader>
          <Navbar />
        </StyledHeader>
        <ContentContainer>{children}</ContentContainer>
      </PageContainer>
    </React.Fragment>
  )
}

export default PageLayout
