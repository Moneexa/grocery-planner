import { Card, Col, Row } from 'antd';
import { fetchPlans } from '../../../../shared/apis';
import { usePromise } from '../../../../shared/hooks';

export default function TodayFood({ today }: { today: boolean }) {
  const plan = usePromise(fetchPlans);
  const { Meta } = Card;
  return (
    <>
      {plan.status === 'loading' && '...loading'}
      {plan.status === 'success' && (
        <Card title={`${today ? 'Today' : 'Tomorrow'} Food`} bordered={true}>
          <Row justify={'center'} gutter={[5, 5]}>
            {plan.data.recipes.map((item) => {
              if (today ? item.date <= Date.now() : item.date > Date.now()) {
                return (
                  <>
                    <Col span={8}>
                      <Card
                        hoverable
                        style={{ width: '150px' }}
                        cover={
                          <img alt="example" src={item.frukost?.imageUrl} />
                        }
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
                        cover={
                          <img alt="example" src={item.middag?.imageUrl} />
                        }
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
      )}
    </>
  );
}
