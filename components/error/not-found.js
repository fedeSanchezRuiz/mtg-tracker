import classes from './not-found.module.css';

export default function NotFound() {
  return (
    <div className={classes.error}>
      <h1> 404 - Page Not Found!</h1>
    </div>
  );
}
