import {useField} from "formik";
import {Form, Label} from "semantic-ui-react";
import DatePicker from 'react-datepicker';
interface Props{
  name:string;
  dateFormat:string;
}
export default function MyDateInput({name,dateFormat}:Props) {
    const [field, meta, helpers] = useField(name);
    return (
        <Form.Field error={meta.touched && !!meta.error}>
            <DatePicker
                {...field}
                showTimeInput={true}
                dateFormat={dateFormat}
                selected={(field.value && new Date(field.value)) || null}
                onChange={value => { helpers.setValue(value);}}
                placeholderText="Date and Time"
                
            />
            {meta.touched && meta.error ? (
                <Label basic color='red'>{meta.error}</Label>
            ) : null}
        </Form.Field>
    )
}