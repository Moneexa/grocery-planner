import { Button, Card, Col, Empty, Flex, Row } from 'antd';
import TodayFood from './TodayFood/TodayFood';
import IngredientBarChart from './IngredientCost/IngredientCost';
import PlanCostLineChart from './HistoricalCos/HistoricalCost';
import { usePromise } from '../../../shared/hooks';
import { getInsights } from '../../../shared/apis';
import { Link } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';

export function Analytics() {
  const response = usePromise(getInsights);
  if (response.status === 'loading') return '...Loading';
  if (response.status === 'error')
    return (
      <Flex align="center" justify="center" vertical gap={10}>
        <Empty description="You have no plans added, please add one." />
        <Button type="primary" icon={<PlusOutlined />} size="large">
          <Link to="/app/meal-schedule/add">Add Meal</Link>
        </Button>
      </Flex>
    );
  const { lineChartData, barChartData, recipes } = response.data;

  return (
    <>
      <Row justify="center" gutter={[10, 10]}>
        <Col span={12}>
          <TodayFood today recipes={recipes[0]} />
        </Col>
        <Col span={12}>
          <TodayFood today={false} recipes={recipes[1]} />
        </Col>
        <Col span={12}>
          <Card
            title="Top 5 High Cost Items in Your Current Plan "
            bordered={true}
          >
            <IngredientBarChart barChartData={barChartData} />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Historical Plan Cost" bordered={true}>
            <PlanCostLineChart lineChartData={lineChartData} />
          </Card>
        </Col>
      </Row>
    </>
  );
}
