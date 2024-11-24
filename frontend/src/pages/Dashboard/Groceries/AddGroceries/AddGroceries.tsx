import { Button, Card, Col, Row, Steps } from 'antd';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import GroceryGrid from '../IndividualGrocery/GroceryGrid';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Plan } from '../../../../types';
import { fetchPlans } from '../../../../shared-component/shared-apis';

export default function AddGroceries() {
  const navigate = useNavigate();
  const { Step } = Steps;

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
  const ingredients = useMemo(() => {
    const ings = new Set<string>();
    plan?.recipes?.forEach((recipe: any) => {
      recipe['frukost']?.ingredients?.forEach((mealType: string) => {
        ings.add(mealType);
      });
      recipe['lunsj']?.ingredients?.forEach((mealType: string) => {
        ings.add(mealType);
      });
      recipe['middag']?.ingredients?.forEach((mealType: string) => {
        ings.add(mealType);
      });
    });
    return Array.from(ings);
  }, [plan]);

  const [currentGrocerySelection, setCurrentGrocerySelection] = useState(0);

  //handle next button click
  const handleSave = () => {
    colRef.current?.scroll(0, 0);
    setCurrentGrocerySelection(() => {
      const currIndx = ingredients.findIndex(
        (_, index) => currentGrocerySelection === index,
      );
      if (currIndx !== ingredients.length - 1) {
        return currIndx + 1;
      }
      return -1;
    });
  };
  //add grocery
  const saveGrocery = async () => {
    navigate('/app/groceries/');
  };
  //get steps
  const steps = useMemo(() => {
    return ingredients.map((ing, index) => ({
      title: ing,
      status: () =>
        index < currentGrocerySelection
          ? 'finish'
          : index === currentGrocerySelection
            ? 'process'
            : 'wait',
      id: index,
    }));
  }, [ingredients, currentGrocerySelection]);
  //get current step
  const selectedGrocery = useMemo(() => {
    return steps[currentGrocerySelection];
  }, [ingredients, currentGrocerySelection]);
  const colRef = useRef<HTMLDivElement | null>(null);

  return (
    <Card title="Grocery Plan" style={{ marginTop: '24px' }}>
      <Row>
        <Col span={4}>
          <Steps direction="vertical" current={currentGrocerySelection}>
            {steps.map((item, index) => (
              <Step
                key={item.title}
                title={item.title}
                status={item.status()}
                icon={
                  index < currentGrocerySelection ? (
                    <CheckCircleOutlined style={{ color: 'green' }} />
                  ) : index === currentGrocerySelection ? (
                    <ClockCircleOutlined />
                  ) : undefined
                }
              />
            ))}
          </Steps>
        </Col>

        {selectedGrocery && (
          <Col span={20} ref={colRef}>
            <GroceryGrid groceryIngredient={selectedGrocery.title} />
            <div style={{ marginTop: '24px', textAlign: 'right' }}>
              <Button
                type="primary"
                onClick={handleSave}
                disabled={currentGrocerySelection === steps.length - 1}
              >
                Next
              </Button>
            </div>
          </Col>
        )}
      </Row>
      <Row>{}</Row>
      <div style={{ marginTop: '24px', textAlign: 'right' }}>
        <Button type="primary" onClick={saveGrocery}>
          Save Meal Plan
        </Button>
      </div>
    </Card>
  );
}
