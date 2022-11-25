import React, { ChangeEvent, useState } from 'react'
import { useAppSelector } from '../../store/store'
import CitizenItem from '../CitizenItem'
import styled from 'styled-components'
import AddCitizen from '../AddCitizen'
import Loader from '../common/loader'
import { Pagination } from '@mui/material'
import usePagination from '../../utils/pagination'
import { ErrorSnackbar } from '../../utils/ErrorSnackBar'

const Container = styled.div`
  display: grid;
  width: 50%;
  margin: 50px auto;
  height: 37rem;
  grid-gap: 20px;
  align-items: baseline;
  border: 2px solid #1a507f;
  background-color: #9ba9ba;
  padding: 30px;
  border-radius: 5px;
  grid-template-columns: repeat(auto-fill, 190px);
  justify-content: center;
  position: relative;

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
    &:hover {
      cursor: pointer;
    }
  }
`

const Citizens = () => {
  const citizens = useAppSelector(state => state.citizens.data)
  const status = useAppSelector(state => state.citizens.status)
  const [modal, showModal] = useState<boolean>(false)
  const [page, setPage] = useState(1)
  const PER_PAGE = 5
  const count = Math.ceil(citizens.length / PER_PAGE)
  const _DATA = usePagination(citizens, PER_PAGE)
  const handleChange = (e: ChangeEvent<unknown>, p: number) => {
    setPage(p)
    _DATA.jump(p)
  }

  if (status === 'loading') {
    return <Loader />
  }
  return (
    <div>
      <h2>Securrency test assignment</h2>
      <ErrorSnackbar />
      <Container>
        <button>
          {modal && <AddCitizen />}
          <span onClick={() => showModal(!modal)}>
            {!modal ? '+ new citizen' : 'Cancel'}
          </span>
        </button>
        {_DATA.currentData().map((el) => {
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
        <Pagination
          count={count}
          page={page}
          onChange={handleChange}
          variant="outlined"
          shape="rounded"
          style={{ position: 'absolute', bottom: '5px', left: '30px' }}
        />
      </Container>
    </div>
  )
}

export default Citizens
