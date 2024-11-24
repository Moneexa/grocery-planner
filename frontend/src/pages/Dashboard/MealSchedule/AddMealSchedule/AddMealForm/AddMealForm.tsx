import { useContext, useMemo, useRef, useState } from 'react';
import { Steps, Card, Button, Row, Col, Input } from 'antd';
import { CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import FoodGrid from './FoodGrid';
import { PlanContext } from '../../../../../store/PlanProvider';
import { APIResponse, Recipe } from '../../../../../types';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const { Step } = Steps;

function AddMealPlanForm() {
  const navigate = useNavigate();
  const { plan } = useContext(PlanContext);
  const { recipes } = plan;

  const [postReponse, setPostResponse] = useState<APIResponse<string>>({
    status: 'loading',
  });
  const [selectedRecipeDate, setSelectedRecipeDate] = useState(
    recipes[0]?.date,
  );
  const [searchTerms, setSearchTerms] = useState<
    Record<Exclude<keyof Recipe, 'date'>, string>
  >({
    frukost: '',
    lunsj: '',
    middag: '',
  });

  const { selectedRecipe, isLastRecipe } = useMemo(() => {
    const selectedRecipeIndex = recipes.findIndex(
      (r) => r.date === selectedRecipeDate,
    );
    return {
      selectedRecipe: recipes[selectedRecipeIndex],
      isLastRecipe: selectedRecipeIndex === recipes.length - 1,
    };
  }, [recipes, selectedRecipeDate]);
  const handleSearch2 = (
    mealType: keyof typeof searchTerms,
    searchTerm: string,
  ) => {
    setSearchTerms({ ...searchTerms, [mealType]: searchTerm });
  };

  const onSubmit = async () => {
    const response = await axios.post('/api/plans/add/', plan);
    if (response.data) {
      setPostResponse({
        status: 'success',
        data: 'Your plan has been added',
      });
      navigate('/app/groceries/add');
    }
    setPostResponse({
      status: 'error',
      msg: 'There is some problem doing the request',
    });
  };

  const handleNext = () => {
    colRef.current?.scroll(0, 0);
    const selectedRecipeIndex = recipes.findIndex(
      (r) => r.date === selectedRecipeDate,
    );
    if (selectedRecipeIndex >= 0) {
      setSelectedRecipeDate(recipes[selectedRecipeIndex + 1].date);
    }
  };

  const colRef = useRef<HTMLDivElement | null>(null);

  const getStatus = (recipe: Recipe) => {
    if (recipe.date === selectedRecipe?.date) return 'process';
    if (recipe.frukost && recipe.lunsj && recipe.middag) return 'finish';
    return 'wait';
  };

  const nextDisabled = useMemo(() => {
    return !(
      selectedRecipe?.frukost &&
      selectedRecipe?.lunsj &&
      selectedRecipe?.middag
    );
  }, [selectedRecipe, recipes]);

  return (
    <Card title="Select your dishes for the meal plan" size="small">
      {postReponse.status === 'error' &&
        'Something went wrong while adding the meal'}
      <Row>
        <Col span={6}>
          <Steps direction="vertical" current={selectedRecipeDate} size="small">
            {recipes.map((dailyRecipe) => (
              <Step
                key={dailyRecipe.date}
                title={dayjs(dailyRecipe.date).format('MMM D, YYYY')}
                status={getStatus(dailyRecipe)}
                icon={
                  getStatus(dailyRecipe) === 'finish' ? (
                    <CheckCircleOutlined style={{ color: 'green' }} />
                  ) : getStatus(dailyRecipe) === 'process' ? (
                    <ClockCircleOutlined />
                  ) : undefined
                }
              />
            ))}
          </Steps>
        </Col>

        {selectedRecipe && (
          <Col
            span={18}
            style={{ maxHeight: 'calc(100vh - 151px)', overflowY: 'auto' }}
            ref={colRef}
          >
            <div>
              <Row align="middle" justify="space-between">
                <h1>Frukost</h1>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <Input.Search
                    placeholder="Search Frukost"
                    enterButton
                    onSearch={(name) => {
                      handleSearch2('frukost', name);
                    }}
                  />
                </div>
              </Row>

              <FoodGrid
                category="frukost"
                date={selectedRecipeDate}
                name={searchTerms.frukost}
              />
            </div>

            <div>
              <Row align="middle" justify="space-between">
                <h1>Lunsj</h1>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <Input.Search
                    placeholder="Search Lunsj"
                    enterButton
                    onSearch={(name) => handleSearch2('lunsj', name)}
                  />
                </div>
              </Row>

              <FoodGrid
                category="lunsj"
                date={selectedRecipeDate}
                name={searchTerms.lunsj}
              />
            </div>

            <div>
              <Row align="middle" justify="space-between">
                <h1>Middag</h1>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <Input.Search
                    placeholder="Search Middag"
                    enterButton
                    onSearch={(name) => handleSearch2('middag', name)}
                  />
                </div>
              </Row>
              <FoodGrid
                category="middag"
                date={selectedRecipeDate}
                name={searchTerms.middag}
              />
            </div>
          </Col>
        )}
      </Row>
      <div style={{ marginTop: '24px', textAlign: 'right' }}>
        {!isLastRecipe && (
          <Button type="primary" onClick={handleNext} disabled={nextDisabled}>
            Next
          </Button>
        )}
        {isLastRecipe && (
          <Button type="primary" disabled={nextDisabled} onClick={onSubmit}>
            Finish
          </Button>
        )}
      </div>
    </Card>
  );
}

export default AddMealPlanForm;
