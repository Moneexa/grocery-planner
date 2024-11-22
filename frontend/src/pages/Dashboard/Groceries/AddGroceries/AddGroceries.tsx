import { Button, Card, Col, Row, Steps } from 'antd';
import { useContext, useMemo, useState } from 'react';
import { PlanContext } from '../../../../store/PlanProvider';
import { CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import GroceryGrid from '../IndividualGrocery/GroceryGrid';
import { Link } from 'react-router-dom';

export default function AddGroceries() {
  const { plan } = useContext(PlanContext);
  const [current, setCurrent] = useState(0);
  const { Step } = Steps;

  const ingredients = useMemo(() => {
    const ings = new Set<string>();
    plan.recipes.forEach((recipe) => {
      recipe['frukost']?.ingredients.forEach((mealType) => {
        ings.add(mealType);
      });
      recipe['lunsj']?.ingredients.forEach((mealType) => {
        ings.add(mealType);
      });
      recipe['middag']?.ingredients.forEach((mealType) => {
        ings.add(mealType);
      });
    });
    return Array.from(ings);
  }, [plan.recipes]);
  const handleSave = () => {
    setCurrent((prev) => prev + 1);
  };

  const steps = useMemo(() => {
    return ingredients.map((ing, index) => ({
      title: ing,
      status: () =>
        index < current ? 'finish' : index === current ? 'process' : 'wait',
      id: index,
    }));
  }, [ingredients, current]);
  const selectedStep = useMemo(() => {
    return steps.find((step) => current === step.id);
  }, [steps]);

  return (
    <Card title="Grocery Plan" style={{ marginTop: '24px' }}>
      <Row>
        <Col span={4}>
          <Steps direction="vertical" current={current}>
            {steps.map((item, index) => (
              <Step
                key={item.title}
                title={item.title}
                status={item.status()}
                icon={
                  index < current ? (
                    <CheckCircleOutlined style={{ color: 'green' }} />
                  ) : index === current ? (
                    <ClockCircleOutlined />
                  ) : undefined
                }
              />
            ))}
          </Steps>
        </Col>

        {selectedStep && (
          <Col span={20}>
            <GroceryGrid groceryIngredient={selectedStep.title} />
            <div style={{ marginTop: '24px', textAlign: 'right' }}>
              <Button
                type="primary"
                onClick={handleSave}
                disabled={current === steps.length - 1}
              >
                Next
              </Button>
            </div>
          </Col>
        )}
      </Row>
      <Row>{}</Row>
      <div style={{ marginTop: '24px', textAlign: 'right' }}>
        <Link to="/app/groceries">
          <Button type="primary">Save Meal Plan</Button>
        </Link>
      </div>
    </Card>
  );
}
