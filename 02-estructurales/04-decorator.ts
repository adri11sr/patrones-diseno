/**
 * ! Patrón decorador
 * Es un patrón de diseño estructural que permite añadir
 * funcionalidades a objetos, colocando estos objetos dentro de
 * objetos encapsuladores especiales que contienen estas funcionalidades.
 *
 * No confundirlo con los decoradores de TypeScript que son anotaciones.
 *
 * * Es útil cuando necesitas añadir funcionalidades a objetos
 *  * de manera dinámica y flexible.
 *
 * https://refactoring.guru/es/design-patterns/decorator
 */

import { COLORS } from "../helpers/colors.ts";


interface Notification {
    send(message:string):void;
}

class BasicNotification implements Notification{

  send(message: string): void {
    console.log(`Enviando notificacion básica: %c${message}`,COLORS.blue);
  }
    
}

// Classe Decoradora
abstract class NotificationDecortator implements Notification{

    protected notification: Notification;

    constructor(notification:Notification){
        this.notification = notification;
    }

  send(message: string): void {
    this.notification.send(message);
  }
    
}

// Crear diferentes decoradores
class EmailDecorator extends NotificationDecortator {

    private sendEmail(message:string){
        console.log(`Enviar notificaión por email: %c${message}`,COLORS.green)
    }

    override send(message: string): void {
      super.send(message);
      this.sendEmail(message);
    }

}

class SMSDecorator extends NotificationDecortator {

    private sendSMS(message:string){
        console.log(`Enviar notificaión por SMS: %c${message}`,COLORS.yellow)
    }

    override send(message: string): void {
      super.send(message);
      this.sendSMS(message);
    }

}

function main(){

    let notificacion:Notification = new BasicNotification();

    notificacion = new EmailDecorator(notificacion);
    notificacion = new SMSDecorator(notificacion);

    notificacion.send('Alerta del sistema');

}

main();