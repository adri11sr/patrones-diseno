/**
 * ! Singleton:
 * Es un patrón de diseño creacional que garantiza que una clase
 * tenga una única instancia y proporciona un punto de acceso global a ella.
 *
 * * Es útil cuando necesitas controlar el acceso a una única instancia
 * * de una clase, como por ejemplo, en un objeto de base de datos o en un
 * * objeto de configuración.
 *
 * https://refactoring.guru/es/design-patterns/singleton
 */

import { COLORS } from "../helpers/colors.ts";


class DragonBalls {

    private static instance: DragonBalls;
    private ballsCollected: number;

    private constructor(){
        this.ballsCollected = 0;
    }

    public static getInstace(): DragonBalls {
        if (!DragonBalls.instance){
            DragonBalls.instance = new DragonBalls();
            console.log('%cLas pelotas del Dragón han sido creadas', COLORS.green);
        }

        return DragonBalls.instance;
    }

    collecBalls(): void {
        if (this.ballsCollected < 7){
            this.ballsCollected ++;
            console.log(`Pelota recolectada. Total de esfera: ${this.ballsCollected}`);
            return;
        }

        console.log('Ya se han recolectado las 7 esferas del Dragon! Invoca a Shenlong');
    }

    summonShenlong(){
        if (this.ballsCollected === 7){
            console.log('Shenlong ha sido invocado, pida su deseo');
            this.ballsCollected = 0;
            return;
        }

        console.log(`Aún faltan ${7 - this.ballsCollected} para invocar a Shenlong`);
    }

}

function main (){

    const gokuDragonBalls =  DragonBalls.getInstace();

    gokuDragonBalls.collecBalls();
    gokuDragonBalls.collecBalls();
    gokuDragonBalls.collecBalls();

    gokuDragonBalls.summonShenlong();

    const vegetaDragonBalls = DragonBalls.getInstace();
    vegetaDragonBalls.collecBalls();
    vegetaDragonBalls.collecBalls();
    vegetaDragonBalls.collecBalls();
    vegetaDragonBalls.collecBalls();

    gokuDragonBalls.summonShenlong();

    vegetaDragonBalls.summonShenlong();

}

main();

