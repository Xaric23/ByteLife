import styles from './Button.module.css';

export default function Button({ 
  children, 
  variant = 'default', 
  size = 'medium',
  fullWidth = false,
  disabled = false,
  onClick,
  className = '',
  ...props 
}) {
  const classNames = [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth ? styles.fullWidth : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <button 
      className={classNames}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
