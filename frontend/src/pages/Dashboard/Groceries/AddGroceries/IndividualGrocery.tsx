import { Card } from 'antd';
import { useContext, useMemo } from 'react';
import { PlanContext } from '../../../../store/PlanProvider';

const { Meta } = Card;

function GroceryCard({
  itemId,
  itemName,
  itemPrice,
  itemWeight,
  itemUrl,
}: {
  itemId?: string;
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
      style={{ width: '100%', background: isSelected ? '#3aafdc' : 'none' }}
      cover={
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            height: '200px',
            padding: '10px',
            backgroundImage: `url('${itemUrl}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundClip: 'content-box',
          }}
        ></div>
      }
      onClick={() => {
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
