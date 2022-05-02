/* DONT CHANGE THIS CODE - START */
function wait(ms = 1000) { return new Promise(resolve => setTimeout(resolve, ms)) }

class Dish {
    constructor(cookingTime) {
        this.cookingTime = cookingTime;
    }

    async cook() {
        const actualCookingTime = this.cookingTime * (1 + Math.random()) * 100;
        await wait(actualCookingTime);
        return this;
    }
}
/* DONT CHANGE THIS CODE - END */

/*
    YOUR CODE HERE
*/

class Kitchen {
    constructor() {
        this.ingridients = {}
        this.dishes = []
    }

    addToFridge(ingridients) {
        for (let ingridient of ingridients) {
            if (ingridient.name in ingridients) {
                this.ingridients[ingridient.name] += 1;
            }
            else {
                this.ingridients[ingridient.name] = 1;
            }
        }
    }

    order(dish) {
        if (!(this.getIngridients(dish))) {
            throw new Error('Not enough ingridients in fridge');
        }
        this.dishes.push(dish);
    }

    cookFastestOrder() {
        let fastest_idx = 0;
        let fastest_time = this.dishes[0].cookingTime;
        for (let i = 1; i < this.dishes.length; i++) {
            if (this.dishes[i].cookingTime < fastest_time) {
                fastest_idx = i;
                fastest_time = this.dishes[fastest_idx].cookingTime;
            }
        }

        return this.dishes.splice(fastest_idx, 1)[0].cook();
    }

    cookAllOrders() {
        let cooked = []
        for (let i = 0; i < this.dishes.length; i++) {
            cooked.push(this.dishes[i].cook());
        }
        this.dishes = []
        return Promise.all(cooked);
    }

    getIngridients(dish) {
        for (let ingridient of dish.needed_ingridients) {
            if (!(ingridient.name in this.ingridients)) {
                return false;
            }
            if (ingridient.quantity > this.ingridients[ingridient.name]) {
                return false;
            }
            else {
                this.ingridients[ingridient.name] -= ingridient.quantity;
            }
        }
        return true;
    }
}

class Bolognese extends Dish {
    constructor() {
        super(10);
        this.name = 'Bolognese';
        this.needed_ingridients = [new Ingridient('spaghetti', 1)];
    }
}

class MashedPotatoes extends Dish {
    constructor() {
        super(8);
        this.name = 'MashedPotatoes';
        this.needed_ingridients = [new Ingridient('potato', 1)];
    }
}

class Steak extends Dish {
    constructor() {
        super(7);
        this.name = 'Steak';
        this.needed_ingridients = [new Ingridient('meat', 1)];
    }
}

class SteakAndFries extends Dish {
    constructor() {
        super(15);
        this.name = 'SteakAndFries';
        this.needed_ingridients = [new Ingridient('meat', 1),
        new Ingridient('potato', 1)];
    }
}

class Ingridient {
    constructor(name, quantity) {
        this.name = name;
        this.quantity = quantity;
    }
}

async function test() {
    const kitchen = new Kitchen();
    kitchen.addToFridge([
        new Ingridient('potato', 1),
        new Ingridient('spaghetti', 1),
        new Ingridient('meat', 3),
        new Ingridient('tomato', 2)
    ])

    kitchen.order(new Bolognese()); // Bolognese extends Dish (cookingTime = 10)
    kitchen.order(new MashedPotatoes()); // MashedPotatoes extends Dish (cookingTime = 8)
    kitchen.order(new Steak()); // Steak extends Dish (cookingTime = 7)

    // Feel free to experiment with various dishes and ingridients

    await kitchen.cookFastestOrder(); // Returns fastest dish to make
    let dishes = await kitchen.cookAllOrders(); // Returns two dishes in array

    for (let dish of dishes) {
        console.log('Cooked: ' + dish.name);
    }

    try {
        kitchen.order(new SteakAndFries()); // Throws Error: Not enough ingridients in fridge
    }
    catch (err) {
        console.log(err.message);
    }
}

test();
