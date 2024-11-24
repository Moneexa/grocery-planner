import { useContext, useState } from 'react';
import AddMealPlanForm from './AddMealForm/AddMealForm';
import { PlanContext } from '../../../../store/PlanProvider';
import { InitModal } from './InitModal';
import dayjs from 'dayjs';

function AddMealSchedule() {
  const [daysCount, setDaysCount] = useState<number | null>(null);
  const { changePlan, plan } = useContext(PlanContext);
  const [isInitModalVisible, setIsInitModalVisible] = useState(true);

  const handleOnInitForm = (
    name: string,
    startDate: number,
    endDate: number,
    days: number,
    dietaryPreference: string[],
  ) => {
    setIsInitModalVisible(false);
    setDaysCount(days);
    changePlan({
      ...plan,
      name: name,
      days: days,
      startDate,
      endDate,
      recipes: Array.from({ length: days + 1 }, (_, index) => ({
        date: dayjs().add(index, 'day').valueOf(),
      })),
      dietaryPreference,
    });
  };

  return (
    <>
      <InitModal isModalOpen={isInitModalVisible} onClose={handleOnInitForm} />
      {daysCount !== null && <AddMealPlanForm />}
    </>
  );
}

export default AddMealSchedule;
