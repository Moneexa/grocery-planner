import React from 'react';
import { Card, Button, Empty, Row, Col, Flex, FloatButton } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Link, redirect } from 'react-router-dom';
import { usePromise } from '../../../shared/hooks';
import { listPlans } from '../../../shared/apis';

export const MealSchedule: React.FC = () => {
  const { Meta } = Card;
  const plans = usePromise(listPlans);
  return (
    <div style={{ position: 'relative' }}>
      {plans.status === 'loading' && '...loading'}
      {plans.status === 'error' && plans.msg}
      {plans.status === 'success' && plans.data.length > 0 ? (
        <>
          <Row gutter={[16, 16]}>
            {plans.data.map((plan) => (
              <Col xs={24} sm={12} md={8} lg={6} key={plan.id}>
                <Link to={`/app/meal-schedule/${plan.id}`}>
                  <Card
                    hoverable
                    style={{ width: 240 }}
                    cover={
                      <img
                        alt="example"
                        src={
                          'https://bilder.kolonial.no/oppskrifter/8c746307-f796-4f5b-b8d1-0993a75e48a5.jpg?auto=format&fit=clip&q=75&w=1200&s=461f46f93a2c675c42883057d6f71bad'
                        }
                      />
                    }
                  >
                    <Meta
                      title={plan.name}
                      description={`${plan.days} Days Plan`}
                    />
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
          <FloatButton
            type="primary"
            shape="circle"
            icon={<PlusOutlined />}
            onClick={() => redirect('/app/meal-schedule/add')}
          ></FloatButton>
        </>
      ) : (
        <Flex align="center" justify="center" vertical gap={10}>
          <Empty description="You have no plans added, please add one." />
          <Button type="primary" icon={<PlusOutlined />} size="large">
            <Link to="/app/meal-schedule/add">Add Meal</Link>
          </Button>
        </Flex>
      )}
    </div>
  );
};
