import { Card, Col, Row } from 'antd';
import TodayFood from './TodayFood/TodayFood';
import { useEffect, useState } from 'react';
import axios from 'axios';
import IngredientBarChart from './IngredientCost/IngredientCost';
import PlanCostLineChart from './HistoricalCos/HistoricalCost';

export function Analytics() {
  const [barChartData, setBarChartData] = useState<
    { ingredient: string; price: string }[]
  >([]);
  const [lineChartData, setLineChartData] = useState([]);
  useEffect(() => {
    axios
      .get('/api/insights/')
      .then((response) => {
        setBarChartData(response.data.barChartData);
        setLineChartData(response.data.lineChartData);
      })
      .catch((error) => console.error('Error fetching plan data:', error));
  }, []);

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
