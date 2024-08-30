import { Button, Form, Segment } from 'semantic-ui-react'
import { Activity } from '../../../app/models/activity';
import { ChangeEvent, useState } from 'react';
type ActivityFormProps={
    closeForm:()=>void;
    activity:Activity|undefined;
    createOrEdit:(activity:Activity)=>void;
}
function ActivityForm({closeForm,activity:selectedActivity,createOrEdit}:ActivityFormProps) {
  const initalState:Activity = selectedActivity??
  {
    id:'',
    title:'',
    category:'',
    description:'',
    city:'',
    date:'',
    venue:''
  };
const [activity,setActivity] = useState(initalState);
function handleSubmit(){
    createOrEdit(activity);
}
function handleInputChange(event:ChangeEvent<HTMLInputElement|HTMLTextAreaElement>){
const{name,value} = event.target;
setActivity({...activity,[name]:value});
}
  return (
    <Segment clearing>
        <Form onSubmit={()=>handleSubmit()} autoComplete='off'>
            <Form.Input placeholder="Title" value ={activity.title} name="title" onChange={e=>handleInputChange(e)}/>
            <Form.TextArea placeholder="Description" value={activity.description} name="description" onChange={e=>handleInputChange(e)}/>
            <Form.Input placeholder="Category" value={activity.category} name="category" onChange={e=>handleInputChange(e)}/>
            <Form.Input placeholder="Date" value={activity.date} name="date" onChange={e=>handleInputChange(e)}/>
            <Form.Input placeholder="City" value={activity.city} name="city" onChange={e=>handleInputChange(e)}/>
            <Form.Input placeholder="Venue" value={activity.venue} name="venue" onChange={e=>handleInputChange(e)}/>
            <Button floated='right' positive type="submit" content="Submit" />
            <Button floated='right' type="submit" content="Cancel" onClick={()=>closeForm()}/>
        </Form>
    </Segment>
  )
}

export default ActivityForm