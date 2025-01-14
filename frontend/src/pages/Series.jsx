import React, { useEffect, useState } from "react";
import { getAllSeries } from "../services/apiService";
import { SerieCard } from '../components/SeriesCard'
import Layout from "../components/Layout"

const Series = ({ onSelectFavorite }) => {
  const [series, setSeries] = useState([]);

  useEffect(() => {
      inicializarSeries()
  }, []);

const inicializarSeries = async() =>{
    const series = await getAllSeries()
    setSeries(series)
}

  return (
    <Layout>
        <section className="section">
            <div className="series-list">
            {series.map((serie) => (
                <div key={serie.nombre}>
                    <SerieCard serie={serie}/>
                    <button>Agregar a Favoritos</button>
                </div>
            ))}
            </div>
        </section>   
    </Layout>
  );
};

export default Series;
