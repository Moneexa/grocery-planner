import { useContext, useMemo, useState } from 'react';
import { Steps, Card, Button, Row, Col } from 'antd';
import { CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import FoodGrid from './FoodCard/FoodGrid';
import { PlanContext } from '../../../../store/PlanProvider';
import { Link } from 'react-router-dom';

const { Step } = Steps;

interface MealPlanStepsProps {
  days: number;
}

function AddMealPlanForm({ days }: MealPlanStepsProps) {
  const {
    plan: { startDate },
  } = useContext(PlanContext);
  const [current, setCurrent] = useState(0);
  //   const [forms, setForms] = useState<Plan>({
  //     id: '',
  //     name: '',
  //     image: '',
  //     days: days,
  //     startDate: Date.now(),
  //     endDate: Date.now(),
  //     recipes: [],
  //   });

  const handleSave = () => {
    setCurrent((prev) => prev + 1);
  };
  // Constructing the array from the length days to populate the UI
  const steps = Array.from({ length: days + 1 }, (_, index) => ({
    title: dayjs().add(index, 'day').format('MMM D, YYYY'),
    status: () => {
      if (index < current) return 'finish';
      if (index === current) return 'process';
      return 'wait';
    },
    id: index,
  }));

  const selectedStep = useMemo(() => {
    return steps.find((step) => current === step.id);
  }, [steps]);

  return (
    <Card title="Meal Plans" style={{ marginTop: '24px' }}>
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
            <div>
              <h1>Frukost</h1>
              <FoodGrid
                category="frukost"
                date={startDate + 24 * 60 * 60 * 1000 * (selectedStep.id + 1)}
              />
            </div>
            <div>
              <h1>Lunsj</h1>
              <FoodGrid
                category="lunsj"
                date={startDate + 24 * 60 * 60 * 1000 * (selectedStep.id + 1)}
              />
            </div>
            <div>
              <h1>Middag</h1>
              <FoodGrid
                category="middag"
                date={startDate + 24 * 60 * 60 * 1000 * (selectedStep.id + 1)}
              />
            </div>
            <div style={{ marginTop: '24px', textAlign: 'right' }}>
              <Button type="primary" onClick={handleSave}>
                Next
              </Button>
            </div>
          </Col>
        )}
      </Row>
      <div style={{ marginTop: '24px', textAlign: 'right' }}>
        <Link to="/app/groceries/add">
          <Button type="primary">Save Meal Plan</Button>
        </Link>
      </div>
    </Card>
  );
}

export default AddMealPlanForm;
