import React, { useEffect, useState } from "react";
import { getAllSeries, getFavoritos } from "../services/apiService";
import { SerieCard } from '../components/SeriesCard'
import Layout from "../components/Layout";

const Favoritos = ({ onSelectFavorite }) => {
  const [series, setSeries] = useState([]);

  useEffect(() => {
      inicializarSeries()
  }, [series]);

const inicializarSeries = async() =>{
    const series = await getFavoritos()
    setSeries(series)
}

  return (
    <Layout>
      <section className="section">
        <div className="series-list">
        {series.length >0 ?(
          series.map((serie) => (
              <div key={serie.nombre}>
                  <SerieCard serie={serie}/>
              </div>
        ))): <p>Sin Favoritos</p>}
        </div>
      </section>
    </Layout>
  );
};

export default Favoritos;
