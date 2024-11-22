import { useContext } from 'react';
import { PlanContext } from '../../../../store/PlanProvider';
import { Card, Row, Col, Empty } from 'antd';
import { useParams } from 'react-router-dom';

export default function PlanFoodGrid() {
  const { planId } = useParams();
  const { plan } = useContext(PlanContext);

  if (!plan) {
    return <Empty description="Plan not found" />;
  }

  const { recipes } = plan;

  return (
    <>
      <h1>Your Meal Plan for days of Plan {planId}</h1>
      {recipes.map((recipe, index) => (
        <>
          <h2>Day{index + 1}</h2>
          <Row gutter={[16, 16]}>
            <Col key={index} xs={24} sm={12} md={8} lg={6}>
              <Card
                hoverable
                cover={
                  <img
                    alt={recipe.frukost?.name}
                    src={recipe.frukost?.imageUrl}
                    style={{ height: 150, objectFit: 'cover' }}
                  />
                }
              >
                <Card.Meta
                  title={recipe.frukost?.id}
                  description={recipe.frukost?.timeTaken}
                />
              </Card>
            </Col>
            <Col key={index} xs={24} sm={12} md={8} lg={6}>
              <Card
                hoverable
                cover={
                  <img
                    alt={recipe.lunsj?.name}
                    src={recipe.lunsj?.imageUrl}
                    style={{ height: 150, objectFit: 'cover' }}
                  />
                }
              >
                <Card.Meta
                  title={recipe.lunsj?.id}
                  description={recipe.lunsj?.timeTaken}
                />
              </Card>
            </Col>
            <Col key={index} xs={24} sm={12} md={8} lg={6}>
              <Card
                hoverable
                cover={
                  <img
                    alt={recipe.middag?.name}
                    src={recipe.middag?.imageUrl}
                    style={{ height: 150, objectFit: 'cover' }}
                  />
                }
              >
                <Card.Meta
                  title={recipe.middag?.id}
                  description={recipe.middag?.timeTaken}
                />
              </Card>
            </Col>
          </Row>
        </>
      ))}
    </>
  );
}
