import { useField } from "formik";
import classes from "./Form.module.scss";
import { FormGroup, Label, Input } from "reactstrap";

// text / teatarea
export const TextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <FormGroup>
      <Label htmlFor={props.id || props.name}>{label}</Label>
      <Input {...field} {...props} />
      {meta.touched && meta.error ? <p className={classes.error}>{meta.error}</p> : null}
    </FormGroup>
  );
};

// checkbox
export const Checkbox = ({ children, ...props }) => {
  const [field, meta] = useField({ ...props });
  return (
    <FormGroup>
      <Label>
        <Input type="checkbox" {...field} {...props} />
        {children}
      </Label>
      {meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
    </FormGroup>
  );
};

// radio
export const RadioBox = ({ label, ...props }) => {
  const [field, meta] = useField({ ...props });
  return (
    <FormGroup>
      <Input type="radio" {...field} {...props} />
      <Label>{label}</Label>

      {meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
    </FormGroup>
  );
};

// select
export const Select = ({ label, children, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <FormGroup>
      <Label htmlFor={props.id || props.name}>{label}</Label>
      <Input {...field} {...props}>
        {children.split(",").map((opt) => {
          return <option key={opt}>{opt}</option>;
        })}
      </Input>
      {meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
    </FormGroup>
  );
};
