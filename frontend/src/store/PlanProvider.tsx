import { useState, createContext } from 'react';
import { Food, GroceryItem, GroceryPlan, Plan, Recipe } from '../types';

const defaultPlan: Plan = {
  id: '',
  days: 0,
  startDate: Date.now(),
  endDate: Date.now(),
  name: '',
  image: '',
  recipes: [],
};
const groceryPlan: GroceryPlan = {
  cost: 0,
  groceries: [],
  planId: '0',
};
export const PlanContext = createContext({
  plan: defaultPlan,
  grocery: groceryPlan,
  changePlan: (_: Plan) => {},
  addFood: (
    _food: Food,
    _date: number,
    _category: Exclude<keyof Recipe, 'date'>,
  ) => {},
  addGrocery: (_groceryItem: GroceryItem) => {},
});

function PlanProvider({ children }: { children: React.ReactNode }) {
  const [plan, setPlan] = useState(defaultPlan);
  const [grocery, setGrocery] = useState(groceryPlan);

  const changePlan = (payload: Plan) => setPlan(payload);

  const addFood = (
    food: Food,
    date: number,
    cat: Exclude<keyof Recipe, 'date'>,
  ) => {
    const selectedRecipeIndex = plan.recipes.findIndex(
      (recipe) => recipe.date === date,
    );
    if (selectedRecipeIndex < 0) {
      setPlan({
        ...plan,
        recipes: [
          ...plan.recipes,
          {
            date: date,
            [cat]: food,
          },
        ],
      });
    } else {
      const planCloned = structuredClone(plan);
      planCloned['recipes'][selectedRecipeIndex][cat] = food;

      setPlan(planCloned);
    }

    console.log(plan);
  };

  const addGrocery = (groceryItem: GroceryItem) => {
    const groc = grocery;
    groc['planId'] = plan.id;
    groc.groceries.push(groceryItem);
    const cost: number = groc.groceries.reduce(
      (acc, next) => acc + Number(next.price),
      0,
    );
    groc['cost'] = cost;
    setGrocery(groc);
  };
  return (
    <PlanContext.Provider
      value={{ plan, changePlan, addFood, grocery, addGrocery }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export default PlanProvider;
