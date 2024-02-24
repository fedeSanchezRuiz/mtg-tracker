import classes from './button.module.css';

export default function Button({
  children,
  textOnly,
  className,
  ...props
}) {
  let cssClasses = textOnly
    ? classes['text-button']
    : classes.button;
  if (className) {
    cssClasses += ' ' + className;
  }

  return (
    <button
      className={cssClasses}
      {...props}
    >
      {children}
    </button>
  );
}
