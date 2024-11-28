import { Card, Col, Row } from 'antd';
import TodayFood from './TodayFood/TodayFood';
import IngredientBarChart from './IngredientCost/IngredientCost';
import PlanCostLineChart from './HistoricalCos/HistoricalCost';

export function Analytics() {
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
            title="Top 5 High Cost Items in Your Current Plan "
            bordered={true}
          >
            <IngredientBarChart />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Historical Plan Cost" bordered={true}>
            <PlanCostLineChart />
          </Card>
        </Col>
      </Row>
    </>
  );
}
