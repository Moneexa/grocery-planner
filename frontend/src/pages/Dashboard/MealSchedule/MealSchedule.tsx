import React, { useContext, useMemo } from 'react';
import { Card, Button, Empty, Row, Col, Flex, FloatButton } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Plan } from '../../../types';
import { Link, redirect } from 'react-router-dom';
import { PlanContext } from '../../../store/PlanProvider';

export const MealSchedule: React.FC = () => {
  const { Meta } = Card;
  const { plan } = useContext(PlanContext);

  const plans: Plan[] = useMemo(() => {
    return !plan.id ? [] : [plan];
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      {plans.length > 0 ? (
        <>
          <Row gutter={[16, 16]}>
            {plans.map((_plan) => (
              <Col xs={24} sm={12} md={8} lg={6} key={plan.id}>
                <Link to={`/app/meal-schedule/${_plan.id}`}>
                  <Card
                    hoverable
                    style={{ width: 240 }}
                    cover={
                      <img
                        alt="example"
                        src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                      />
                    }
                  >
                    <Meta
                      title={_plan.name}
                      description={`${_plan.days} Days Plan`}
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
