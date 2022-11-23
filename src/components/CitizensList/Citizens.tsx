import React, { useState } from 'react'
import { useAppSelector } from '../../store/store'
import CitizenItem from '../CitizenItem'
import styled, { keyframes } from 'styled-components'
import AddCitizen from '../AddCitizen'

const Citizens = () => {
  const citizens = useAppSelector(state => state.citizens.data)
  const [modal, showModal] = useState<boolean>(false)

  const Container = styled.div`
    display: grid;
    width: 50%;
    margin: 50px auto;
    min-height: 23rem;
    grid-gap: 20px;
    border: 2px solid #1a507f;
    padding: 30px;
    border-radius: 5px;
    grid-template-columns: repeat(auto-fill, 190px);
    justify-content: center;
  `
  const Button = styled.div`
    border: 2px solid #152d68;
    border-radius: 5px;
    background-color: #c5cdd0;
    font-family: 'BM Jua', serif;
    font-size: 22px;
    color: #6e88a4;
    min-height: 190px;
    transition: all 0.2s ease-out;
    text-align: center;
    &:hover {
      transform: scale(1.05);
      cursor: pointer;
    }
  `

  return (
    <Container>
      <Button>
        <span onClick={() => showModal(!modal)}>
          {!modal ? '+ new citizen' : 'Cancel'}
        </span>
        {modal && <AddCitizen />}
      </Button>
      {citizens.map(el => {
        return (
          <CitizenItem
            age={el.age}
            city={el.city}
            name={el.name}
            id={el.id}
            someNote={el.someNote}
            key={el.id}
          />
        )
      })}
    </Container>
  )
}

export default Citizens
