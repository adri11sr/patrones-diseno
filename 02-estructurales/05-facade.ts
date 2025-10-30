/**
 * ! Patrón Facade
 * Este patrón proporciona una interfaz unificada para un conjunto de interfaces
 * en un subsistema.
 *
 * Facade define una interfaz de nivel más alto que hace que el subsistema
 * sea más fácil de usar.
 *
 * * Es útil cuando un subsistema es complejo o difícil de entender para
 * * proporcionar una interfaz simplificada para el cliente.
 *
 * https://refactoring.guru/es/design-patterns/facade
 */

import { COLORS } from "../helpers/colors.ts";


class Projector {
    turnOn(){
        console.log('Proyector endendido');
    }

    turnOff(){
        console.log('Proyector apagado');
    }
}

class SoundSystem {
    on(){
        console.log('Sistema de sonido encendido');
    }

    off(){
        console.log('Sitema de sonido apagado');
    }
}

class VideoPlayer {
    on(){
        console.log('Video player encendido');
    }

    play(movie:string){
        console.log(`%cReproduciendo ${movie}`, COLORS.blue);
    }

    stop(){
        console.log('Pelicula detenida');
    }

    off(){
        console.log('Video player apagado');
    }
}

class PopcornMaker{

    poppingPopcorn(){
        console.log('Haciendo palomitas');
    }

    tuenOfPoppingPopcorn(){
        console.log('Parando las palomitas');
    }

}

interface HomeTheaterFacadeOptions{
    projector:Projector;
    soundSystem:SoundSystem;
    videoPlayer:VideoPlayer;
    popcornMaker:PopcornMaker;
}

class HomeTheaterFacade {

    private projector:Projector;
    private soundSytem:SoundSystem;
    private videoPlayer:VideoPlayer;
    private popcornMaker:PopcornMaker;

    constructor({projector, popcornMaker, soundSystem, videoPlayer}:HomeTheaterFacadeOptions){

        this.popcornMaker = popcornMaker;
        this.projector = projector;
        this.soundSytem = soundSystem;
        this.videoPlayer = videoPlayer;

    }

    watchMovie(movie:string):void{

        console.log(`%cPreparando para ver la pelicula`, COLORS.blue)

        this.projector.turnOn();
        this.soundSytem.on();
        this.popcornMaker.poppingPopcorn();
        this.videoPlayer.on();
        this.videoPlayer.play(movie);

        console.log('%cDisfrute la pelicula', COLORS.blue)

    }

    endWatchingMovie():void{

        console.log(`%c\n\nPreparando para detener la pelicula`, COLORS.blue)

        this.projector.turnOff();
        this.soundSytem.off();
        this.popcornMaker.tuenOfPoppingPopcorn();
        this.videoPlayer.stop();
        this.videoPlayer.off();

        console.log('%cSistema apagado\n', COLORS.blue)

    }

}

function main (){

    const projector = new Projector();
    const soundSystem = new SoundSystem();
    const videoPlayer = new VideoPlayer();
    const popcornMaker = new PopcornMaker();

    const homeTheater = new HomeTheaterFacade({
        projector,
        soundSystem,
        videoPlayer,
        popcornMaker
    });

    homeTheater.watchMovie('In time');

    homeTheater.endWatchingMovie();

}

main();