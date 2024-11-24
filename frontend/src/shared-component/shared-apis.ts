import axios from 'axios';
import { APIResponse, GroceryPlan } from '../types';

export async function fetchPlans() {
  const response = await axios.get('/api/plans/today');
  if (response) {
    const plan = response.data;
    return plan;
  }
}

export async function fetchGroceries() {
  try {
    const response = await axios.get('/api/grocery-plan/');
    const { groceryPlan, groceryItems } = response.data;

    return {
      cost: groceryPlan.cost,
      planId: groceryPlan.plan,
      groceries: groceryItems,
    };
  } catch {
    return {
      error: 'Something wrong happeend',
    };
  }
}
