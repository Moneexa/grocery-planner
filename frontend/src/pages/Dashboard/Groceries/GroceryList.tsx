import { Card, Flex, Typography } from 'antd';
import { GroceryItem } from '../../../types';

export default function GroceryList({
  groceryList,
}: {
  groceryList: { cost: number; groceries: GroceryItem[] };
}) {
  const { Meta } = Card;
  return (
    <>
      <h1>Grocery Added for the Current Plan</h1>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '16px',
          width: '100%',
        }}
      >
        {groceryList.groceries.map((item) => (
          <Card
            hoverable
            cover={
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  height: '200px',
                  padding: '10px',
                  backgroundImage: `url('${item.imageUrl}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  backgroundClip: 'content-box',
                }}
              ></div>
            }
          >
            <Meta
              title={item.name}
              description={`${item.price} nok with ${item.weight}kg`}
            />
          </Card>
        ))}
      </div>
      <Flex
        vertical
        justify="flex-end"
        align="end"
        gap={10}
        style={{ width: '100%', paddingRight: '2rem' }}
      >
        <Typography.Title level={4} style={{ margin: 0 }}>
          Total Price:{groceryList.cost} nok
        </Typography.Title>
        <Typography.Title level={4} style={{ margin: 0 }}>
          Total Items:{groceryList.groceries.length}kg
        </Typography.Title>
      </Flex>
    </>
  );
}
