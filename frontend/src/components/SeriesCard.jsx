
export const SerieCard = (props) => {
    const {serie} =  props
    
  return (
    <div key={serie._id} className="serie-card">
      <img src={serie.urlImagen} alt={serie.nombre} className="serie-image" />
      <h3>{serie.nombre}</h3>
      <p>Capítulos: {serie.cantCapitulos}</p>
    </div>
  );
}