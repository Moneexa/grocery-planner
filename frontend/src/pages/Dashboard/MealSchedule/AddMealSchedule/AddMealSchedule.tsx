import { Form, Select, DatePicker, Row, Col } from 'antd';

import dayjs from 'dayjs';
import { useContext, useState } from 'react';
import AddMealPlanForm from './AddMealForm';
import { PlanContext } from '../../../../store/PlanProvider';

const { Option } = Select;

const dietaryOptions = [
  'Vegetarian',
  'Vegan',
  'Gluten-Free',
  'Keto',
  'Paleo',
  'Halal',
  'Kosher',
];
function AddMealSchedule() {
  const [form] = Form.useForm();
  const [daysCount, setDaysCount] = useState<number | null>(null);
  const { changePlan, plan } = useContext(PlanContext);

  const handleDateChange = (date: dayjs.Dayjs | null) => {
    if (date) {
      const today = dayjs().startOf('day');
      const selectedDate = date.startOf('day');
      const diff = selectedDate.diff(today, 'day');
      setDaysCount(diff);
      changePlan({
        ...plan,
        id: '1',
        name: 'plan1',
        days: diff,
        startDate: today.valueOf(),
        endDate: date.valueOf(),
      });
    } else {
      setDaysCount(null);
    }
  };

  return (
    <>
      <Form
        form={form}
        name="meal_plan_form"
        layout="horizontal"
        initialValues={{
          dietaryRequirements: [],
          mealDate: dayjs(),
        }}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
      >
        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item
              name="dietaryRequirements"
              label="Dietary Requirements"
              rules={[
                {
                  required: true,
                  message: 'Please select at least one dietary requirement!',
                },
              ]}
              layout="vertical"
            >
              <Select
                mode="multiple"
                placeholder="Select dietary requirements"
                allowClear
              >
                {dietaryOptions.map((diet) => (
                  <Option key={diet} value={diet}>
                    {diet}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item
              name="mealDate"
              label="Meal Date"
              layout="vertical"
              rules={[
                {
                  required: true,
                  message: 'Please select a meal date!',
                },
              ]}
            >
              <DatePicker
                style={{ width: '100%' }}
                minDate={dayjs(Date.now())}
                maxDate={dayjs(Date.now()).add(10, 'days')}
                onChange={handleDateChange}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      {daysCount}
      {daysCount !== null && <AddMealPlanForm days={daysCount} />}
    </>
  );
}

export default AddMealSchedule;
