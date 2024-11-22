import { Card } from 'antd';
import { useContext } from 'react';
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
  const { addGrocery } = useContext(PlanContext);
  return (
    <Card
      hoverable
      style={{ width: '150px' }}
      cover={<img alt="example" src={itemUrl} />}
      onClick={() =>
        addGrocery({
          id: itemId,
          name: itemName,
          imageUrl: itemUrl,
          price: itemPrice,
          weight: itemWeight,
        })
      }
    >
      <Meta
        title={itemName}
        description={`item's price:${itemPrice}, item's weight:${itemWeight}`}
      />
    </Card>
  );
}

export default GroceryCard;
