import React from "react";
import "./styles/paginado.css";

export default function Paginado({
  videoGamesByPage,
  AllVideoGames,
  paginado,
}) {
  const pageNumber = [];

  for (let i = 1; i < Math.ceil(AllVideoGames / videoGamesByPage); i++) {
    pageNumber.push(i);
  }
  return (
    <div>
      <nav className="paginado">
        {pageNumber?.map((e) => (
          <ul key={e}>
            <button className="botonPaginado" onClick={() => paginado(e)}>
              {e}...
            </button>
          </ul>
        ))}
      </nav>
    </div>
  );
}
