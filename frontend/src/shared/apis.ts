import axios from 'axios';
import { ExistingPlan, Food, GroceryItem, Plan, Recipe } from '../types';

export async function fetchPlans() {
  const response = await axios.get<ExistingPlan>('/api/plans/today');
  return response.data;
}

export async function fetchGroceries(): Promise<{
  cost: number;
  plan: Plan;
  groceryItems: GroceryItem[];
}> {
  const { data } = await axios.get<
    Promise<{
      cost: number;
      plan: Plan;
      groceryItems: GroceryItem[];
    }>
  >('/api/plan-checkout/');
  return data;
}

export async function listPlans(): Promise<ExistingPlan[]> {
  const { data } = await axios.get<ExistingPlan[]>('/api/plans');
  return data;
}

export async function getInsights() {
  const { data } = await axios.get<{
    currentPlan: string;
    barChartData: { ingredient: string; price: number }[];
    lineChartData: {
      planName: string;
      date: number;
      cost: number;
    }[];
  }>('/api/insights/');
  return data;
}

export async function listGroceries(
  groceryIngredient: string,
): Promise<GroceryItem[]> {
  const { data } = await axios.get<GroceryItem[]>(
    `/api/grocery-items?name=${groceryIngredient}`,
  );
  return data;
}

export async function searchMeals(
  name: string,
  category: string,
  dietaryPreference: ExistingPlan['dietaryPreference'],
): Promise<Food[]> {
  const dietaryApplication = dietaryPreference.map((val) => `&dietary=${val}`);
  const { data } = await axios.get(
    `/api/recipe/get-dishes-list?meal_type=${category}&name=${name}${dietaryApplication}`,
  );
  return data;
}

export async function listPlanRecipes(planId?: string): Promise<Recipe[]> {
  if (!planId) throw 'Invalid plan id';
  const { data } = await axios.get<Recipe[]>(`/api/plans/${planId}`);
  return data;
}
