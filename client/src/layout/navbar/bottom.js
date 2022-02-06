import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import {
  AccessAlarmOutlined,
  AccountBalanceOutlined,
  AdbOutlined,
  AddOutlined,
} from "@material-ui/icons";
import { useState } from "react";

function App() {
  const [selected, setSelected] = useState(0);
  return (
    <BottomNavigation
      value={selected}
      onChange={(value, newValue) => {
        setSelected(newValue);
      }}
      style={{ width: "50%" }}
    >
      <BottomNavigationAction label="First" icon={<AccessAlarmOutlined />} />
      <BottomNavigationAction
        label="Second"
        icon={<AccountBalanceOutlined />}
      />
      <BottomNavigationAction label="Third" icon={<AdbOutlined />} />
      <BottomNavigationAction label="Fourth" icon={<AddOutlined />} />
    </BottomNavigation>
  );
}

export default App;