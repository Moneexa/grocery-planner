import { Card, Row, Col } from 'antd';
import { useParams } from 'react-router-dom';
import { usePromise } from '../../../../shared-component/hooks';
import { listPlanRecipes } from '../../../../shared-component/shared-apis';

export default function PlanFoodGrid() {
  const { planId } = useParams();
  const recipes = usePromise(() => listPlanRecipes(planId));

  return (
    <>
      {recipes.status === 'loading' && '...loading'}
      {recipes.status === 'error' && recipes.msg}
      {recipes.status === 'success' && (
        <>
          <h1>Your Meal Schedule by the days of Plan</h1>
          {recipes.data.map((recipe, index) => (
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
                      title={recipe.frukost?.name}
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
                      title={recipe.lunsj?.name}
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
                      title={recipe.middag?.name}
                      description={recipe.middag?.timeTaken}
                    />
                  </Card>
                </Col>
              </Row>
            </>
          ))}
        </>
      )}
    </>
  );
}
