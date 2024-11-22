import { Card, Col, Row } from 'antd';

export function Analytics() {
  return (
    <>
      <Row justify="center" gutter={[10, 10]}>
        <Col span={12}>
          <Card title="Today's Food" bordered={true}>
            Card content
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Cost of your current plan per day" bordered={true}>
            Card content
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Historical Plan Cost" bordered={true}>
            Card content
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Most Food Consumed" bordered={true}>
            Card content
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Your Remaining Food By Category">
            <Col span={8}></Col>
            <Col span={8}></Col>
            <Col span={8}></Col>
          </Card>
        </Col>
      </Row>
    </>
  );
}
