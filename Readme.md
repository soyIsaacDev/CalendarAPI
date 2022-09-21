

Utilizo Express para el Direccionamiento de la API (rutas)
    

Express es un web framework para Node que brinda varias herramientas como:
    * Manejo de rutas junto con manejo de los distintos verbos de HTTP (GET, POST, DELETE)
        https://expressjs.com/es/guide/routing.html
    * Manejo de Middlewares en cualquier punto del request
        https://expressjs.com/en/guide/using-middleware.html
    * Manejo del algunos settings de una aplicacion web como:
        Puerto y ubicacion de templates para rendering

**Controladores**

The controller component is the intermediary between the model and the view. This acts as the brains behind the application and communicates with the Model and View.

Brindan el acceso  → Routing y Middlewares

Pasar endpoints a logica de servicios y conectar

You should see middleware as a step in your API and controllers as the entity that will actually respond to the requests.

**Middlewares**

Middleware is a (loosely defined) term for any software or service that enables the parts of a system to communicate and manage data. It is the software that handles communication between components and input/output, so developers can focus on the specific purpose of their application.

In server-side web application frameworks, the term is often more specifically used to refer to pre-built software components that can be added to the framework's request/response processing pipeline, to handle tasks such as database access.

Un middleware es una pieza de software que está en medio de otras 2, se le suele describir como software glue, es decir pegamento de software y es porque nos ayuda a conectar otras piezas de software; ya sea entre aplicaciones, sistemas o proyectos independientes. Su función es conectar dos partes y pasar datos entre ellas o de un lado a otro.

En Express los Middlewares realizan una accion entre el request y el response
    https://expressjs.com/en/guide/using-middleware.html

Ejemplos:
            middleware de parseo a JSON
    app.use(express.json());
        Al escribirlo asi se habilita para todas las rutas
    
    Middlewares de Router

    router.get("/staff", async (req, res) => {
        
    try {
        const staff = await Staff.findAll({   
        order:[['UbicacionCasaSum', 'ASC']]   
        });                                               Este es nuestro middleware
        res.json(staff);
    } catch (error) {     
        res.send(error);
    }
    });



**Setteando en el Modelo un calculo**

La forma de settear un valor calculado en un Modelo es:

set(value){
    const CalculoASettear = C alculo de lo que queremos settear
    this.setDataValue('UbicacionCasaSum', value + CalculoASettear );
}

   y pasar value = 0 cuando mandemos una nueva instancia del modelo 