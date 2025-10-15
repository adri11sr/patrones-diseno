/**
 * ! Factory Method:
 * El patrón Factory Method permite crear objetos sin especificar
 * la clase exacta del objeto que se creará.
 *
 * En lugar de eso, delegamos la creación de objetos a subclases o métodos
 * que encapsulan esta lógica.
 *
 * * Es útil cuando una clase no puede anticipar la clase
 * * de objetos que debe crear.
 *
 * https://refactoring.guru/es/design-patterns/factory-method
 *
 */

import { COLORS } from "../helpers/colors.ts";


interface Burger {
    prepera():void;
}

class ChickenBurger implements Burger {

  prepera(): void {
    console.log("Preparando una hamburguesa de %cpollo", COLORS.yellow)
  }
    
}

class BeefBurger implements Burger {

  prepera(): void {
    console.log("Preparando una hamburguesa de %cvacuno", COLORS.brown)
  }
    
}

class BeanBurger implements Burger {

  prepera(): void {
    console.log("Preparando una hamburguesa de %cfrijoles", COLORS.green)
  }
    
}

abstract class Restaurant {

    protected abstract createBurger(): Burger;

    orderBurger(): void {
        const burger = this.createBurger();
        burger.prepera();
    }

}

class ChickenRestaurant extends Restaurant {

    override createBurger(): Burger {
      return new ChickenBurger();
    }

    
}

class BeanRestaurant extends Restaurant {

    override createBurger(): Burger {
      return new BeanBurger();
    }

    
}

class BeefRestaurant extends Restaurant {

    override createBurger(): Burger {
      return new BeefBurger();
    }

}


function main (){

    let restaurant: Restaurant;

    const burgerType = prompt('Que tipo de buirger quieres (beef/chicken/bean)');

    switch (burgerType) {
        case 'chicken':
            restaurant = new ChickenRestaurant();
            break;
        case 'beef':
            restaurant = new BeefRestaurant();
            break;
        case 'bean':
            restaurant = new BeanRestaurant();
            break;
        default:
            throw new Error("Opción no valida")
    }

    restaurant.orderBurger();

}

main();