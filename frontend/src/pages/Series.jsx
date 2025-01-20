import React, { useEffect, useState } from "react";
import { agregarFavorito, getAllSeries } from "../services/apiService";
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

const agregar = async(idSerie)=>{
    await agregarFavorito(idSerie)
}

  return (
    <Layout>
        <section className="section">
            <div className="series-list">
            {series.map((serie) => (
                <div key={serie.nombre}>
                    <SerieCard serie={serie}/>
                    <button onClick={()=>agregar(serie._id)}>Agregar a Favoritos</button>
                </div>
            ))}
            </div>
        </section>   
    </Layout>
  );
};

export default Series;
