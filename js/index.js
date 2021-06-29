// элементы в DOM можно получить при помощи функции querySelector
const fruitsList = document.querySelector('.fruits__list'); // список карточек
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
const kindInput = document.querySelector('.kind__input'); // поле с названием вида
const colorInput = document.querySelector('.color__input'); // поле с названием цвета
const weightInput = document.querySelector('.weight__input'); // поле с весом
const addActionButton = document.querySelector('.add__action__btn'); // кнопка добавления
const minWeightSort = document.querySelector('.minweight__input'); // поле для сортировки по минимальному весу
const maxWeightSort = document.querySelector('.maxweight__input'); // поле для сортировки по максимальному весу

// список фруктов в JSON формате
let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13},
  {"kind": "Дуриан", "color": "зеленый", "weight": 35},
  {"kind": "Личи", "color": "розово-красный", "weight": 17},
  {"kind": "Карамбола", "color": "желтый", "weight": 28},
  {"kind": "Тамаринд", "color": "светло-коричневый", "weight": 22}
]`;

// преобразование JSON в объект JavaScript
let fruits = JSON.parse(fruitsJSON);

let resultDouble;

/*** ОТОБРАЖЕНИЕ ***/

// отрисовка карточек
const display = () => {
  while (fruitsList.firstChild) {
    fruitsList.removeChild(fruitsList.firstChild)
  }

  for (let i = 0; i < fruits.length; i++) {
    // Выбор цвета рамки
    let fruitColor;
    switch (fruits[i].color) {
      case 'фиолетовый':
        fruitClassColor = 'fruit_violet';
        break;
      case 'зеленый':
        fruitClassColor = 'fruit_green';
        break;
      case 'розово-красный':
        fruitClassColor = 'fruit_carmazin';
        break;
      case 'желтый':
        fruitClassColor = 'fruit_yellow';
        break;
      case 'светло-коричневый':
        fruitClassColor = 'fruit_lightbrown';
        break;
    }

    let fruitItem = document.createElement('li');
    fruitItem.classList.add('fruit__item', fruitClassColor);

    let fruitInfo = document.createElement('div');
    fruitInfo.classList.add('fruit__info');

    let index = document.createElement(`div`);
    let kind = document.createElement(`div`);
    let color = document.createElement(`div`);
    let weight = document.createElement(`div`);

    index.textContent = `index: ${i}`;
    kind.textContent = `kind: ${fruits[i].kind}`;
    color.textContent = `color: ${fruits[i].color}`;
    weight.textContent = `weight: ${fruits[i].weight}`;

    fruitInfo.appendChild(index);
    fruitInfo.appendChild(kind);
    fruitInfo.appendChild(color);
    fruitInfo.appendChild(weight);

    fruitItem.appendChild(fruitInfo);
    fruitsList.appendChild(fruitItem);
  }
};

// первая отрисовка карточек
display();

/*** ПЕРЕМЕШИВАНИЕ ***/

// генерация случайного числа в заданном диапазоне
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// перемешивание массива
const shuffleFruits = () => {
  let result = [];
  let n = 0;

  while (fruits.length > 0) {
    let i = getRandomInt(0, fruits.length - 1);
    result.splice(n, 0, fruits[i]);
    fruits.splice(i, 1);
    n++;
  }

  if (array_compare(resultDouble, result)) {
    alert('Порядок фруктов не изменился!')
    fruits = result;
  } else {
    fruits = result;
  }
};

shuffleButton.addEventListener('click', () => {
  resultDouble = fruits.slice();
  shuffleFruits();
  display();
});

/*** ФИЛЬТРАЦИЯ ***/

// фильтрация массива
const filterFruits = () => {
  let itemFilter = fruits.filter((item) => {
    return item.weight >= minWeightSort.value && item.weight <= maxWeightSort.value;
  });
  fruits = itemFilter;
};

filterButton.addEventListener('click', () => {
  filterFruits();
  display();
});

/*** СОРТИРОВКА ***/

let sortKind = 'bubbleSort'; // инициализация состояния вида сортировки
let sortTime = '-'; // инициализация состояния времени сортировки

const comparationColor = (fruits1, fruits2) => {
  // TODO: допишите функцию сравнения двух элементов по цвету
  const priority = ['розово-красный', 'желтый', 'светло-коричневый', 'зеленый', 'фиолетовый'];
  const priority1 = priority.indexOf(fruits1.color);
  const priority2 = priority.indexOf(fruits2.color);
  return priority1 > priority2;
};

const sortAPI = {
  bubbleSort(arr, comparation) {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - 1 - i; j++) {
        if (comparation(arr[j], arr[j + 1])) {
          let temp = arr[j + 1];
          arr[j + 1] = arr[j];
          arr[j] = temp;
        }
      }
    }
  },

  quickSort(arr, comparation) {
    // TODO: допишите функцию быстрой сортировки
  },

  // выполняет сортировку и производит замер времени
  startSort(sort, arr, comparation) {
    const start = new Date().getTime();
    sort(arr, comparation);
    const end = new Date().getTime();
    sortTime = `${end - start} ms`;
  },
};

// инициализация полей
sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;

sortChangeButton.addEventListener('click', () => {
  if (sortKind === 'bubbleSort') {
    sortKind = 'quickSort';
    sortKindLabel.textContent = sortKind;
  } else {
    sortKind = 'bubbleSort';
    sortKindLabel.textContent = sortKind;
  }
});

sortActionButton.addEventListener('click', () => {
  const sort = sortAPI[sortKind];
  sortAPI.startSort(sort, fruits, comparationColor);
  display();
  sortTimeLabel.textContent = sortTime;
});

/*** ДОБАВИТЬ ФРУКТ ***/

addActionButton.addEventListener('click', () => {
  // TODO: создание и добавление нового фрукта в массив fruits
  // необходимые значения берем из kindInput, colorInput, weightInput
  display();
});

function array_compare(a, b) {
  if (a.length != b.length)
    return false;

  for (i = 0; i < a.length; i++)
    if (a[i] != b[i])
      return false;

  return true;
}