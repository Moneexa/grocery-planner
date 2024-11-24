import { Col, Row } from 'antd';
import { APIResponse, GroceryItem } from '../../../../types';
import { useEffect, useMemo, useState } from 'react';
import GroceryCard from './IndividualGrocery';
import axios from 'axios';

export default function GroceryGrid({
  groceryIngredient,
}: {
  groceryIngredient: string;
}) {
  const [groceries, setGroceries] = useState<APIResponse<GroceryItem[]>>({
    status: 'loading',
  });
  useEffect(() => {
    axios
      .get(`/api/grocery-items?name=${groceryIngredient}`)
      .then((response) => {
        setGroceries({ status: 'success', data: response.data });
      })
      .catch((error) => setGroceries({ status: 'error', msg: error }));
  }, [groceryIngredient]);
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
