/**
 * ! Patrón Command
 * Este patrón encapsula una solicitud como un objeto,
 * lo que le permite parametrizar otros objetos con diferentes solicitudes,
 * encolar solicitudes, o registrar solicitudes, y soporta operaciones que pueden deshacerse.
 *
 * Me gustó mucho la explicación de Refactoring Guru
 * https://refactoring.guru/es/design-patterns/command
 *
 * * Es útil cuando se necesita desacoplar el objeto que invoca
 * * la operación del objeto que sabe cómo realizarla.
 *
 *
 */

import { COLORS } from "../helpers/colors.ts";

interface Command {
    execute(): void;
}

class Light {
    turnOn(): void{
        console.log('%cLa luz está encendida', COLORS.yellow)
    }
    turnOff(): void{
        console.log('%cLa luz está apagada', COLORS.yellow)
    }
}

class Fan {
    on(): void{
        console.log('%cEl ventilador está encendida', COLORS.green)
    }
    off(): void{
        console.log('%cEl ventilador apagada', COLORS.green)
    }
}


// Commands

class LighOnCommnd implements Command {

    constructor(private light: Light){}

  execute(): void {
    this.light.turnOn();
  }  
}

class LighOffCommnd implements Command {

    constructor(private light: Light){}

  execute(): void {
    this.light.turnOff();
  }  
}

class FanOnCommnd implements Command {

    constructor(private fan: Fan){}

  execute(): void {
    this.fan.on();
  }  
}

class FanOffCommnd implements Command {

    constructor(private fan: Fan){}

  execute(): void {
    this.fan.off();
  }  
}


class RemoteControl {
    private commmands: Record<string, Command> = {};

    setCommand(button: string, command:Command){
        this.commmands[button] = command;
    }

    pressButton(button:string): void {
        if (this.commmands[button]){
            this.commmands[button].execute();
            return;
        }

        console.log("%cNo se ha asignado ningú comando a ese botón", COLORS.red)
    }
}

function main(){

    const remoteControl = new RemoteControl();
    const light = new Light();
    const fan = new Fan();

    const lightOnCommand = new LighOnCommnd(light);
    const lightOffCommand = new LighOffCommnd(light);

    const fanOnCommand = new FanOnCommnd(fan);
    const fanOffCommand = new FanOffCommnd(fan);

    remoteControl.setCommand("1", lightOnCommand);
    remoteControl.setCommand("2", lightOffCommand);
    remoteControl.setCommand("3", fanOnCommand);
    remoteControl.setCommand("4", fanOffCommand);

    let continueProgram = true;

    do {

        console.clear();
        const pressedButton = prompt(
            `Presiona un botón del control:
                1. Encender la luz
                2. Apagar la luz
                3. Encender el ventilador
                4. Apagar el ventilador

                Botón:
            `) ?? ''
         
        remoteControl.pressButton(pressedButton);

        const continueProgramResponse = prompt(`
            \n ¿Desea continuar? (y/n):
            `)  ?.toLocaleLowerCase()

        continueProgram =continueProgramResponse === 'n' ? false : true;
        
    } while (continueProgram)
}

main();