import React, { useState } from 'react'
import styled, { css, keyframes } from 'styled-components'
import { CitizenType } from '../api/workers-api'
import { useAppDispatch } from '../store/store'
import { fetchCitizenNote } from '../reducers/CitizensReducer'
import loader from '../images/loader.svg'

const CitizenItem: React.FC<CitizenType> = ({
  id,
  age,
  city,
  name,
  someNote,
  index,
}) => {
  const dispatch = useAppDispatch()
  const [note, setNote] = useState(false)

  const onShowHandler = (id: string) => {
    dispatch(fetchCitizenNote(id))
    setNote(!note)
  }

  const activeAnim = keyframes`
      from {
        height: 190px;
      }
      to {
        height: 220px;
      }`
  const notActiveAnim = keyframes`
      from {
        height: 220px;
      }
      to {
        height: 190px;
      }
  `
  const Container = styled.div`
    border: 2px solid #152d68;
    border-radius: 5px;
    background-color: #6e88a4;
    transition: all 0.2s;
    animation-duration: 0.2s;
    animation: ${() =>
      note
        ? css`
            ${activeAnim} 0.3s linear forwards
          `
        : css`
            ${notActiveAnim} 0.3s linear forwards
          `};
    animation-fill-mode: forwards;
    h4 {
      color: #c5cdd0;
    }
    span {
      display: ${note ? 'block' : 'none'};
      transition: all 0.2s;
    }
    img {
      height: 40px;
      margin: 0 auto;
      display: ${note && !someNote ? 'block' : 'none'};
    }
    button {
      border: none;
      background-color: transparent;
      font-family: 'BM Jua', serif;
      color: #152d68;
      margin-bottom: 15px;
      &:hover {
        cursor: pointer;
      }
    }
  `

  return (
    <Container>
      <p>Citizen {index}:</p>
      <p>Name: {name}</p>
      <p>Age: {age}</p>
      <p>City: {city.length > 15 ? city.slice(0, 12) + '...' : city}</p>
      <span>{someNote && `${name}'s note: ${someNote}`}</span>
      <img src={loader} alt="loader" />
      <button onClick={() => onShowHandler(id)}>
        {note ? 'Hide' : 'See more'}
      </button>
    </Container>
  )
}

export default CitizenItem
