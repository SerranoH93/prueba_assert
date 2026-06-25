# Reflexión


## En el Ejercicio 3, ¿por qué elegiste estructurar el estado de esa forma en tu useReducer? ¿Qué ventaja tiene frente a tener varios useState?

Use useReducer ya que todo gira al rededor de las tareas, al mantener la logica centralizada en el reducer, el componente es más facil de escalar. Al usuar varios useState podria generar incosistencias entre los estados que se relacionan, por ejemplo que por error se actualice un estado pero se olvide de actualizar otro. Otra ventaja es que separamos la logica de negocio de la vista, permitiendo que los dos sean más reutilizables y testables.

## ¿Qué pasaría si un usuario tiene mala conexión y el fetchProyectos del Ejercicio 2 tarda 10 segundos? ¿Cómo lo mejorarías?

Para mejorar la experiencia del usuario podria implementar un isloading para que el usuario pueda ver que la aplicacion esta cargando los datos. También podria implementar un timeout para que el usuario pueda ver que la aplicacion no esta respondiendo. Por ultimo implementar el try catch para manejar los errores y que el usuario vea un mensaje de error.

## En el Ejercicio 1, ¿cómo cambiaría tu solución si hubiera 1 millón de registros en lugar de 9? ¿Qué considerarías?

Creo en este caso se puede resolver tando de front como por el back:

### Front
* El objetivo sería optimizar el rendimiento y evitar recorrer la menor canitidad de veces los datos, como realice actualmente el ejercicios recorro una vez para cargar los datos.
* Evitaria operaciones costosas como busquedas repetidas.
* Procesar la información por "chunks" para evitar saturar la memoria, por ejemplo, hacer el procesamiento de mil en mil.

### Back
* Desde base de datos se podria hacer el group by y desde ahi mandar las estadisticas al front y asi que el front sea "tonto" y solo muestre los datos, si necesitas de procesar la info, porque tambien sería muy pesado que se manden millones de registros al front.

## Describe un bug difícil que hayas encontrado en algún proyecto o ejercicio propio y cómo lo resolviste.




## ¿Qué diferencia hay entre == y === en JavaScript? Da un ejemplo concreto donde esa diferencia importe.

El operador == compara valores sin tomar el cuenta los tipos cuando es posible, mientras que === compara valores y tipos. Un caso donde me fue util fue cuando queria validar si necesitaba aplicar un filtro para mostrar usuarios que tengan comisiones, o no tenga comisiones o que no aplique el filtro. El problema qera que el back me mandaba una cadena vacia cuando no tenia que aplicar el filtro, pero si manejaba el operador == cuando validaba withComission === false me daba true, cuando debia ser false, con eso aprendi que es mejor usar === para evitar estos falsos positivos.