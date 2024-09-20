// src/chat/config/config.ts
import * as dotenv from 'dotenv'; 
dotenv.config();

export const API_KEY_GEMINI = process.env.KEY_GEMINI;

export const GENERATION_CONFIG = {
    stopSequences: ['red'],
    maxOutputTokens: 50,
    temperature: 0.1,
    topP: 0.1,
    topK: 10,
};

export const START_CHAT = [
    { 
        role: 'user', 
        parts: [
            'Que es jhass: Jhass es un crm donde ayuda al flaco',
            'Visión: Nuestra visión es convertirnos en el líder global en soluciones de gestión empresarial, empoderando a las empresas de todos los tamaños a alcanzar un nivel superior de eficiencia y transparencia operativa. Fecha de Creación: Jhass fue creado el 31 de mayo de 2024. Descripción General: Jhass CRM proporciona gestión de relaciones con clientes (software) para ayudar a las empresas a gestionar las interacciones con clientes actuales y potenciales. Nuestro software incluye administración de contactos, seguimiento de oportunidades, administración de tareas y otras características para ayudar a las empresas a aumentar las ventas, mejorar el servicio al cliente y aumentar la eficiencia. Olvidé mi contraseña: Si olvidaste tu contraseña, selecciona "Recuperar contraseña" en la pantalla de inicio de sesión y sigue las instrucciones que recibirás en tu correo electrónico. Quiero actualizar los datos de un usuario: Para actualizar los datos de un usuario, accede al módulo de gestión de usuarios, busca el usuario que deseas editar, realiza los cambios necesarios y guarda la información. Necesito eliminar un producto del stock: Para eliminar un producto, entra en el módulo de gestión de stock, encuentra el producto que deseas eliminar y selecciona la opción "Eliminar". Cómo añado un nuevo producto a mi inventario: En el módulo de gestión de stock, selecciona "Agregar producto". Completa los detalles del producto, como nombre, cantidad y precio, y guarda la información. Cómo registro una venta del día: Para registrar una venta, ve al módulo de gestión de ventas, selecciona "Registrar nueva venta", introduce los detalles de la venta, como producto y cantidad, y guarda la información. ¿Puedo consultar el estado de una venta?: Sí, puedes consultar el estado de una venta desde el módulo de gestión de ventas. Solo selecciona "Consultar ventas" y busca la venta cuyo estado deseas verificar. Cómo asigno una tarea a un empleado: Para asignar una tarea, ingresa al módulo de calendario y tareas, selecciona "Asignar tarea", elige el empleado y proporciona los detalles de la tarea junto con la fecha límite. ¿Dónde puedo ver las tareas pendientes?: Puedes ver las tareas pendientes en la sección "Tareas pendientes" dentro del módulo de calendario y tareas. Aquí se mostrarán todas las tareas que aún están por completarse. Quiero ver las gráficas de ventas: Para ver las gráficas de ventas, accede al módulo de gestión de gráficas y selecciona "Ventas". Podrás ver diferentes gráficas que representan el rendimiento de las ventas. Cómo registro un pago de nómina: Para registrar un pago de nómina, entra al módulo de gestión de pago de nómina, selecciona el empleado y proporciona la información del pago, como el monto y la fecha. Luego, guarda los datos. Necesito actualizar un pago de nómina: Para actualizar un pago, busca el pago correspondiente en el módulo de gestión de pago de nómina, edita la información necesaria y guarda los cambios. Cómo añado un nuevo empleado al sistema: Dirígete al módulo de gestión de empleados, selecciona "Añadir nuevo empleado" e ingresa toda la información requerida, como nombre, puesto y datos de contacto. Cómo registro una nueva novedad: Para registrar una nueva novedad, accede al módulo de gestión de novedades, selecciona "Registrar novedad" y completa los detalles necesarios antes de guardar el registro. Quiero eliminar una novedad: Para eliminar una novedad, entra en el módulo de gestión de novedades, selecciona la novedad que deseas eliminar y utiliza la opción "Eliminar". Cómo puedo registrar una nueva empresa en el sistema: Para registrar una nueva empresa, ve al módulo de gestión de empresa, selecciona "Registrar nueva empresa" e ingresa toda la información requerida, luego guarda los cambios. Necesito actualizar los datos de mi empresa: Para actualizar los datos de tu empresa, accede al módulo de gestión de empresa, selecciona "Editar" y modifica la información necesaria. No olvides guardar los cambios.'
        ]
        
    },
    {
        role: 'Chat',
        parts: ['¡Genial empresa!'],
    },
];
