import { SyntheticEvent, useState } from 'react';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/store/store';
import { observer } from 'mobx-react-lite';
import useWindowSize from '../../hooks/useWindowsSize';
import { Link,  } from 'react-router-dom';

function ActivityList() {
   const size=useWindowSize();
   const {activityStore} = useStore();
   const {activityByDate,selectActivity,deleteActivity,loading} = activityStore;

   const[target, setTarget] = useState<string>("");
   function handleDeleteActivity(event:SyntheticEvent<HTMLButtonElement>,id:string){
    setTarget(event.currentTarget.name);
    deleteActivity(id)
   }
    return (
    <Segment>
        <Item.Group divided>
                {Array.isArray(activityByDate) ? (
                activityByDate.map((activity) => (
                    <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header as='a'>{activity.title}</Item.Header>
                            <Item.Meta>{activity.date.replace("T"," ")}</Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city}, {activity.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                {size && size.width>800 
                                ?<Button floated='right' content="View" color="blue" onClick={()=>selectActivity(activity.id)}/>
                                : <Button floated='right' content="View" color="blue" as={Link} to={`/activities/${activity.id}`}/> }
                                <Button name={activity.id} loading={loading && target===activity.id} floated='right' content="Delete" color="red" onClick={(e)=>handleDeleteActivity(e,activity.id)}/>
                                <Label basic content={activity.category}/>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                )))
                 : (
                <Item>No activities available.</Item>
                )}
        </Item.Group>
    </Segment>
    
  )
}

export default observer(ActivityList);