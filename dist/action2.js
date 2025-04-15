"use strict";
const randomIDStr = () => Math.random().toString(36).slice(2);
class Accion {
    constructor(descripcion, fecha) {
        this.id = randomIDStr();
        this.descripcion = descripcion;
        this.fecha = fecha;
    }
    // Mostrar la historia
    mostrarDetalle() {
        if (this.descripcion.trim() !== "") {
            console.log(`id: ${this.id}, descripcion: ${this.descripcion}, fecha: ${this.fecha}`);
        }
    }
}
class AccionInicioSesion extends Accion {
    constructor(descripcion, fecha, dispositivo_origen) {
        super(descripcion, fecha);
        this.dispositivo_origen = dispositivo_origen;
    }
    mostrarDetalle() {
        if (this.descripcion.trim() !== "") {
            console.log(`id: ${this.id}, descripcion: ${this.descripcion}, fecha: ${this.fecha.toISOString()}, dispositivo_origen: ${this.dispositivo_origen}`);
        }
        else {
            return;
        }
    }
}
class AccionCierreSesion extends Accion {
    constructor(descripcion, fecha, dispositivo_origen, inicio) {
        super(descripcion, fecha);
        this.dispositivo_origen = dispositivo_origen;
        this.inicio = inicio;
        this.tiempo_de_sesion = Math.round(fecha.getTime() - inicio['fecha'].getTime()) / (60 * 1000);
    }
    mostrarDetalle() {
        if (this.descripcion.trim() !== "") {
            console.log(`id: ${this.id}, descripcion: ${this.descripcion}, fecha: ${this.fecha.toISOString()}, tiempo_de_sesion: ${this.tiempo_de_sesion}, dispositivo_origen: ${this.dispositivo_origen}`);
        }
        else {
            return;
        }
    }
}
class Cambio {
    constructor(valor_anterior, nuevo_valor) {
        this.id_cambio = randomIDStr();
        this.valor_anterior = valor_anterior;
        this.nuevo_valor = nuevo_valor;
    }
    mostrarCambio() {
        console.log(`id_cambio: ${this.id_cambio}, valor_anterior: ${this.valor_anterior}, nuevo_valor: ${this.nuevo_valor}`);
    }
}
class AccionActualizacionPerfil extends Accion {
    constructor(descripcion, fecha, cambios = []) {
        super(descripcion, fecha);
        this.cambios = cambios;
    }
    mostrarDetalle() {
        console.log(`id: ${this.id}, descripcion: ${this.descripcion}, fecha: ${this.fecha.toISOString()}, cambios:`);
        this.cambios.forEach(cambio => cambio.mostrarCambio());
    }
}
/* Test code */
const inicio = new AccionInicioSesion("Session started", new Date("2025-04-12T09:00:00"), "Laptop");
inicio.mostrarDetalle();
const cierre = new AccionCierreSesion("Session ended", new Date("2025-04-12T11:15:00"), "Laptop", inicio);
cierre.mostrarDetalle();
const cambio1 = new Cambio("my_new_email@gmail.com", "my_old_email@yahoo.com");
const cambio2 = new Cambio("1234", "9383");
