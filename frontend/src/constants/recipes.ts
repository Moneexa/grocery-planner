import { Food } from '../types';

export const recipes: { [key: string]: Food[] } = {
  frukost: [
    {
      id: 'bread with pesto',
      imageUrl: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
      name: 'bread with pesto',
      timeTaken: '20mins',
      reciepe: '',
      applicableDietary: ['keto', 'vegan', 'vegetarian'],
      ingredients: ['brod', 'pesto'],
    },
    {
      id: 'boiled egg',
      imageUrl: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
      name: 'boiled egg',
      timeTaken: '20mins',
      reciepe: '',
      applicableDietary: ['keto', 'vegan', 'vegetarian'],

      ingredients: ['egg', 'pepper'],
    },
  ],
  lunsj: [
    {
      id: 'tomato sauce with bread',
      imageUrl: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
      name: 'tomato sauce with bread',
      timeTaken: '20mins',
      reciepe: '',
      applicableDietary: ['keto', 'vegan', 'vegetarian'],

      ingredients: ['tomato', 'cheese', 'brod'],
    },
    {
      id: 'alfredo salad',
      imageUrl: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
      name: 'alfredo salad',
      timeTaken: '20mins',
      reciepe: '',
      applicableDietary: ['keto', 'vegan', 'vegetarian'],

      ingredients: ['cream', 'onion'],
    },
  ],
  middag: [
    {
      id: 'white pasta',
      imageUrl: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
      name: 'white pasta',
      timeTaken: '20mins',
      reciepe: '',
      applicableDietary: ['keto', 'vegan', 'vegetarian'],

      ingredients: ['pasta', 'parmesan'],
    },
    {
      id: 'grilled cicken',
      imageUrl: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
      name: 'frukost1',
      timeTaken: '20mins',
      reciepe: '',
      applicableDietary: ['keto', 'vegan', 'vegetarian'],

      ingredients: ['white pepper', 'chicken fillet'],
    },
  ],
};
