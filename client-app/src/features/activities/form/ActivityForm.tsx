import { Button, Form, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { ChangeEvent, useEffect, useState } from "react";
import { useStore } from "../../../app/store/store";
import { observer } from "mobx-react-lite";
import useWindowSize from "../../hooks/useWindowsSize";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponent";

function ActivityForm() {
  const location = useLocation();
  const size = useWindowSize();
  const { activityStore } = useStore();
  const {
    selectedActivity,
    closeForm,
    createActivity,
    updateActivity,
    loading,
    loadActivity,
    loadingInitial,
  } = activityStore;
  const { id } = useParams();
  const navigate = useNavigate();
  const [activity, setActivity] = useState<Activity>({
    id: "",
    title: "",
    category: "",
    description: "",
    city: "",
    date: "",
    venue: "",
  });

  useEffect(() => {
    if (id) loadActivity(id).then((activity) => setActivity(activity!));
    if (
      selectedActivity &&
      size &&
      size.width > 800 &&
      !location.pathname.includes(`/createActivity`)
    ) {
      setActivity(selectedActivity);
    }
  }, [id,location.pathname,selectedActivity,size,loadActivity]);

  

  function handleSubmit() {
    if (activity.id) {
      updateActivity(activity).then(() => {
        if (size && size.width < 800) navigate(`/activities/${activity.id}`);
      });
    } else {
      createActivity(activity).then((id) =>
      {
        if(id)
        {
          if(size && size.width<800) navigate(`/activities/${activity.id}`)
          else navigate(`/activities`);
        }
        else{
          navigate(`/activities`);
        }
      }
      );
    }
  }
  function handleInputChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setActivity({ ...activity, [name]: value });
  }

  if (loadingInitial) return <LoadingComponent content="Loading ...." />;

  return (
    <Segment clearing>
      <Form onSubmit={() => handleSubmit()} autoComplete="off">
        <Form.Input
          placeholder="Title"
          value={activity.title}
          name="title"
          onChange={(e) => handleInputChange(e)}
        />
        <Form.TextArea
          placeholder="Description"
          value={activity.description}
          name="description"
          onChange={(e) => handleInputChange(e)}
        />
        <Form.Input
          placeholder="Category"
          value={activity.category}
          name="category"
          onChange={(e) => handleInputChange(e)}
        />
        <Form.Input
          type="datetime-local"
          placeholder="Date"
          value={activity.date}
          name="date"
          onChange={(e) => handleInputChange(e)}
        />
        <Form.Input
          placeholder="City"
          value={activity.city}
          name="city"
          onChange={(e) => handleInputChange(e)}
        />
        <Form.Input
          placeholder="Venue"
          value={activity.venue}
          name="venue"
          onChange={(e) => handleInputChange(e)}
        />
        <Button
          loading={loading}
          floated="right"
          positive
          type="submit"
          content="Submit"
        />
        {location.pathname.includes("/createActivity") ||
        (size && size.width < 800) ? (
          <Button
            as={Link}
            to="/activities"
            floated="right"
            type="submit"
            content="Cancel"
            onClick={() => closeForm()}
          />
        ) : (
          <Button
            floated="right"
            type="submit"
            content="Cancel"
            onClick={() => closeForm()}
          />
        )}
      </Form>
    </Segment>
  );
}

export default observer(ActivityForm);
