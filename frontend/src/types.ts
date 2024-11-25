export type FoodItem = {
  id?: string;
  name: string;
  imageUrl: string;
};

export type GroceryItem = FoodItem & {
  weight: string;
  price: string;
};

export type Food = FoodItem & {
  timeTaken: string;
  reciepe: string;
  ingredients: GroceryItem['name'][];
  applicableDietary: string[];
};

export type Recipe = {
  date: number;
  frukost?: Food;
  lunsj?: Food;
  middag?: Food;
};

export type Plan = {
  id?: string;
  days: number;
  startDate: number;
  endDate: number;
  name: string;
  recipes: Recipe[];
  dietaryPreference: string[];
};

export type PlanCheckout = {
  planId: Plan['id'];
  cost: number;
  groceries: GroceryItem[];
};

export type APIResponse<T> =
  | {
      status: 'loading';
    }
  | {
      status: 'error';
      msg: string;
    }
  | {
      status: 'success';
      data: T;
    };

export type ExistingPlan = Required<Plan>;
