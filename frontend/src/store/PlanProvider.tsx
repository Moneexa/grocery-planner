import { useState, createContext } from 'react';
import { Food, GroceryItem, GroceryPlan, Plan, Recipe } from '../types';

const defaultPlan: Plan = {
  days: 0,
  startDate: Date.now(),
  endDate: Date.now(),
  name: '',
  dietaryPreference: [],
  recipes: [],
};
const defaultGroceryPlan: GroceryPlan = {
  cost: 0,
  groceries: [],
  planId: '0',
};
const noop = () => {};

type Actions = {
  addFood: (
    food: Food,
    date: number,
    category: Exclude<keyof Recipe, 'date'>,
  ) => void;
  changePlan: (plan: Plan) => void;
  addGrocery: (groceryItem: GroceryItem) => void;
};

type PlanStore = {
  plan: Plan;
  grocery: GroceryPlan;
} & Actions;

// eslint-disable-next-line react-refresh/only-export-components
export const PlanContext = createContext<PlanStore>({
  plan: defaultPlan,
  grocery: defaultGroceryPlan,
  addFood: noop,
  changePlan: noop,
  addGrocery: noop,
});

function PlanProvider({ children }: { children: React.ReactNode }) {
  const [plan, setPlan] = useState(defaultPlan);
  const [grocery, setGrocery] = useState(defaultGroceryPlan);

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
  };

  const addGrocery = (groceryItem: GroceryItem) => {
    const groc = structuredClone(grocery);
    if (groc.groceries.some((grocery) => grocery.id === groceryItem.id)) {
      setGrocery({
        ...groc,
        groceries: groc.groceries.filter((g) => g.id !== groceryItem.id),
      });
      return;
    }
    groc['planId'] = plan.id;
    groc['groceries'].push(groceryItem);
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
