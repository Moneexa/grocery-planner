import { Card, Col, Row } from 'antd';
import { Recipe } from '../../../../types';

export default function TodayFood({
  today,
  recipes,
}: {
  today: boolean;
  recipes: Recipe;
}) {
  const { Meta } = Card;
  return (
    <>
      {!recipes && 'No active plan'}
      {recipes && (
        <Card title={`${today ? 'Today' : 'Tomorrow'} Food`} bordered={true}>
          <Row justify={'center'} gutter={[5, 5]}>
            <Col span={8}>
              <Card
                hoverable
                style={{ width: '150px' }}
                cover={<img alt="example" src={recipes.frukost?.imageUrl} />}
              >
                <Meta
                  title={recipes.frukost?.name}
                  description={`item's cooking time:${recipes.frukost?.timeTaken}`}
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card
                hoverable
                style={{ width: '150px' }}
                cover={<img alt="example" src={recipes.lunsj?.imageUrl} />}
              >
                <Meta
                  title={recipes?.lunsj?.name}
                  description={`recipes's cooking time:${recipes.lunsj?.timeTaken}`}
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card
                hoverable
                style={{ width: '150px' }}
                cover={<img alt="example" src={recipes.middag?.imageUrl} />}
              >
                {' '}
                <Meta
                  title={recipes.middag?.name}
                  description={`recipes's cooking time:${recipes.middag?.timeTaken}`}
                />
              </Card>
            </Col>
          </Row>
        </Card>
      )}
    </>
  );
}
