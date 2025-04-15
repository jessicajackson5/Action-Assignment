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
/* Test code */
const inicio = new AccionInicioSesion("Session started", new Date("2025-04-12T09:00:00"), "Laptop");
inicio.mostrarDetalle();
const cierre = new AccionCierreSesion("Session ended", new Date("2025-04-12T11:15:00"), "Laptop", inicio);
cierre.mostrarDetalle();
