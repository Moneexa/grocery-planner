import { Col, Row } from 'antd';
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
    <Row gutter={16}>
      {groceries.status == 'loading' && '...loading'}
      {groceries.status == 'error' && groceries.msg}

      {groceries.status === 'success' &&
        groceries.data.map((groc) => {
          return (
            <Col>
              <GroceryCard
                itemId={groc.id}
                itemName={groc.name}
                itemWeight={groc.weight}
                itemPrice={groc.price}
                itemUrl={groc.imageUrl}
              />
            </Col>
          );
        })}
    </Row>
  );
}
