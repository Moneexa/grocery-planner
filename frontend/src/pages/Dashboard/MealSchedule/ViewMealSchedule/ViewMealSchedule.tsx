import { useEffect, useState } from 'react';
import { Card, Row, Col } from 'antd';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APIResponse, Plan } from '../../../../types';

export default function PlanFoodGrid() {
  const { planId } = useParams();
  const [plan, setPlan] = useState<APIResponse<Plan>>({
    status: 'loading',
  });
  useEffect(() => {
    axios
      .get(`/api/plans/${planId}`)
      .then((response) => {
        setPlan({ status: 'success', data: response.data });
      })
      .catch((error) => {
        setPlan({ status: 'error', msg: error });
      });
  }, []);

  return (
    <>
      {plan.status === 'loading' && '...loading'}
      {plan.status === 'error' && plan.msg}
      {plan.status === 'success' && (
        <>
          <h1>Your Meal Schedule by the days of Plan {planId}</h1>
          {plan.data.recipes.map((recipe, index) => (
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
      )}
    </>
  );
}
