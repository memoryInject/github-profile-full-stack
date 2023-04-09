import { Alert } from 'react-bootstrap';

interface AlertErrorProps {
  msg?: string;
}

const AlertError = (props: AlertErrorProps) => {
  return (
    <Alert variant="danger" style={{ width: 'fit-content', margin: 'auto' }}>
      {props.msg
        ? props.msg
        : 'Opps! Something went wrong. Please logout and try again after some time.'}
    </Alert>
  );
};

export default AlertError;
