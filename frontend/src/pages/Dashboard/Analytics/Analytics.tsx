import { Card, Col, Row } from 'antd';
import TodayFood from './TodayFood/TodayFood';
import IngredientBarChart from './IngredientCost/IngredientCost';
import PlanCostLineChart from './HistoricalCos/HistoricalCost';
import { usePromise } from '../../../shared/hooks';
import { getInsights } from '../../../shared/apis';

export function Analytics() {
  const response = usePromise(getInsights);

  if (response.status === 'loading') {
    return <>Loading...</>;
  }

  if (response.status === 'error') {
    return <div>{response.msg}</div>;
  }

  const { barChartData, lineChartData } = response.data;

  return (
    <>
      <Row justify="center" gutter={[10, 10]}>
        <Col span={12}>
          <TodayFood today />
        </Col>
        <Col span={12}>
          <TodayFood today={false} />
        </Col>
        <Col span={12}>
          <Card
            title="Cost of ingredients distribution in the plan"
            bordered={true}
          >
            <IngredientBarChart data={barChartData} />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Historical Plan Cost" bordered={true}>
            <PlanCostLineChart data={lineChartData} />
          </Card>
        </Col>
      </Row>
    </>
  );
}
