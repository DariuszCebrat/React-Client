import { Button, Header, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { useEffect, useState } from "react";
import { useStore } from "../../../app/store/store";
import { observer } from "mobx-react-lite";
import { Link, useNavigate, useParams } from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Formik, Form,  } from "formik";
import *as Yup from "yup"
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { categoryOptions } from "../../../app/common/options/categoryOptions";
import MyDateTimeInput from "../../../app/common/form/MyDateTimeInput";

function ActivityForm() {
  const { activityStore } = useStore();
  const {
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
    date: null,
    dateShort: "",
    venue: "",
  });
  const validationSchema = Yup.object({
    title:Yup.string().required("The activity title is required"),
    description:Yup.string().required("The activity description is required"),
    category:Yup.string().required(),
    date:Yup.string().required(),
    venue:Yup.string().required(),
    city:Yup.string().required(),

  })

  useEffect(() => {
    if (id) loadActivity(id).then((activity) => setActivity(activity!));
  }, [id, loadActivity]);

  function handleFormSubmit(activity:Activity) {
    if (activity.id)
      updateActivity(activity).then(() => navigate(`/activities/${activity.id}`));
    else {
      createActivity(activity).then((id) =>
      {
        if(id)
           navigate(`/activities/${activity.id}`)
        else
           navigate(`/activities`);
      }
      );
    }
  }
  // function handleInputChange(
  //   event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) {
  //   const { name, value } = event.target;
  //   setActivity({ ...activity, [name]: value });
  // }

  if (loadingInitial) return <LoadingComponent content="Loading ...." />;

  return (
    <Segment clearing>
      <Header content="Activity Details" sub color="teal"/>
      <Formik
      validationSchema={validationSchema}
        enableReinitialize
        initialValues={activity}
        onSubmit={(values) => handleFormSubmit(values)}
      >
        {({ handleSubmit,isValid,isSubmitting,dirty }) => (
          <Form
            className="ui form"
            onSubmit={handleSubmit}
            autoComplete="off"
          >
            <MyTextInput name="title" placeholder="Title"/>
            <MyTextArea rows={3} placeholder="Description" name="description" />
            <MySelectInput  options={categoryOptions} placeholder="Category" name="category" />
            <MyDateTimeInput
              name="date"
              dateFormat="dd MM, yyyy h:mm aa"
            />
            <Header content="Location Details" sub color="teal"/>
            <MyTextInput placeholder="City" name="city" />
            <MyTextInput placeholder="Venue" name="venue" />
            <Button
            disabled={isSubmitting|| !dirty|| !isValid}
              loading={loading}
              floated="right"
              positive
              type="submit"
              content="Submit"
            />
            <Button
              as={Link}
              to="/activities"
              floated="right"
              type="submit"
              content="Cancel"
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
}

export default observer(ActivityForm);
