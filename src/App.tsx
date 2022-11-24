import React, { useEffect } from 'react'
import './App.css'
import Citizens from './components/CitizensList/Citizens'
import { Route, Routes } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import { useAppDispatch } from './store/store'
import { fetchCitizens } from './reducers/CitizensReducer'
import { workersAPI } from './api/workers-api'

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchCitizens())

    //just to show that connection with workers is working
    workersAPI.getTest()
  }, [dispatch])
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Citizens />} />
        <Route path="/citizens" element={<Citizens />} />
        <Route path="/404" element={<h1>404: PAGE NOT FOUND</h1>} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </div>
  )
}

export default App

