import React, { useEffect, useState } from 'react';
import './style.css';

const CityOptions = ({cities}) => {
  return (
    cities.map((city) => <option key={city.code} value={city.code}>{city.name}</option>) 
  )
};

const DatesOptions = ({dates}) => {
  return (
    dates.map((date) => <option key={date.dateBasic} value={date.dateBasic}>{date.dateCs}</option>)
  )
};

export const JourneyPicker = ({ onJourneyChange }) => {
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [date, setDate] = useState('');
  const [cities, setCities] = useState([]);
  const [dates, setDates] = useState([]);

  useEffect(() => {
    console.log('nastaveno')
    const fetchCities = async () => {
      const response = await fetch('https://apps.kodim.cz/daweb/leviexpress/api/cities')
      if (!response.ok) {
        alert('Něco se pokazilo')
      }
      const data = await response.json()
      console.log(data)
      setCities(data.results)
    };
    fetchCities();

    const fetchDates = async () => {
      const resp = await fetch ('https://apps.kodim.cz/daweb/leviexpress/api/dates')
      if (!resp.ok) {
        alert('Něco se pokazilo. Nenačetla se data cest.')
      }
      const data = await resp.json()
      console.log(data)
      setDates(data.results)
    }
    fetchDates();
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('Odesílám formulář s cestou')
    console.log(fromCity, toCity, date)
  };
  
  return (
    <div className="journey-picker container">
      <h2 className="journey-picker__head">Kam chcete jet?</h2>
      <div className="journey-picker__body">
        <form onSubmit={handleSubmit} className="journey-picker__form">
          <label>
            <div className="journey-picker__label">Odkud:</div>
            <select value={fromCity} onChange={(e) => setFromCity(e.target.value)}>
              <option value="">Vyberte</option>
              <CityOptions cities={cities} />
            </select>
          </label>
          <label>
            <div className="journey-picker__label">Kam:</div>
            <select value={toCity} onChange={(e) => setToCity(e.target.value)}>
              <option value="">Vyberte</option>
              <CityOptions cities={cities} />
            </select>
          </label>
          <label>
            <div className="journey-picker__label">Datum:</div>
            <select value={date} onChange={(e) => setDate(e.target.value)}>
              <option value="">Vyberte</option>
              <DatesOptions dates={dates} />
            </select>
          </label>
          <div className="journey-picker__controls">
            <button 
              className="btn" 
              type="submit"
            > 
              Vyhledat spoj
            </button>
          </div>
        </form>
        <img className="journey-picker__map" src="/map.svg" />
      </div>
    </div>
  );
}
