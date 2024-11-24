import { Card, Col, Row } from 'antd';
import { useEffect, useState } from 'react';
import { Plan } from '../../../../types';
import { fetchPlans } from '../../../../shared-component/shared-apis';

export default function TodayFood({ today }: { today: boolean }) {
  const [plan, setPlan] = useState<Plan>({
    name: '',
    days: 0,
    dietaryPreference: [],
    endDate: 0,
    recipes: [],
    startDate: 0,
  });
  //fetch plan
  useEffect(() => {
    async function abc() {
      const activePlan = await fetchPlans();
      setPlan(activePlan);
    }
    abc();
  }, []);

  const { Meta } = Card;
  return (
    <Card title={`${today ? 'Today' : 'Tomorrow'} Food`} bordered={true}>
      <Row justify={'center'} gutter={[5, 5]}>
        {plan.recipes.map((item) => {
          if (today ? item.date <= Date.now() : item.date > Date.now()) {
            return (
              <>
                <Col span={8}>
                  <Card
                    hoverable
                    style={{ width: '150px' }}
                    cover={<img alt="example" src={item.frukost?.imageUrl} />}
                  >
                    <Meta
                      title={item.frukost?.name}
                      description={`item's cooking time:${item.frukost?.timeTaken}`}
                    />
                  </Card>
                </Col>
                <Col span={8}>
                  <Card
                    hoverable
                    style={{ width: '150px' }}
                    cover={<img alt="example" src={item.lunsj?.imageUrl} />}
                  >
                    <Meta
                      title={item?.lunsj?.name}
                      description={`item's cooking time:${item.lunsj?.timeTaken}`}
                    />
                  </Card>
                </Col>
                <Col span={8}>
                  <Card
                    hoverable
                    style={{ width: '150px' }}
                    cover={<img alt="example" src={item.middag?.imageUrl} />}
                  >
                    {' '}
                    <Meta
                      title={item.middag?.name}
                      description={`item's cooking time:${item.middag?.timeTaken}`}
                    />
                  </Card>
                </Col>
              </>
            );
          }
        })}
      </Row>
    </Card>
  );
}
