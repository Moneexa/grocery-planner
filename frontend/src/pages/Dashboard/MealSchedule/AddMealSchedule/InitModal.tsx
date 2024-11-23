import { DatePicker, Form, Input, Modal, Select } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const dietaryOptions = [
  'Vegetarian',
  'Vegan',
  'Gluten-Free',
  'Keto',
  'Paleo',
  'Halal',
  'Kosher',
];

type InitModalProps = {
  isModalOpen: boolean;
  onClose: (
    name: string,
    startDate: number,
    endDate: number,
    days: number,
    dietaryPreferences: string[],
  ) => void;
};

export function InitModal({ isModalOpen, onClose }: InitModalProps) {
  const navigate = useNavigate();
  const [name, setName] = useState<string>('Untitled');
  const [dietaryRestriction, setDietaryRestriction] = useState<string[] | null>(
    null,
  );
  const startDate = Date.now();
  const [endDate, setEndDate] = useState<number>(Date.now());
  return (
    <Modal
      title="Lets start"
      open={isModalOpen}
      onOk={() =>
        onClose(
          name,
          startDate,
          endDate,
          Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)),
          dietaryRestriction || [],
        )
      }
      okButtonProps={{
        disabled:
          !name || !startDate || !endDate || !dietaryRestriction?.length,
      }}
      onCancel={() => navigate('/app/meal-schedule')}
    >
      <Form.Item label="Name" required layout="vertical">
        <Input
          placeholder="Type a name"
          value={name}
          onChange={(value) => setName(value.target.value)}
        />
      </Form.Item>
      <Form.Item label="Dietary restrictions" layout="vertical">
        <Select
          mode="multiple"
          placeholder="Select dietary requirements"
          allowClear
          maxTagCount="responsive"
          value={dietaryRestriction}
          onChange={(value) => setDietaryRestriction(value)}
        >
          {dietaryOptions.map((diet) => (
            <Select.Option key={diet} value={diet}>
              {diet}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="Select an end date" layout="vertical">
        <DatePicker
          minDate={dayjs(Date.now())}
          maxDate={dayjs(Date.now()).add(10, 'days')}
          value={dayjs(endDate)}
          onChange={(date) => setEndDate(date.valueOf())}
        />
      </Form.Item>
    </Modal>
  );
}
