import { Grid } from 'semantic-ui-react'
import ActivityList from './ActivityList';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';
import { useStore } from '../../../app/store/store';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import useWindowSize from '../../hooks/useWindowsSize';

function ActivityDashboard() {

  const size = useWindowSize();
  const {activityStore} = useStore();
  const {selectedActivity,editMode,loadActivities,activityRegistry} = activityStore;
  useEffect(() => {
    if(activityRegistry.size <=1) loadActivities();
  }, [loadActivities,activityRegistry.size]);
  
  
  if(activityStore.loadingInitial) return <LoadingComponent content="Loading activities..."/>;
  return (
    <Grid>
        <Grid.Column width={size && size.width>800 ?"10":"16" }>
            <ActivityList />
        </Grid.Column>
        { size && size.width>800 &&
          <Grid.Column width="6">
          {selectedActivity && !editMode &&
          <ActivityDetails/>}
          {editMode &&
          <ActivityForm key="singlePageManage"  />}
      </Grid.Column>
        }
        
    </Grid>
  )
}

export default observer(ActivityDashboard)