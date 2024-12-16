import { useState, useContext } from 'react';
import { Button, Card, Empty, Flex, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { CheckOutlined, PlusOutlined } from '@ant-design/icons';
import { PlanContext } from '../../../store/PlanProvider';

import { fetchPlans } from '../../../shared/apis';
import axios from 'axios';
import { usePromise } from '../../../shared/hooks';

const { Meta } = Card;
export default function Groceries() {
  const [loading, setLoading] = useState(false);
  const { grocery } = useContext(PlanContext);
  const plan = usePromise(fetchPlans);
  const handleCheckOut = async () => {
    if (plan.status !== 'success') return;
    setLoading(true);
    const copyGrocery = structuredClone(grocery);
    const updatedGroceries = copyGrocery.groceries.map((item) => ({
      ...item,
      id: undefined,
    }));
    const payload = {
      ...grocery,
      groceries: updatedGroceries,
      planId: plan.data.id,
    };
    try {
      const response = await axios.post('/api/plan-checkout/add/', payload);
      if (response?.data) {
        setLoading(false);
      }
    } catch {
      setLoading(false);

      alert('You have added these groceries already');
    }
  };
  return (
    <>
      {grocery.groceries.length > 0 ? (
        <Flex vertical gap={10} align="center" justify="center">
          <h1>Grocery Added for the Plan</h1>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: '16px',
              width: '100%',
            }}
          >
            {grocery.groceries.map((item) => (
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
                  >
                    {/* <img
                        alt="example"
                        src={item.imageUrl}
                        style={{
                          height: '100%',
                          width: 'auto',
                          maxWidth: '100%',
                        }}
                      /> */}
                  </div>
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
              Total Price:{grocery.cost} nok
            </Typography.Title>
            <Typography.Title level={4} style={{ margin: 0 }}>
              Total Items:{grocery.groceries.length}kg
            </Typography.Title>
            <Button
              type="primary"
              icon={<CheckOutlined />}
              loading={loading}
              onClick={handleCheckOut}
            >
              Checkout
            </Button>
          </Flex>
        </Flex>
      ) : (
        <Flex align="center" justify="center" vertical gap={10}>
          <Empty description="You have no plans added, please add one." />
          <Button type="primary" icon={<PlusOutlined />} size="large">
            <Link to="/app/meal-schedule/add">Add Meal</Link>
          </Button>
        </Flex>
      )}
    </>
  );
}
