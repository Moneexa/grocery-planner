import GroceryCard from './IndividualGrocery';
import { usePromise } from '../../../../shared/hooks';
import { listGroceries } from '../../../../shared/apis';

export default function GroceryGrid({
  groceryIngredient,
}: {
  groceryIngredient: string;
}) {
  const groceries = usePromise(
    () => listGroceries(groceryIngredient),
    [groceryIngredient],
  );
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '16px',
      }}
    >
      {groceries.status == 'loading' && '...loading'}
      {groceries.status == 'error' && groceries.msg}

      {groceries.status === 'success' &&
        groceries.data.map((groc) => {
          return (
            <GroceryCard
              key={groc.id}
              itemId={groc.id}
              itemName={groc.name}
              itemWeight={groc.weight}
              itemPrice={groc.price}
              itemUrl={groc.imageUrl}
            />
          );
        })}
    </div>
  );
}
