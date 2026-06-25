import React, { useReducer, useState } from 'react'

//Definimos accciones para reducer
const ACTIONS = {
  ADD_TASK: 'AGREGAR TAREA',
  TOGGLE_TASK: 'CAMBIAR ESTADO',
}

//Reducer para manejar los cambios en las tareas
function taskReducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD_TASK:
      return [...state, action.payload]
    case ACTIONS.TOGGLE_TASK:
      return state.map(task => task.id === action.payload.id
        ? { ...task, completed: !task.completed }
        : task)
    default:
      return state
  }
}


function GestorTareas() {
  //useReducer para manejo de las tareas
  const [tasks, dispatch] = useReducer(taskReducer, [])

  //useState para manejo de los formularios y filtros
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('baja');
  const [date, setDate] = useState('');
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('fecha');

  //Agregar Tarea
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !date) return;

    const newTask = {
      id: Date.now(),
      title,
      priority,
      date,
      completed: false,
    };

    dispatch({ type: ACTIONS.ADD_TASK, payload: newTask })

    //limpiamos formualrio
    setTitle('');
    setPriority('baja');
    setDate('');
  };

  //Filtrar tareas
  const filterTask = tasks.filter(task => {
    if (filter === 'all') return true;
    return task.priority === filter;
  });

  //Ordenar tareas
  const sortedTasks = [...filterTask].sort((a, b) => {
    if (sortBy === 'fecha') {
      return a.date.localeCompare(b.date);
    }
    if (sortBy === 'prioridad') {
      const priorityWeights = { alta: 3, media: 2, baja: 1 };
      return priorityWeights[b.priority] - priorityWeights[a.priority];
    }
    return 0; // 'none'
  });

  //Contadores
  const totalTasks = sortedTasks.length;
  const completedTasks = sortedTasks.filter(task => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;



  return (

    <div>
      <h2>Gestor de Tareas</h2>

      {/* Contadores */}
      <p><strong>{pendingTasks} pendientes · {completedTasks} completadas</strong></p>

      {/* Formulario */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="alta">Alta</option>
          <option value="media">Media</option>
          <option value="baja">Baja</option>
        </select>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <button type="submit">Añadir</button>
      </form>

      {/* Filtros */}
      <div>
        {['all', 'alta', 'media', 'baja'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{ fontWeight: filter === f ? 'bold' : 'normal' }}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Ordenamiento */}
      <div>
        <label htmlFor="sort-select"><strong>Ordenar por: </strong></label>
        <select
          id="sort-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="fecha">Fecha límite (más próxima primero)</option>
          <option value="prioridad">Prioridad (Alta primero)</option>
          <option value="none">Sin ordenar (Orden de creación)</option>
        </select>
      </div>

      {/* Lista de tareas */}
      <ul>
        {sortedTasks.map(task => (
          <li
            key={task.id}
          >
            <div>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => dispatch({ type: ACTIONS.TOGGLE_TASK, payload: { id: task.id } })}
              />
              <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                <strong>{task.title}</strong> - {task.priority.toUpperCase()}
              </span>
            </div>
            <p>{task.date}</p>
          </li>
        ))}
      </ul>
      {tasks.length === 0 && <p>No hay tareas para mostrar.</p>}
    </div>
  )
}

export default GestorTareas