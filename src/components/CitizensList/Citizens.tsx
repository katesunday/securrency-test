import React, { useState } from 'react'
import { useAppSelector } from '../../store/store'
import CitizenItem from '../CitizenItem'
import styled from 'styled-components'
import AddCitizen from '../AddCitizen'
import Loader from '../common/loader'

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
  input {
    border: 2px solid #152d68;
    border-radius: 8px;
  }
  label {
    font-size: 16px;
  }
  button {
    font-size: 21px;
    border: none;
    background-color: transparent;
    font-family: 'BM Jua', serif;
    text-decoration: underline;
    color: #152d68;
  }
`
const Button = styled.div`
  border: 2px solid #152d68;
  border-radius: 5px;
  background-color: #c5cdd0;
  font-family: 'BM Jua', serif;
  font-size: 18px;
  color: #6e88a4;
  min-height: 190px;
  transition: all 0.2s ease-out;
  text-align: center;
  &:hover {
    transform: scale(1.05);
    cursor: pointer;
  }
`
const Citizens = () => {
  const citizens = useAppSelector(state => state.citizens.data)
  const [modal, showModal] = useState<boolean>(false)

  if (!citizens.length) {
    return <Loader />
  }
  return (
    <Container>
      <Button>
        {modal && <AddCitizen />}
        <span onClick={() => showModal(!modal)}>
          {!modal ? '+ new citizen' : 'Cancel'}
        </span>
      </Button>
      {citizens.map((el, index) => {
        return (
          <CitizenItem
            age={el.age}
            city={el.city}
            name={el.name}
            id={el.id}
            index={index + 1}
            someNote={el.someNote}
            key={el.id}
          />
        )
      })}
    </Container>
  )
}

export default Citizens
