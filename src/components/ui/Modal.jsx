import { useEffect } from 'react';
import styles from './Modal.module.css';

export default function Modal({ title, description, options, onClose, children }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && onClose) {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {title && <h3 className={styles.title}>{title}</h3>}
        {description && <p className={styles.description}>{description}</p>}
        
        {children}
        
        {options && options.length > 0 && (
          <div className={styles.options}>
            {options.map((option, index) => (
              <button
                key={index}
                className={`${styles.optionButton} ${option.variant === 'danger' ? styles.danger : ''}`}
                onClick={option.action}
                disabled={option.disabled}
              >
                {option.text}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
