// Import necessary modules and components
"use client";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { ReactElement } from "react";

// Define the structure of individual tab options
interface Options {
  label: string;
  value: string | number;
  desc: string | number | ReactElement;
}

// Define the component's props
interface Props {
  value: string | number;
  options: Options[];
  setTabValue: Function;
}

// TabsComponent function component
export default function TabsComponent(props: Props) {
  // Destructure props
  const { options, value, setTabValue } = props;

  return (
    // Tabs container with specified value
    <Tabs value={value}>
      {/* TabsHeader with individual Tab components */}
      <TabsHeader placeholder={""}>
        {options.map(({ label, value }) => (
          <Tab
            placeholder={""}
            key={value}
            value={value}
            onClick={() => setTabValue(value)}
          >
            {label}
          </Tab>
        ))}
      </TabsHeader>

      {/* TabsBody with individual TabPanel components */}
      <TabsBody placeholder={""}>
        {options.map(({ value, desc }) => (
          <TabPanel key={value} value={value}>
            {desc}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
}
