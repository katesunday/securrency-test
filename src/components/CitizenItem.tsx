import React, { useState } from 'react'
import { CitizenType } from '../api/workers-api'
import { useAppDispatch } from '../store/store'
import { fetchCitizenNote } from '../reducers/CitizensReducer'
import loader from '../images/loader.svg'
import { Button, Card, CardActions, CardContent } from '@mui/material'

const CitizenItem: React.FC<CitizenType> = ({
  id,
  age,
  city,
  name,
  someNote,
}) => {
  const dispatch = useAppDispatch()
  const [note, setNote] = useState(false)

  const onShowHandler = (id: string) => {
    dispatch(fetchCitizenNote(id))
    setNote(!note)
  }

  return (
    <Card sx={{ minWidth: 200, minHeight: 200 }}>
      <CardContent sx={{ maxHeight: 230 }}>
        <p>Citizen's id: {id}:</p>
        <p>Name: {name}</p>
        <p>Age: {age}</p>
        <p>City: {city.length > 15 ? city.slice(0, 12) + '...' : city}</p>
        <span>{someNote && `${name}'s note: ${someNote}`}</span>
        {note && !someNote && (
          <img src={loader} alt="loader" style={{ height: '50px' }} />
        )}
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => onShowHandler(id)}>
          {note ? 'Hide' : 'See more'}
        </Button>
      </CardActions>
    </Card>
  )
}

export default CitizenItem
