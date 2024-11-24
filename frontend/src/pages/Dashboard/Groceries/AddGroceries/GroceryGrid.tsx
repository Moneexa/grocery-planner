import GroceryCard from './IndividualGrocery';
import { usePromise } from '../../../../shared-component/hooks';
import { listGroceries } from '../../../../shared-component/shared-apis';

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
