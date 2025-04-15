const randomIDStr = () => Math.random().toString(36).slice(2)

class Accion {
    id: string
    descripcion: string
    protected fecha: Date

    constructor(
        descripcion: string,
        fecha: Date, 
    ) {
        this.id = randomIDStr()
        this.descripcion = descripcion
        this.fecha = fecha
    }
    // Mostrar la historia
    mostrarDetalle(): void{
        if(this.descripcion.trim() !== ""){
            console.log(`id: ${this.id}, descripcion: ${this.descripcion}, fecha: ${this.fecha}`)
        }
    }
}

class AccionInicioSesion extends Accion {
    private dispositivo_origen: string // Device session initiated on

    constructor(
        descripcion: string,
        fecha: Date, 
        dispositivo_origen: string
    ) {
        super(descripcion, fecha)
        this.dispositivo_origen = dispositivo_origen
    }
    mostrarDetalle(): void{
        if(this.descripcion.trim() !== ""){
            console.log(`id: ${this.id}, descripcion: ${this.descripcion}, fecha: ${this.fecha.toISOString()}, dispositivo_origen: ${this.dispositivo_origen}`)
        }
        else {
            return
        }
    }
}

class AccionCierreSesion extends Accion {
    private dispositivo_origen: string  // Device session closed on 
    tiempo_de_sesion: number // Session duration in minutes
    inicio:  AccionInicioSesion

    constructor(
        descripcion: string,
        fecha: Date, 
        dispositivo_origen: string,
        inicio: AccionInicioSesion
    ) {
        super(descripcion, fecha)
        this.dispositivo_origen = dispositivo_origen
        this.inicio = inicio
        this.tiempo_de_sesion = Math.round(fecha.getTime() - inicio['fecha'].getTime())/(60*1000)
    }
    mostrarDetalle(): void{
        if(this.descripcion.trim() !== ""){
            console.log(`id: ${this.id}, descripcion: ${this.descripcion}, fecha: ${this.fecha.toISOString()}, tiempo_de_sesion: ${this.tiempo_de_sesion}, dispositivo_origen: ${this.dispositivo_origen}`)
        }
        else {
            return
        }
    }
}

class Cambio {
    id_cambio: string
    valor_anterior: string
    nuevo_valor: string

    constructor(
        valor_anterior: string,
        nuevo_valor:string
    ){
    this.id_cambio = randomIDStr()
    this.valor_anterior = valor_anterior
    this.nuevo_valor = nuevo_valor
    }

    mostrarCambio(): void {
        console.log(`id_cambio: ${this.id_cambio}, valor_anterior: ${this.valor_anterior}, nuevo_valor: ${this.nuevo_valor}`)
    }
}

class AccionActualizacionPerfil extends Accion{
    cambios: Cambio[]

    constructor(
        descripcion: string,
        fecha: Date, 
        cambios: Cambio[] = []
    ) {
        super(descripcion, fecha)
        this.cambios = cambios
    }
    mostrarDetalle(): void{
        console.log(`id: ${this.id}, descripcion: ${this.descripcion}, fecha: ${this.fecha.toISOString()}, cambios:`) 
        this.cambios.forEach(cambio => cambio.mostrarCambio())
    }
      
}

class AccionCompra extends Accion{
    productos: string[]
    total: number

    constructor(
        descripcion: string, 
        fecha: Date, 
        productos: string[],
        total: number
    ) {
        super(descripcion, fecha)
        this.productos = productos
        this.total = total
    }

    mostrarDetalle(): void{
        console.log(`id: ${this.id}, descripcion: ${this.descripcion}, fecha: ${this.fecha.toISOString()}, productos: [${this.productos.join(", ")}], total: $${this.total}`)
    }
}

class AccionEnvioMensaje extends Accion {
    destinatario: string
    mensaje: string

    constructor(
        descripcion: string, 
        fecha: Date, 
        destinatario: string, 
        mensaje: string
    ) {
        super(descripcion, fecha)
        this.destinatario = destinatario
        this.mensaje = mensaje
    }

    mostrarDetalle(): void {
        console.log(`id: ${this.id}, descripcion: ${this.descripcion}, fecha: ${this.fecha.toISOString()}, destinatario: ${this.destinatario}, mensaje: "${this.mensaje}"`)
    }
}

class Historial {
    acciones: Accion[] = []
    
    // Agregar una nueva acción al historial
    agregarAccion(accion: Accion):void {
        this.acciones.push(accion);
    }
    // Eliminar una accion del historial
    eliminarAccionPorID(id: string): void {
        const index = this.acciones.findIndex(accion => accion.id === id);
        if (index !== -1) {
            this.acciones.splice(index, 1);
        }
        else
            console.log(`Accion con ID: ${id} no encontrado`);
    }
    // Vaciar el historial
    eliminarTodo(): void {
        this.acciones.length = 0;
    }
    // Mostrar la historia
    mostrarHistorial(): void {
        if (this.acciones.length === 0) {
            console.log("No hay acciones en el historial");
        }
        else {
            console.log("Historial de acciones:")
            this.acciones.forEach(accion => accion.mostrarDetalle());
        }
    }
    
}


/* Test code */
const inicio = new AccionInicioSesion("Session started", new Date("2025-04-12T09:00:00"), "Laptop")
inicio.mostrarDetalle()

const cierre = new AccionCierreSesion("Session ended", new Date("2025-04-12T11:15:00"), "Laptop", inicio)
cierre.mostrarDetalle()

const cambio1 = new Cambio("my_new_email@gmail.com", "my_old_email@yahoo.com")
const cambio2 = new Cambio("1234", "9383")
cambio1.mostrarCambio()

const actualizacion = new AccionActualizacionPerfil("Usuario actualizó su perfil", new Date("2025-04-12T12:00:00"), [cambio1, cambio2])
actualizacion.mostrarDetalle()

const compra = new AccionCompra("Usuario compró algo", new Date("2025-04-12T13:00:00"), ["Laptop", "Ratón"], 1500)
compra.mostrarDetalle()

const mensaje = new AccionEnvioMensaje("Usuario envió un mensaje", new Date("2024-08-31T13:00:00Z"), "admin@example.com", "Hola, necesito ayuda con mi cuenta.")
mensaje.mostrarDetalle()

const historial = new Historial()

historial.agregarAccion(inicio)
historial.agregarAccion(cierre)
historial.agregarAccion(actualizacion)
historial.agregarAccion(compra)
historial.agregarAccion(mensaje) 
historial.mostrarHistorial()

