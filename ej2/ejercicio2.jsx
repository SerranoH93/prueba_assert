// ejercicio2.jsx  <-- encuentra y corrige los 5 bugs
import { useState, useEffect } from 'react';

function ProyectosList({ usuarioId }) {
  const [proyectos, setProyectos] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [nuevaTarea, setNuevaTarea] = useState('');

  useEffect(() => {
    setCargando(true);
    fetchProyectos(usuarioId).then(data => {
      setProyectos(data);
      setCargando(false);
    });
    //El useEffect depende de  usuaerioId, si el usuario cambia los proyectos no cargarian
  }, [usuarioId]);                               // <-- Bug 1

  const agregarTarea = (proyectoIndex) => {
    // Se necesita clonar la lista de proyectos para que sea una referencia nueva del array,
    // si no react lo toma como si no tuviera cambios
    const nuevosProyectos = structuredClone(proyectos);
    nuevosProyectos[proyectoIndex].tareas.push(nuevaTarea);
    setProyectos(nuevosProyectos);            // <-- Bug 2
    setNuevaTarea('');
  };

  const contarTareasTotales = () => {
    let total = 0;
    for (let proyecto of proyectos) {
      // Al volver a declar total no realizaba la suma, se debe usar la variable externa
      total += proyecto.tareas.length; // <-- Bug 3
    }
    return total;
  };

  if (cargando) return <p>Cargando proyectos...</p>;

  return (
    <div>
      {/* Para llamar la función debe levar parentesis */}
      <h2>Total: {contarTareasTotales()}</h2>   {/* Bug 4 */}

      {/* Para usar map, se debe tener una key unica para cada elemento*/}
      {proyectos.map(proyecto => (
        <div
          key={proyecto.id ?? proyectoIndex}
          className='proyecto'>             {/* Bug 5 */}
          <h3>{proyecto.nombre}</h3>
          <ul>
            {proyecto.tareas.map((tarea, i) => (
              <li key={i}>{tarea}</li>
            ))}
          </ul>
          <input
            value={nuevaTarea}
            onChange={e => setNuevaTarea(e.target.value)}
            placeholder='Nueva tarea...'
          />
          <button onClick={() => agregarTarea(proyectoIndex)}>
            Agregar
          </button>
        </div>
      ))}
    </div>
  );
}