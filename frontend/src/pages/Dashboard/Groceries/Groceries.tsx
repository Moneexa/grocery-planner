import { useEffect, useState, useContext } from 'react';
import { Button, Card, Col, Empty, Flex, Row } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { CheckOutlined, PlusOutlined } from '@ant-design/icons';
import { Plan } from '../../../types';
import { PlanContext } from '../../../store/PlanProvider';

import { fetchPlans } from '../../../shared-component/shared-apis';
import axios from 'axios';

const { Meta } = Card;
export default function Groceries() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { grocery } = useContext(PlanContext);
  const [plan, setPlan] = useState<Plan>({
    name: '',
    days: 0,
    dietaryPreference: [],
    endDate: 0,
    recipes: [],
    startDate: 0,
  });

  useEffect(() => {
    async function abc() {
      const activePlan = await fetchPlans();
      setPlan(activePlan);
    }
    abc();
  }, []);

  const handleCheckOut = async () => {
    setLoading(true);

    const payload = {
      ...grocery,
      planId: plan.id,
    };
    console.log(payload);
    const response = await axios.post('/api/grocery-plan/add/', payload);
    if (response) {
      setLoading(false);
    } else {
      setLoading(false);

      alert('there is a problem adding groceries');
    }
  };
  return (
    <>
      {grocery.groceries.length > 0 ? (
        <Flex vertical gap={10} align="center" justify="center">
          <h1>Grocery Added for the Plan</h1>
          <Row gutter={[16, 16]}>
            {grocery.groceries.map((item, index) => (
              <Col xs={24} sm={12} md={8} lg={6} key={index}>
                <Card
                  hoverable
                  style={{ width: 240 }}
                  cover={<img alt="example" src={item.imageUrl} />}
                >
                  <Meta
                    title={item.name}
                    description={`${item.price} nok with ${item.weight}kg`}
                  />
                </Card>
              </Col>
            ))}
            <Col span={12}>
              <Flex
                vertical
                justify="flex-end"
                align="end"
                style={{ height: '100%' }}
              >
                <h3>Total Price:{grocery.cost} nok</h3>
                <h3>Total Items:{grocery.groceries.length}kg</h3>
                <Button
                  type="primary"
                  icon={<CheckOutlined />}
                  loading={loading}
                  onClick={handleCheckOut}
                >
                  Checkout
                </Button>
              </Flex>
            </Col>
          </Row>
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
