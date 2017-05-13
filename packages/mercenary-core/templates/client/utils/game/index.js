export const locations = [
  'Brooklyn',
  'Manhattan',
  'Central Park',
  'Coney Island',
  'Queens',
  'The Bronx',
  'Staten Island',
];

export const products = [
  {
    name: 'Percocet',
    minPrice: 9,
    maxPrice: 189,
  },
  {
    name: 'Viagra',
    minPrice: 63,
    maxPrice: 360,
  },
  {
    name: 'Cialis',
    minPrice: 144,
    maxPrice: 1192,
  },
  {
    name: 'Ritalin',
    minPrice: 980,
    maxPrice: 2498,
  },
  {
    name: 'Wellbutrin',
    minPrice: 1326,
    maxPrice: 7365,
  },
  {
    name: 'Phentermine',
    minPrice: 9157,
    maxPrice: 34106,
  },
  {
    name: 'Vicodin',
    minPrice: 2051,
    maxPrice: 13859,
  },
];

// Get a random integer, from min to max, inclusive of both min and max
function getRandomInt(min, max) {
  min = Math.ceil(min); // eslint-disable-line
  max = Math.floor(max); // eslint-disable-line

  return Math.floor(Math.random() * (max - (min + 1))) + min;
}

// Random boolean based on odds, like:
// one in 100", or "one in 5000"
// "one in 2" would be similar to a coin flip
function oneIn(number) {
  const number1 = getRandomInt(1, number);
  const number2 = getRandomInt(1, number);

  // console.log('number1', number1);
  // console.log('number2', number2);

  return number1 === number2;
}

function featherNumber(number) {
  const feather = getRandomInt(0, 100) * 0.001;
  // console.log('feather', feather);
  const amount = number * feather;
  const modifier = oneIn(10) ? 1 : -1;
  // console.log('modifier', modifier);

  return number + (modifier * amount);
}

function getProductPrice(minPrice, maxPrice) {
  const median = Math.ceil((maxPrice - minPrice) / 2);

  // console.log(median, featherNumber(median));

  return featherNumber(median);
}

export class Controller {
  constructor({ game }) {
    this.game = game;
  }

  startGame() {
    this.game.start();
  }

  buyProduct(product) {
    this.game.player.buy(product);
  }

  sellProduct(product) {
    this.game.player.sell(product);
  }

  travel(location) {
    this.game.incrementDay();

    this.game.travel(location);
  }
}

export class Player {
  constructor() {
    this.bank = {
      balance: 2000,
      debt: 5000,
    };

    this.inventory = {
      maxItems: 60,
      totalItems: 0,
      items: {},
    };
  }

  buy({ id, price, qty }) {
    const totalCost = price * qty;

    if (totalCost > this.bank.balance) {
      return Promise.reject('Not enough money');
    }

    if (qty + this.inventory.totalItems > this.inventory.maxItems) {
      return Promise.reject('Not enough storage');
    }

    this.bank.balance -= totalCost;

    this.inventory.totalItems += qty;

    if (!this.inventory.items[id]) {
      this.inventory.items[id] = qty;
    } else {
      this.inventory.items[id] += qty;
    }

    return Promise.resolve();
  }

  sell({ id, price, qty }) {
    if (!this.inventory.items[id]) {
      return Promise.reject('Item not found');
    }

    if (qty > this.inventory.items[id]) {
      return Promise.reject('Not enough inventory');
    }

    this.bank.balance += (qty * price);

    this.inventory.totalItems -= qty;
    this.inventory.items[id] -= qty;

    return Promise.resolve();
  }
}

export class Game {
  constructor() {
    this.days = {
      current: 1,
      total: 60,
    };

    this.location = 0;

    this.player = new Player();
  }

  travel(id) {
    this.location = id;
  }

  incrementDay() {
    // Every once in a while, you save a day of travel, but most days,
    // travelling costs a day
    const mostDays = Math.random() <= 0.98;

    if (mostDays) {
      this.days.current += 1;
    } else {
      console.log('got an extra day!');
    }
  }

  getProducts = () => {
    return products.map((product) => {
      return {
        name: product.name,
        price: getProductPrice(product.minPrice, product.maxPrice),
      };
    });
  }
}
