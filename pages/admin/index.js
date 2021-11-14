import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useAction, usePhotoType, useLocation } from "../../contexts";
import { BasicFormList } from "../../components/form";
import TodoTable from "../../components/admin/TodoTable";
import PhotoTable from "../../components/admin/PhotoTable";

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';


export default function Admin() {
  const auth = useSelector((state) => state.auth);
  const router = useRouter();
  const actions = useAction();
  const locations = useLocation();
  const photoTypes = usePhotoType();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (auth.is_admin === 1) {
      router.push("/admin")
    } else {
      router.push("/member/signin")
    }
  }, [])

  return (
    <Box sx={{ minWidth: 600 }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Actions" {...a11yProps(0)} />
          <Tab label="Locations" {...a11yProps(1)} />
          <Tab label="Photo Types" {...a11yProps(2)} />
          <Tab label="Photos" {...a11yProps(3)} />
          <Tab label="Todos" {...a11yProps(4)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <BasicFormList
          resource="actions"
          refresh={actions.refresh}
          items={actions.data}
        ></BasicFormList>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <BasicFormList
          resource="locations"
          refresh={locations.refresh}
          items={locations.data}
        ></BasicFormList>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <BasicFormList
          resource="photo-types"
          refresh={photoTypes.refresh}
          items={photoTypes.data}
        ></BasicFormList>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <PhotoTable />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <TodoTable />
      </TabPanel>
    </Box>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <>{children}</>
        </Box>
      )}
    </div>
  );
}


function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};