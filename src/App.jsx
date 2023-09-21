import CreateCustomer from "./features/customers/CreateCustomer";
import Customer from "./features/customers/Customer";
import AccountOperations from "./features/accounts/AccountOperations";
import BalanceDisplay from "./features/accounts/BalanceDisplay";
import { Fragment } from "react";
import { useSelector } from "react-redux";

function App() {
  const fullName = useSelector(state => state.customer.fullName);
  return (
    <div>
      <h1>🏦 Redux Bank</h1>
      {
        fullName === '' ? <CreateCustomer /> :
        <Fragment>
          <Customer />
          <AccountOperations />
          <BalanceDisplay />
        </Fragment>
      }
      
    </div>
  );
}

export default App;
