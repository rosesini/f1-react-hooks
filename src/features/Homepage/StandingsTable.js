import { useEffect, useState } from 'react'
import { Tab, Tabs } from '@mui/material'
import { Box } from '@mui/system'
import TabPanel, { a11yProps } from './tabPanel'
import DriverStandingsPodium from './DriverStandingsPodium'
import ConstructorStandingsPodium from './ConstructorStandingsPodium'
import LastRaceTable from './LastRaceTable'
import { loadStandings } from './utils'
import './StandingsTable.css'

export default function StandingsTable() {
  const [tabValue, setTabValue] = useState(0)

  const handleTabsChange = (_, newValue) => {
    setTabValue(newValue)
  }

  useEffect(() => {
    loadStandings()
  }, [])

  return (
    <div className="f1-standings">
      <div className="f1-tab-widget">
        <Box>
          <Tabs
            value={tabValue}
            onChange={handleTabsChange}
            aria-label="standings tabs"
            centered
          >
            <Tab label="DRIVERS" {...a11yProps(0)} />
            <Tab label="CONSTRUCTORS" {...a11yProps(1)} />
            <Tab label="LAST RACE" {...a11yProps(2)} />
          </Tabs>
        </Box>

        <div className="f1-tab-content-wrapper">
          <TabPanel className="f1-tab-content" value={tabValue} index={0}>
            <DriverStandingsPodium />
          </TabPanel>
          <TabPanel className="f1-tab-content" value={tabValue} index={1}>
            <ConstructorStandingsPodium />
          </TabPanel>
          <TabPanel className="f1-tab-content last-race" value={tabValue} index={2}>
            <LastRaceTable />
          </TabPanel>
        </div>
      </div>
    </div>
  )
}