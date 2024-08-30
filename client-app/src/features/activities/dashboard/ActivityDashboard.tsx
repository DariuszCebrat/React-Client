import { Grid } from 'semantic-ui-react'
import { Activity } from '../../../app/models/activity'
import ActivityList from './ActivityList';
import ActivityDetails from '../details/ActivityDetails';
type ActivityDashboardProps={
    activities:Activity[];
    isError:boolean;
}
function ActivityDashboard({activities,isError}:ActivityDashboardProps) {
  return (
    <Grid>
        <Grid.Column width="10">
            <ActivityList activities={activities} isError={isError} />
        </Grid.Column>
        <Grid.Column width="6">
            {activities[0] && 
            <ActivityDetails activity={activities[0]} />}
        </Grid.Column>
    </Grid>
  )
}

export default ActivityDashboard