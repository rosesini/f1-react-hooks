import { Box } from '@mui/system'

export const a11yProps = index => ({
  id: `standings-tab-${index}`,
  'aria-controls': `standings-tabpanel-${index}`
})

const TabPanel = ({ index, value, children, ...others }) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`standings-tabpanel-${index}`}
    aria-labelledby={`standings-tab-${index}`}
    {...others}
  >
    {value === index && (
      <Box sx={{ p: 2 }}>
        {children}
      </Box>
    )}
  </div>
)
export default TabPanel
