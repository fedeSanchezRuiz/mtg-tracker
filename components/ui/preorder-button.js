import Link from 'next/link';
import classes from './preorder-button.module.css';

export default function PreorderButton(props) {
  const { href, fontSize, width } = props;

  const buttonStyle = {
    fontSize: fontSize || '16px', // Default font size is 16px
    fontWeight: 'bold',
    width: width || '14rem',
  };

  return (
      <Link href={href}>
        <div className={classes.button} style={buttonStyle}>
          {props.children}
        </div>
      </Link>
  );
}

