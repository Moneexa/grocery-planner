import { Card } from 'antd';
import { useContext, useMemo, useState } from 'react';
import { PlanContext } from '../../../../store/PlanProvider';

const { Meta } = Card;

function GroceryCard({
  itemId,
  itemName,
  itemPrice,
  itemWeight,
  itemUrl,
}: {
  itemId: string;
  itemName: string;
  itemPrice: string;
  itemWeight: string;
  itemUrl: string;
}) {
  const { addGrocery, grocery } = useContext(PlanContext);
  const isSelected = useMemo(() => {
    const groceryItems = grocery.groceries.find((item) => item.id === itemId);
    if (!groceryItems) return false;
    return true;
  }, [itemId, grocery]);

  return (
    <Card
      hoverable
      style={{ width: '150px', background: isSelected ? '#3aafdc' : 'none' }}
      cover={<img alt="example" src={itemUrl} />}
      onClick={() => {
        debugger;
        addGrocery({
          id: itemId,
          name: itemName,
          imageUrl: itemUrl,
          price: itemPrice,
          weight: itemWeight,
        });
      }}
    >
      <Meta
        title={itemName}
        description={`item's price:${itemPrice}, item's weight:${itemWeight}`}
      />
    </Card>
  );
}

export default GroceryCard;
