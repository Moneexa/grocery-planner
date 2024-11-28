import { Button, Empty, Flex } from 'antd';
import { Link } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';

import { fetchGroceries } from '../../../shared/apis';
import { usePromise } from '../../../shared/hooks';
import GroceryList from '../Groceries/GroceryList';

export default function Pantry() {
  const activePlanCheckout = usePromise(fetchGroceries);
  return (
    <>
      {activePlanCheckout.status === 'loading' && <>...loading</>}
      {activePlanCheckout.status === 'error' && (
        <Flex align="center" justify="center" vertical gap={10}>
          <Empty description="You have no active current plan, please add one." />
          <Button type="primary" icon={<PlusOutlined />} size="large">
            <Link to="/app/meal-schedule/add">Add Meal</Link>
          </Button>
        </Flex>
      )}
      {activePlanCheckout.status === 'success' &&
        activePlanCheckout.data.groceryItems.length === 0 && (
          <Flex align="center" justify="center" vertical gap={10}>
            <Empty description="You have not bought any groceries" />
            <Button type="primary" icon={<PlusOutlined />} size="large">
              <Link to="/app/groceries/add">Buy groceries</Link>
            </Button>
          </Flex>
        )}
      {activePlanCheckout.status === 'success' &&
        activePlanCheckout.data.groceryItems.length > 0 && (
          <>
            <GroceryList
              groceryList={{
                cost: activePlanCheckout['data'].cost,
                groceries: activePlanCheckout['data'].groceryItems,
              }}
            />
          </>
        )}
    </>
  );
}
