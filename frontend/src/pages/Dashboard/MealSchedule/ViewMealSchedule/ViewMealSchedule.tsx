import { Card, Row, Col, Image } from 'antd';
import { useParams } from 'react-router-dom';
import { usePromise } from '../../../../shared/hooks';
import { listPlanRecipes } from '../../../../shared/apis';

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
                      <Image
                        alt={recipe.frukost?.name}
                        src={recipe.frukost?.imageUrl}
                        style={{ height: 150, objectFit: 'cover' }}
                      />
                    }
                  >
                    <Card.Meta
                      title={recipe.frukost?.name}
                      description={`Cooking time: ${recipe.frukost?.timeTaken || 'N/A'}`}
                    />
                  </Card>
                </Col>
                <Col key={index} xs={24} sm={12} md={8} lg={6}>
                  <Card
                    hoverable
                    cover={
                      <Image
                        alt={recipe.lunsj?.name}
                        src={recipe.lunsj?.imageUrl}
                        style={{ height: 150, objectFit: 'cover' }}
                      />
                    }
                  >
                    <Card.Meta
                      title={recipe.lunsj?.name}
                      description={`Cooking time: ${recipe.lunsj?.timeTaken || 'N/A'}`}
                    />
                  </Card>
                </Col>
                <Col key={index} xs={24} sm={12} md={8} lg={6}>
                  <Card
                    hoverable
                    cover={
                      <Image
                        alt={recipe.middag?.name}
                        src={recipe.middag?.imageUrl}
                        height={150}
                      />
                    }
                  >
                    <Card.Meta
                      title={recipe.middag?.name}
                      description={`Cooking time: ${recipe.middag?.timeTaken || 'N/A'}`}
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
